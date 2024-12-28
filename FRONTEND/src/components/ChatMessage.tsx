import React from 'react';
import { User, Bot, Clock, Box } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '../lib/utils';
import { MessageWrapper } from './ui/MessageWrapper';
import { CodeBlock } from '../types/chat';
import ReactMarkdown from 'react-markdown';

interface ComplexityIndicator {
  time: string;
  space: string;
}

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: string;
  codeBlocks?: CodeBlock[];
  complexity?: ComplexityIndicator;
}

export function ChatMessage({ text, isUser, timestamp, codeBlocks, complexity }: ChatMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-4 px-4 max-w-3xl mx-auto">
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <User className="h-8 w-8 text-blue-400" />
        ) : (
          <Bot className="h-8 w-8 text-purple-400" />
        )}
      </div>
      
      <MessageWrapper isUser={isUser} className="flex-grow">
        <ReactMarkdown className="text-sm text-white prose prose-invert prose-sm max-w-none">
          {text}
        </ReactMarkdown>
        
        {codeBlocks?.map((block, index) => (
          <div key={index} className="mt-2 rounded-lg overflow-hidden">
            <div className="bg-zinc-800/50 px-4 py-1 text-xs text-white/60">
              {block.language}
            </div>
            <SyntaxHighlighter
              language={block.language}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                margin: 0,
                borderRadius: '0 0 0.5rem 0.5rem',
                fontSize: '0.875rem',
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'JetBrains Mono, monospace',
                }
              }}
            >
              {block.code}
            </SyntaxHighlighter>
          </div>
        ))}
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-white/60">{timestamp}</span>
          {!isUser && complexity && (
            <div className="flex gap-3">
              <div className="flex items-center gap-1 bg-zinc-900/50 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-white/80">O({complexity.time})</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-900/50 px-2 py-1 rounded-full">
                <Box className="h-3 w-3 text-purple-400" />
                <span className="text-xs text-white/80">O({complexity.space})</span>
              </div>
            </div>
          )}
        </div>
      </MessageWrapper>
    </div>
  );
}