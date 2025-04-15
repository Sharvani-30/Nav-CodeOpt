export interface ChatResponse {
  prediction: string;
}

export interface CodeBlock {
  language: string;
  code: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  codeBlocks?: CodeBlock[];
}

export interface ParsedMessage {
  text: string;
  codeBlocks?: CodeBlock[];
}