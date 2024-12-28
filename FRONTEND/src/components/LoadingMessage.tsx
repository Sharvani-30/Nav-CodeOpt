import React from 'react';
import { Bot } from 'lucide-react';
import { MessageWrapper } from './ui/MessageWrapper';

export function LoadingMessage() {
  return (
    <div className="flex items-start gap-4 mb-4 px-4 max-w-3xl mx-auto">
      <div className="flex-shrink-0 mt-1">
        <Bot className="h-8 w-8 text-purple-400" />
      </div>
      <MessageWrapper isUser={false} className="flex-grow">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
      </MessageWrapper>
    </div>
  );
}