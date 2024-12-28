import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SidebarProvider } from './components/Sidebar/SidebarContext';
import { Navbar } from './components/Navbar';
import { TypewriterWelcome } from './components/TypewriterWelcome';
import { LoadingMessage } from './components/LoadingMessage';
import { sendChatMessage } from './services/api';
import { parseMessage } from './utils/messageParser';
import { Message } from './types/chat';
import { cn } from './lib/utils';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleMessageSelect = (message: Message) => {
    setSelectedMessageId(message.id);
    const messageElement = document.getElementById(`message-${message.id}`);
    messageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);
      const parsedResponse = parseMessage(response.prediction);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: parsedResponse.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        codeBlocks: parsedResponse.codeBlocks,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error processing your request. Please try again.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-zinc-900">
        <Navbar />
        <Sidebar 
          messages={messages} 
          onMessageSelect={handleMessageSelect}
        />
        
        <div className="flex-1 flex flex-col ml-[80px] mt-14">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <TypewriterWelcome />
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    id={`message-${msg.id}`}
                    className={cn(
                      "transition-all duration-200",
                      selectedMessageId === msg.id && "bg-white/5 -mx-4 px-4 py-2 rounded-lg"
                    )}
                  >
                    <ChatMessage {...msg} />
                  </div>
                ))}
                {isLoading && <LoadingMessage />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-zinc-900/80 backdrop-blur-sm">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;