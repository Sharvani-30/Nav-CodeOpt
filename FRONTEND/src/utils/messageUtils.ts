import { formatDate } from './dateUtils';

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

interface GroupedMessages {
  today: Message[];
  yesterday: Message[];
  older: Message[];
}

export function groupMessagesByDate(messages: Message[]): GroupedMessages {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  return messages.reduce(
    (groups, message) => {
      const messageDate = new Date(message.timestamp).toDateString();

      if (messageDate === today) {
        groups.today.push(message);
      } else if (messageDate === yesterday) {
        groups.yesterday.push(message);
      } else {
        groups.older.push(message);
      }

      return groups;
    },
    { today: [], yesterday: [], older: [] } as GroupedMessages
  );
}