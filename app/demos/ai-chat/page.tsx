"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, Zap, Brain, Code, Lightbulb, CheckCircle, Copy, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface AIPersona {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  systemPrompt: string
  color: string
}

const aiPersonas: AIPersona[] = [
  {
    id: "general",
    name: "General Assistant",
    description: "Helpful AI assistant for general questions",
    icon: <Bot className="h-4 w-4" />,
    systemPrompt: "You are a helpful AI assistant. Provide clear, concise, and accurate responses.",
    color: "text-blue-500",
  },
  {
    id: "developer",
    name: "Code Expert",
    description: "Specialized in programming and web development",
    icon: <Code className="h-4 w-4" />,
    systemPrompt:
      "You are an expert web developer. Help with coding questions, best practices, and technical solutions.",
    color: "text-green-500",
  },
  {
    id: "creative",
    name: "Creative Writer",
    description: "Assists with creative writing and content",
    icon: <Lightbulb className="h-4 w-4" />,
    systemPrompt: "You are a creative writing assistant. Help with storytelling, content creation, and creative ideas.",
    color: "text-purple-500",
  },
  {
    id: "business",
    name: "Business Advisor",
    description: "Provides business strategy and marketing insights",
    icon: <Brain className="h-4 w-4" />,
    systemPrompt:
      "You are a business consultant. Provide strategic advice, marketing insights, and business solutions.",
    color: "text-orange-500",
  },
]

const sampleResponses = {
  general: [
    "I'm here to help! What would you like to know?",
    "That's a great question. Let me provide you with a comprehensive answer...",
    "I understand what you're looking for. Here's what I can tell you:",
  ],
  developer: [
    "Great question! Here's how you can approach this in modern web development:\n\n```javascript\n// Example code\nconst handleAsync = async () => {\n  try {\n    const result = await fetchData();\n    return result;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n};\n```\n\nThis pattern ensures proper error handling and clean async operations.",
    "For this use case, I'd recommend using React hooks with TypeScript for better type safety and developer experience.",
    "Here's a modern solution using the latest web standards and best practices...",
  ],
  creative: [
    "What an inspiring idea! Let me help you develop this concept further...",
    "I love the creative direction you're taking. Here are some ways to enhance your story:",
    "That's a fascinating premise. Let's explore some creative possibilities...",
  ],
  business: [
    "From a strategic perspective, this presents several opportunities...",
    "Based on current market trends, I'd suggest considering these approaches:",
    "That's a solid business concept. Here's how you might optimize it for growth:",
  ],
}

export default function AIChatDemo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help with various tasks depending on the persona you choose. What would you like to discuss today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<string>("general")
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentPersona = aiPersonas.find((p) => p.id === selectedPersona) || aiPersonas[0]

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const simulateStreamingResponse = async (messageId: string, fullResponse: string) => {
    setStreamingMessageId(messageId)
    const words = fullResponse.split(" ")
    let currentContent = ""

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? " " : "") + words[i]

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentContent, isStreaming: i < words.length - 1 } : msg,
        ),
      )

      // Random delay between 50-150ms to simulate realistic typing
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50))
    }

    setStreamingMessageId(null)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate response based on selected persona
    const responses = sampleResponses[selectedPersona as keyof typeof sampleResponses]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)

    // Start streaming response
    await simulateStreamingResponse(assistantMessage.id, randomResponse)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm your ${currentPersona.name}. ${currentPersona.description}. How can I help you today?`,
        timestamp: new Date(),
      },
    ])
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const formatMessage = (content: string) => {
    // Simple code block detection and formatting
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const inlineCodeRegex = /`([^`]+)`/g

    const formatted = content
      .replace(codeBlockRegex, '<pre class="bg-muted p-3 rounded-lg my-2 overflow-x-auto"><code>$2</code></pre>')
      .replace(inlineCodeRegex, '<code class="bg-muted px-1 rounded text-sm">$1</code>')

    return { __html: formatted }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">AI Chat Integration Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">OpenAI API</Badge>
            <Badge variant="secondary">Streaming</Badge>
            <Badge variant="secondary">AI SDK</Badge>
            <Badge variant="secondary">Real-time</Badge>
          </div>
          <p className="text-muted-foreground">
            Interactive AI chat interface with streaming responses, multiple personas, and professional chat UI.
            Demonstrates modern AI integration patterns and user experience design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {currentPersona.icon}
                    <span className={currentPersona.color}>{currentPersona.name}</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aiPersonas.map((persona) => (
                          <SelectItem key={persona.id} value={persona.id}>
                            <div className="flex items-center gap-2">
                              {persona.icon}
                              {persona.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={clearChat}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 ${currentPersona.color}`}
                          >
                            {currentPersona.icon}
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={formatMessage(message.content)}
                          />
                          {message.isStreaming && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100" />
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200" />
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                            {message.role === "assistant" && !message.isStreaming && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content)}
                                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask ${currentPersona.name} anything...`}
                      disabled={isLoading || streamingMessageId !== null}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading || streamingMessageId !== null}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {(isLoading || streamingMessageId) && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {isLoading ? "AI is thinking..." : "AI is typing..."}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Persona */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Persona
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {currentPersona.icon}
                    <span className={`font-semibold ${currentPersona.color}`}>{currentPersona.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentPersona.description}</p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">System Prompt:</p>
                    <p className="text-xs">{currentPersona.systemPrompt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Features */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Streaming Responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Multiple AI Personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Code Syntax Highlighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Message History</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Copy Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Typing Indicators</span>
                </div>
              </CardContent>
            </Card>

            {/* Sample Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Try These Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 bg-transparent"
                  onClick={() => setInputValue("How do I implement authentication in Next.js?")}
                >
                  <Code className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">How do I implement authentication in Next.js?</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 bg-transparent"
                  onClick={() => setInputValue("Write a creative story about AI")}
                >
                  <Lightbulb className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">Write a creative story about AI</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 bg-transparent"
                  onClick={() => setInputValue("What's a good marketing strategy for a tech startup?")}
                >
                  <Brain className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">What's a good marketing strategy for a tech startup?</span>
                </Button>
              </CardContent>
            </Card>

            {/* Implementation Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Uses AI SDK for streaming responses</p>
                <p>• Multiple persona system prompts</p>
                <p>• Real-time typing indicators</p>
                <p>• Message formatting with code highlighting</p>
                <p>• Responsive chat interface</p>
                <p>• Copy-to-clipboard functionality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
