import React from 'react';
import { useSidebar } from './SidebarContext';
import { ChatHistorySection } from './ChatHistorySection';
import { SidebarFooter } from './SidebarFooter';
import { groupMessagesByDate } from '../../utils/messageUtils';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

interface SidebarProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
}

export function Sidebar({ messages, onMessageSelect }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out bg-zinc-900/80 backdrop-blur-md border-r border-white/10 z-40",
        open ? "w-[280px]" : "w-[80px]"
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {Object.entries(groupedMessages).map(([section, msgs]) => (
            msgs.length > 0 && (
              <ChatHistorySection 
                key={section} 
                title={section} 
                messages={msgs}
                onMessageClick={onMessageSelect}
              />
            )
          ))}
        </div>
        <SidebarFooter />
      </div>
    </aside>
  );
}