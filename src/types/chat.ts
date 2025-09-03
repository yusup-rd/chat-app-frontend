export interface SendMessageRequest {
  receiverId: string;
  content: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderName?: string;
  receiverName?: string;
}

export interface SendMessageResponse {
  message: string;
  data: Message;
}

export interface ChatConversation {
  userId: string;
  username: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
