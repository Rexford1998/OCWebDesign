import { generateText } from "ai";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const HOURLY_RATE = 40;
const MIN_PROJECT_TOTAL = 5000;
const MIN_PROJECT_HOURS = Math.ceil(MIN_PROJECT_TOTAL / HOURLY_RATE);
const ISSUE_BUFFER_MIN_PERCENT = 25;

async function getConversationHistory(conversationId: string) {
  const result = await db.execute(
    sql`SELECT * FROM messages WHERE conversation_id = ${conversationId} ORDER BY created_at ASC`
  );
  return result.rows;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, projectDetails, userEmail = "" } = await request.json();

    // Ensure conversation exists
    const conversationCheck = await db.execute(
      sql`SELECT id FROM conversations WHERE id = ${conversationId}`
    );

    if (conversationCheck.rows.length === 0) {
      await db.execute(
        sql`INSERT INTO conversations (id, user_email, status) VALUES (${conversationId}, ${userEmail}, 'in_progress')`
      );
    }

    // Get conversation history
    const history = await getConversationHistory(conversationId);

    // Build chat history for context
    const messages = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    // Add the current message
    messages.push({
      role: "user",
      content: message,
    });

    // Generate response using AI SDK with Vercel AI Gateway
    const result = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are an expert web design and development consultant. You help clients refine their project requirements and provide accurate cost estimates based on a $${HOURLY_RATE}/hour rate.

Non-negotiable pricing rules:
1. Every project must start at a minimum total of $${MIN_PROJECT_TOTAL}.
2. At $${HOURLY_RATE}/hour, minimum billable hours are ${MIN_PROJECT_HOURS} hours.
3. Every estimate must include an "Issues & Flexibility Buffer" line item.
4. The Issues & Flexibility Buffer must be at least ${ISSUE_BUFFER_MIN_PERCENT}% of implementation hours, and can be increased for risky/unclear scopes.
5. Never provide a final total below $${MIN_PROJECT_TOTAL}. If needed, increase discovery, architecture, QA, project management, and buffer hours to meet or exceed the minimum.

When evaluating projects:
1. Ask clarifying questions about features, complexity, integrations, and timeline
2. Based on the requirements, estimate robust hours that account for unknowns, revisions, and production issues
3. Be conversational and helpful, asking follow-up questions to better understand scope
4. When you have enough information, provide a detailed breakdown:
   - List all features/components
   - Estimate hours for each
   - Include discovery/planning, QA/testing, and project management hours
   - Include Issues & Flexibility Buffer hours
   - Calculate total hours and cost ($${HOURLY_RATE}/hour)
5. Keep refining until the client is satisfied

Format your cost estimates like this:
ESTIMATE:
- Feature 1: X hours
- Feature 2: Y hours
- Discovery/Planning: X hours
- QA/Testing: X hours
- Project Management: X hours
- Issues & Flexibility Buffer: X hours
Total: Z hours ($Z × $${HOURLY_RATE} = $TOTAL)`,
      messages: messages,
    });

    const aiResponse = result.text;

    // Save user message
    await db.execute(
      sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversationId}, 'user', ${message})`
    );

    // Save AI response
    await db.execute(
      sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversationId}, 'assistant', ${aiResponse})`
    );

    // Check if this looks like a final estimate
    const hasFinalEstimate = aiResponse.includes("ESTIMATE:");

    return NextResponse.json({
      message: aiResponse,
      hasFinalEstimate,
      conversationId,
    });
  } catch (error) {
    console.error("[v0] Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process message";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
