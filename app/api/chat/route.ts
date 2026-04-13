import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const HOURLY_RATE = 40;

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
    const chatHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Create model with system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are an expert web design and development consultant. You help clients refine their project requirements and provide accurate cost estimates based on a $${HOURLY_RATE}/hour rate.

When evaluating projects:
1. Ask clarifying questions about features, complexity, integrations, and timeline
2. Based on the requirements, estimate the hours needed
3. Be conversational and helpful, asking follow-up questions to better understand scope
4. When you have enough information, provide a detailed breakdown:
   - List all features/components
   - Estimate hours for each
   - Calculate total hours and cost ($${HOURLY_RATE}/hour)
5. Keep refining until the client is satisfied

Format your cost estimates like this:
ESTIMATE:
- Feature 1: X hours
- Feature 2: Y hours
Total: Z hours ($Z × $${HOURLY_RATE} = $TOTAL)`,
    });

    // Start chat session
    const chat = model.startChat({
      history: chatHistory.length > 0 ? chatHistory : undefined,
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

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
