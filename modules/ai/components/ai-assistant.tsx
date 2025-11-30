"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  User,
  Lightbulb,
  Zap,
  Copy,
  Check,
  TrendingUp,
  Link as LinkIcon,
  Palette,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  {
    icon: Lightbulb,
    color: "text-amber-500",
    title: "Profile Ideas",
    prompt: "Give me creative bio ideas for my TreeBio profile",
  },
  {
    icon: LinkIcon,
    color: "text-blue-500",
    title: "Link Suggestions",
    prompt: "What links should I add to maximize engagement?",
  },
  {
    icon: Palette,
    color: "text-purple-500",
    title: "Design Tips",
    prompt: "How can I make my profile more visually appealing?",
  },
  {
    icon: TrendingUp,
    color: "text-green-500",
    title: "Growth Strategy",
    prompt: "What are the best practices to grow my audience?",
  },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your TreeBio AI assistant. I can help you with:\n\n• Creating engaging bio content\n• Suggesting links to add\n• Optimizing your profile layout\n• Growing your audience\n• Design and branding advice\n\nWhat would you like help with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (prompt?: string) => {
    const messageContent = prompt || input.trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("bio") || lowerPrompt.includes("about")) {
      return "🎨 Here are some creative bio ideas:\n\n1. **Professional & Clear**: 'Digital Creator | Helping you [your niche] | 📍 [Location]'\n\n2. **Storytelling**: 'From [humble beginning] to [achievement] | Sharing my journey'\n\n3. **Value-Focused**: 'I help [audience] achieve [result] through [method]'\n\n4. **Personal Brand**: '[Your name] | [Profession] | [What makes you unique]'\n\n💡 Pro tip: Keep it under 150 characters and include emojis for visual appeal!";
    }

    if (lowerPrompt.includes("link") || lowerPrompt.includes("add")) {
      return "🔗 Essential links to add:\n\n1. **Portfolio/Website** - Your main online presence\n2. **Latest Content** - Blog post, video, or project\n3. **Newsletter** - Build your email list\n4. **Social Media** - Instagram, YouTube, Twitter\n5. **Products/Services** - What you're selling\n6. **Contact/Booking** - Make it easy to work with you\n7. **Testimonials** - Social proof page\n\n✨ Prioritize 3-7 links maximum to avoid overwhelming visitors!";
    }

    if (lowerPrompt.includes("design") || lowerPrompt.includes("visual") || lowerPrompt.includes("theme")) {
      return "🎨 Design tips for a stunning profile:\n\n**Visual Hierarchy:**\n• Use a high-quality profile photo\n• Choose a color theme that matches your brand\n• Use consistent button styles\n\n**Best Practices:**\n• Dark mode friendly colors\n• Clear, readable fonts\n• Whitespace for breathing room\n• Eye-catching but not overwhelming\n\n**Color Combos:**\n• Professional: Navy + Gold\n• Creative: Purple + Pink\n• Minimal: Black + White\n• Vibrant: Blue + Orange\n\nTry our Customize tool to experiment!";
    }

    if (lowerPrompt.includes("grow") || lowerPrompt.includes("audience") || lowerPrompt.includes("traffic")) {
      return "📈 Growth strategies for your TreeBio:\n\n**Content Strategy:**\n1. Post consistently on your main platform\n2. Add new content links weekly\n3. Use your TreeBio link everywhere\n\n**Optimization:**\n• Track click analytics to see what works\n• A/B test different link orders\n• Update your bio regularly\n• Use call-to-actions in link titles\n\n**Promotion:**\n• Pin your TreeBio in social bios\n• Include it in email signatures\n• Share it in YouTube descriptions\n• Add to podcast show notes\n\n**Engagement:**\n• Respond to messages promptly\n• Offer exclusive content\n• Run giveaways or contests";
    }

    if (lowerPrompt.includes("thank") || lowerPrompt.includes("thanks")) {
      return "You're welcome! 😊 I'm here anytime you need help with your TreeBio. Feel free to ask me anything else!";
    }

    // Default response
    return "I can help you with that! Here are some suggestions:\n\n• **Bio Writing**: I can help craft compelling bios\n• **Link Strategy**: Advice on which links to prioritize\n• **Design Tips**: Make your profile visually appealing\n• **Growth Tactics**: Strategies to increase traffic\n• **Content Ideas**: What to share with your audience\n\nCould you provide more details about what you'd like to focus on?";
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 Hi! I'm your TreeBio AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat cleared!");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
      <Card className="border-2 shadow-2xl">
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Assistant
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Powered by TreeBio Intelligence
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="hover:bg-red-100 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          {/* Suggested Prompts */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
            <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Quick suggestions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_PROMPTS.map((suggestion) => (
                <Button
                  key={suggestion.title}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit(suggestion.prompt)}
                  disabled={isLoading}
                  className="justify-start h-auto py-2 text-left hover:bg-white dark:hover:bg-zinc-950"
                >
                  <suggestion.icon className={`h-4 w-4 mr-2 ${suggestion.color} flex-shrink-0`} />
                  <span className="text-xs">{suggestion.title}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Messages */}
          <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-blue-500"
                        : "bg-gradient-to-br from-purple-500 to-pink-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`flex-1 space-y-2 ${
                      message.role === "user" ? "items-end" : "items-start"
                    } flex flex-col`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {message.role === "user" ? "You" : "AI Assistant"}
                      </Badge>
                      {mounted && (
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[85%] group relative ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-zinc-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(message.content, message.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 shadow-md"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="text-xs mb-2">
                      AI Assistant
                    </Badge>
                    <div className="rounded-lg px-4 py-3 bg-gray-100 dark:bg-zinc-800">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your TreeBio profile..."
                className="min-h-[60px] max-h-[120px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSubmit()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px] bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
