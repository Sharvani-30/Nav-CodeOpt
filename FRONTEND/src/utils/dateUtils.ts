export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today at ${timestamp}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${timestamp}`;
  } else {
    return new Date(timestamp).toLocaleDateString();
  }
}