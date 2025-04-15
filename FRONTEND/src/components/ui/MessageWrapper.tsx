import React from 'react';
import { cn } from '../../lib/utils';
import { BackgroundGradient } from './BackgroundGradient';

interface MessageWrapperProps {
  children: React.ReactNode;
  isUser: boolean;
  className?: string;
}

export function MessageWrapper({ children, isUser, className }: MessageWrapperProps) {
  if (isUser) {
    return (
      <div className={cn(
        'rounded-3xl px-4 py-2 shadow-xl min-w-0 bg-zinc-800/80',
        className
      )}>
        {children}
      </div>
    );
  }

  return (
    <BackgroundGradient className={cn(
      'rounded-3xl px-4 py-2 shadow-xl min-w-0 bg-zinc-800/80',
      className
    )}>
      {children}
    </BackgroundGradient>
  );
}