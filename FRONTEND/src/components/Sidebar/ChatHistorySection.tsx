import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { formatDate } from '../../utils/dateUtils';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

interface ChatHistorySectionProps {
  title: string;
  messages: Message[];
  onMessageClick: (message: Message) => void;
}

export function ChatHistorySection({ title, messages, onMessageClick }: ChatHistorySectionProps) {
  const { open } = useSidebar();
  const userMessages = messages.filter(msg => msg.isUser);

  if (userMessages.length === 0) return null;

  return (
    <div className="py-2">
      {open && (
        <h3 className="text-xs uppercase tracking-wider text-white/40 px-4 mb-2">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {userMessages.map((msg) => (
          <button
            key={msg.id}
            onClick={() => onMessageClick(msg)}
            className={cn(
              "w-full group relative",
              "flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-lg",
              "transition-colors duration-200 text-left"
            )}
          >
            <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" />
            {open ? (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">{msg.text}</p>
                <span className="text-xs text-white/40">{formatDate(msg.timestamp)}</span>
              </div>
            ) : (
              <div className="absolute left-16 hidden group-hover:block bg-zinc-800 p-2 rounded-lg shadow-lg z-50 whitespace-nowrap">
                <p className="text-sm text-white/80">{msg.text}</p>
                <span className="text-xs text-white/40 block mt-1">{formatDate(msg.timestamp)}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}