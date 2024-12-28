import { ChatResponse } from '../types/chat';

const API_URL = 'https://d735-34-125-235-166.ngrok-free.app';

export async function sendChatMessage(input: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message. Please check your connection and try again.');
  }
}