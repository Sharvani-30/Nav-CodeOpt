import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSidebar } from './SidebarContext';

interface ChatHistoryProps {
  messages: Array<{
    id: string;
    text: string;
    timestamp: string;
  }>;
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const { open } = useSidebar();

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
          {open && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-white truncate">{msg.text}</p>
              <span className="text-xs text-white/60">{msg.timestamp}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
