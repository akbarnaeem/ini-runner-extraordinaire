import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface CareerChatbotProps {
  className?: string;
}

export const CareerChatbot: React.FC<CareerChatbotProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI career advisor. I can help you with career planning, skill development, and finding learning resources. What would you like to explore today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "What skills should I learn for data science?",
        "How can I transition to product management?",
        "Show me trending tech skills",
        "Help me plan my career path"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const responses = {
      'data science': {
        text: "For data science, I recommend focusing on these key skills:\n\n🐍 **Python** - Essential for data manipulation and modeling\n📊 **SQL** - Critical for data extraction and analysis\n🤖 **Machine Learning** - Core algorithms and frameworks\n📈 **Statistics** - Foundation for data interpretation\n🔍 **Data Visualization** - Tools like Tableau or matplotlib\n\nWould you like me to recommend specific courses for any of these areas?",
        suggestions: ["Show me Python courses", "Best ML learning resources", "How long to become job-ready?"]
      },
      'product management': {
        text: "Transitioning to product management is exciting! Here's a roadmap:\n\n🎯 **Core Skills to Develop:**\n• User research and customer empathy\n• Data analysis and metrics\n• Strategic thinking and prioritization\n• Communication and stakeholder management\n\n📚 **Learning Path:**\n1. Take PM fundamentals courses\n2. Practice with personal projects\n3. Network with current PMs\n4. Consider PM bootcamps\n\nYour technical background is actually a huge advantage!",
        suggestions: ["Find PM courses", "How to build a PM portfolio", "Networking tips for PMs"]
      },
      'trending skills': {
        text: "Here are the hottest tech skills right now:\n\n🔥 **AI/ML Skills (High Demand)**\n• Generative AI and LLMs\n• Machine Learning Engineering\n• MLOps and Model Deployment\n\n☁️ **Cloud & DevOps**\n• Kubernetes and containerization\n• AWS/Azure certifications\n• Infrastructure as Code\n\n💻 **Development**\n• React/Next.js\n• TypeScript\n• Full-stack development\n\nWhich area interests you most?",
        suggestions: ["Learn AI/ML skills", "Cloud certification path", "Full-stack roadmap"]
      },
      'career path': {
        text: "I'd love to help you plan your career path! To give you personalized advice, tell me:\n\n🎯 **Current Situation:**\n• What's your current role/background?\n• What industry are you in?\n• What skills do you currently have?\n\n🚀 **Goals:**\n• Where do you want to be in 2-3 years?\n• What motivates you most?\n• Any specific companies you admire?\n\nThe more you share, the better I can tailor my recommendations!",
        suggestions: ["I'm a software engineer", "I'm transitioning careers", "I'm a recent graduate"]
      }
    };

    // Simple keyword matching for demo
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key.replace(' ', ''))) {
        return {
          id: Date.now().toString(),
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: response.suggestions
        };
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: "That's a great question! While I'm still learning, I can help you with:\n\n• Career planning and skill development\n• Finding relevant courses and resources\n• Understanding market trends\n• Planning career transitions\n\nCould you be more specific about what you'd like to explore?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Help me choose a career path",
        "What skills are in demand?",
        "How to upskill effectively?"
      ]
    };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={`h-[600px] flex flex-col skill-shadow border-0 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 skill-gradient rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-skill to-primary bg-clip-text text-transparent">
            AI Career Advisor
          </span>
          <Sparkles className="h-4 w-4 text-skill" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.sender === 'bot' ? 'bg-skill text-white' : 'bg-primary text-white'}>
                    {message.sender === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 ml-11">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs border-skill/30 text-skill hover:bg-skill hover:text-white transition-colors"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-skill text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-skill rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-skill rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-skill rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about careers, skills, or learning paths..."
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim() || isTyping}
            className="skill-gradient text-white border-0 hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};