'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useSocket } from '@/providers/SocketProvider';
import { getChatList } from '@/api/chat';
import { ChatConversation } from '@/types/chat';
import { Message } from '@/types/chat';
import { ErrorResponse } from '@/types/error';
import { toast } from 'react-toastify';
import { formatTime } from '@/utils/date';
import LoadingPage from '@/app/loading';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa6';

const ConversationsPage = () => {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();
  const { isUserOnline, isUserTyping, onNewMessage } = useSocket();

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingConversations(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const chatList = await getChatList(token);
        setConversations(chatList);
      } catch (error) {
        const errorResponse = error as ErrorResponse;
        toast.error(errorResponse.message || 'Failed to load conversations');
      } finally {
        setIsLoadingConversations(false);
      }
    };

    if (isAuthenticated && !loading) {
      loadConversations();
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleNewMessage = (message: Message) => {
      setConversations((prevConversations) => {
        return prevConversations.map((conversation) => {
          if (
            conversation.userId === message.senderId ||
            conversation.userId === message.receiverId
          ) {
            return {
              ...conversation,
              lastMessage: message.content,
              lastMessageTime: message.createdAt,
              unreadCount:
                conversation.userId === message.senderId
                  ? conversation.unreadCount + 1
                  : conversation.unreadCount,
            };
          }
          return conversation;
        });
      });
    };

    const unsubscribe = onNewMessage(handleNewMessage);

    return () => {
      unsubscribe();
    };
  }, [isAuthenticated, onNewMessage]);

  if (loading || isLoadingConversations) {
    return <LoadingPage withRadialBg={true} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="radial-bg flex max-h-screen min-h-screen flex-col">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center gap-3 border-b border-white/10 bg-black/20 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="cursor-pointer text-white/70 duration-200 hover:text-white"
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-xl font-semibold text-white">Messages</h1>
      </header>

      {/* Conversations List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-4xl">💬</div>
            <h2 className="mb-2 text-lg font-semibold text-white">No conversations yet</h2>
            <p className="text-white/60">Start a conversation by finding users on the home page</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {conversations.map((conversation) => {
              const isOnline = isUserOnline(conversation.userId);
              const isTyping = isUserTyping(conversation.userId);

              return (
                <Link
                  key={conversation.userId}
                  href={`/chat?userId=${conversation.userId}`}
                  className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
                >
                  {/* Avatar with online indicator */}
                  <div className="relative">
                    <div className="size-12 overflow-hidden rounded-full">
                      <Image
                        src={conversation.avatar || '/avatars/avatar-placeholder.avif'}
                        alt={`${conversation.name || conversation.username}'s avatar`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Online status indicator */}
                    {isOnline && (
                      <div className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-2 border-black bg-green-500"></div>
                    )}
                  </div>

                  {/* Conversation details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate font-medium text-white">
                        {conversation.name || `@${conversation.username}`}
                      </h3>
                      <span className="flex-shrink-0 text-xs text-white/60">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm text-white/70">
                        {isTyping ? (
                          <span className="text-blue-400 italic">typing...</span>
                        ) : (
                          conversation.lastMessage
                        )}
                      </p>

                      {/* Unread count badge */}
                      {conversation.unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;
