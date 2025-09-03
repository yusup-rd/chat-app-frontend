import { SendMessageRequest, SendMessageResponse, Message, ChatConversation } from '@/types/chat';
import { ErrorResponse } from '@/types/error';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw data as ErrorResponse;
  }
  return data as T;
}

export async function sendMessage(
  token: string,
  messageData: SendMessageRequest,
): Promise<SendMessageResponse> {
  const res = await fetch(`${API_URL}/chat/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  });
  return handleResponse<SendMessageResponse>(res);
}

export async function viewMessages(token: string, userId: string): Promise<Message[]> {
  const res = await fetch(`${API_URL}/chat/viewMessages/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<Message[]>(res);
}

export async function getChatList(token: string): Promise<ChatConversation[]> {
  const res = await fetch(`${API_URL}/chat/conversations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<ChatConversation[]>(res);
}
