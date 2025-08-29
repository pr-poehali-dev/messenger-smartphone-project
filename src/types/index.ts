export interface AICharacter {
  id: string;
  name: string;
  avatar: string;
  description: string;
  category: string;
  personality: string;
  isOnline: boolean;
  messageCount?: number;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  avatar?: string;
}

export interface Chat {
  id: string;
  character: AICharacter;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}