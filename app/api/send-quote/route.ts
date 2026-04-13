import { Resend } from "resend";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface QuoteEmailData {
  conversationId: string;
  clientName: string;
  clientEmail: string;
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId, clientName, clientEmail }: QuoteEmailData =
      await request.json();

    // Get all messages from the conversation
    const result = await db.execute(
      sql`SELECT * FROM messages WHERE conversation_id = ${conversationId} ORDER BY created_at ASC`
    );
    const messages = result.rows;

    // Find the final estimate message
    const estimateMessage = messages
      .reverse()
      .find((msg: any) => msg.content.includes("ESTIMATE:"));

    if (!estimateMessage) {
      return NextResponse.json(
        { error: "No estimate found in conversation" },
        { status: 400 }
      );
    }

    // Build conversation transcript
    const transcript = messages
      .map(
        (msg: any) =>
          `${msg.role === "user" ? "Client" : "Consultant"}: ${msg.content}`
      )
      .join("\n\n");

    // Send email with Resend
    const emailResult = await resend.emails.send({
      from: "noreply@kashkitchen.com",
      to: clientEmail,
      subject: `Project Quote - ${clientName}`,
      html: `
        <h2>Project Quote</h2>
        <p><strong>Client:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        
        <h3>Conversation Summary</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">
${transcript}
        </pre>
        
        <h3>Final Estimate</h3>
        <pre style="background: #e8f5e9; padding: 15px; border-radius: 5px; overflow-x: auto;">
${estimateMessage.content}
        </pre>
      `,
    });

    // Mark conversation as sent
    await db.execute(
      sql`UPDATE conversations SET quote_sent = true, sent_at = NOW() WHERE id = ${conversationId}`
    );

    return NextResponse.json({
      success: true,
      message: `Quote sent successfully to ${clientEmail}`,
    });
  } catch (error) {
    console.error("[v0] Send quote error:", error);
    return NextResponse.json(
      { error: "Failed to send quote" },
      { status: 500 }
    );
  }
}
