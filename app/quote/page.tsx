"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const redirectToHome = () => {
  window.location.assign("/");
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function QuotePage() {
  const [conversationId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your web design and development consultant. To provide you with an accurate quote, I'd like to learn more about your project. Could you start by telling me:\n\n1. What type of project are you planning?\n2. What are your main goals?\n3. Do you have a rough timeline in mind?\n\nLet's work together to determine the perfect scope and cost for your project!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationId,
          projectDetails: messages,
          userEmail: clientEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        console.error("Error:", data.error);
        redirectToHome();
      }
    } catch (error) {
      console.error("[v0] Send message error:", error);
      redirectToHome();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (!clientName.trim() || !clientEmail.trim()) {
      alert("Please enter your name and email");
      return;
    }

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          clientName,
          clientEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Quote submitted successfully!");
        setClientName("");
        setClientEmail("");
      } else {
        console.error("[v0] Send quote error:", data.error);
        redirectToHome();
      }
    } catch (error) {
      console.error("[v0] Send quote error:", error);
      redirectToHome();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <SiteHeader />
      <div className="py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Project Quote Generator
          </h1>
          <p className="text-lg text-slate-600">
            Tell us about your project and get an AI-powered quote based on our
            $40/hour rate
          </p>
        </div>

        <Card className="flex flex-col h-96 shadow-lg">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-200 text-slate-900 px-4 py-3 rounded-lg">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-200 p-4 bg-slate-50 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell me about your project..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Send
            </Button>
          </form>
        </Card>

        {/* Contact Form for Quote */}
        <Card className="mt-6 p-6 bg-white shadow-lg border-2 border-green-500">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Send Your Quote?
          </h2>
          <p className="text-slate-600 mb-4">
            {clientEmail
              ? `We'll include ${clientEmail} in your quote request details`
              : "Enter your email so we can include it in your quote request details"}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <Input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Email
              </label>
              <Input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSendQuote}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Send Quote
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
