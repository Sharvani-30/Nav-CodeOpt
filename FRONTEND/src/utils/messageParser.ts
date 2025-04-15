import { ParsedMessage } from '../types/chat';

interface CodeBlock {
  language: string;
  code: string;
}

function extractCodeBlocks(message: string): { text: string; codeBlocks: CodeBlock[] } {
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  const codeBlocks: CodeBlock[] = [];
  let lastIndex = 0;
  let textParts: string[] = [];
  
  let match;
  while ((match = codeBlockRegex.exec(message)) !== null) {
    // Add text before code block
    textParts.push(message.slice(lastIndex, match.index));
    
    // Extract language and code
    const language = match[1] || 'plaintext';
    const code = match[2].trim();
    
    codeBlocks.push({ language, code });
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  textParts.push(message.slice(lastIndex));
  
  return {
    text: textParts.join(' ').trim(),
    codeBlocks
  };
}

export function parseMessage(message: string): ParsedMessage {
  const { text, codeBlocks } = extractCodeBlocks(message);
  
  return {
    text,
    codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined
  };
}