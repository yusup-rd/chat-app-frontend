'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/providers/AuthProvider';
import { useSocket } from '@/providers/SocketProvider';
import { viewMessages } from '@/api/chat';
import { getUserProfile } from '@/api/profile';
import { UserProfile } from '@/types/profile';
import { ErrorResponse } from '@/types/error';
import { toast } from 'react-toastify';
import { IoSend } from 'react-icons/io5';
import { FaChevronLeft } from 'react-icons/fa6';
import LoadingPage from '@/app/loading';
import { Message } from '@/types/chat';
import { formatTime, formatDate, groupMessagesByDate } from '@/utils/date';

const ChatPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading } = useAuth();
  const {
    socket,
    sendMessage: sendSocketMessage,
    joinChat,
    startTyping,
    stopTyping,
    isUserOnline,
  } = useSocket();
  const partnerId = searchParams.get('userId');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [partnerInfo, setPartnerInfo] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const [isLoadingPartner, setIsLoadingPartner] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(!!partnerId);
  const isLoading = loading || isLoadingPartner || isLoadingMessages;

  // Redirect if no partner ID
  useEffect(() => {
    if (!partnerId) {
      setIsLoadingMessages(false);
      router.push('/');
      toast.error('No chat partner specified');
    } else {
      setIsLoadingMessages(true);
    }
  }, [partnerId, router]);

  // Load partner info
  useEffect(() => {
    const loadPartnerInfo = async () => {
      if (!partnerId) return;

      try {
        setIsLoadingPartner(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await getUserProfile(token, partnerId);
        if ('message' in response) {
          throw response as ErrorResponse;
        }
        setPartnerInfo(response as UserProfile);
      } catch (error) {
        const errorResponse = error as ErrorResponse;
        toast.error(errorResponse.message || 'Failed to load partner info');
        router.push('/');
      } finally {
        setIsLoadingPartner(false);
      }
    };

    if (isAuthenticated && !loading) {
      loadPartnerInfo();
    }
  }, [partnerId, isAuthenticated, loading, router]);

  // Load messages when component mounts
  useEffect(() => {
    const loadMessages = async () => {
      if (!partnerId) return;

      try {
        setIsLoadingMessages(true);
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const fetchedMessages = await viewMessages(token, partnerId);

        setMessages(fetchedMessages);
        joinChat(partnerId);
      } catch (error) {
        const errorResponse = error as ErrorResponse;
        toast.error(errorResponse.message || 'Failed to load messages');
      } finally {
        setIsLoadingMessages(false);
      }
    };

    if (partnerId && isAuthenticated) {
      loadMessages();
    }
  }, [partnerId, isAuthenticated, joinChat]);

  // Set up Socket.io event listeners
  useEffect(() => {
    if (!partnerId || !socket) return;

    // Listen for new messages (from others)
    const handleNewMessage = (message: Message) => {
      if (message.senderId === partnerId || message.receiverId === partnerId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    // Listen for message confirmation (from our own sends)
    const handleMessageReceived = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    // Listen for typing indicators
    const handleTyping = (data: { userId: string; isTyping: boolean }) => {
      if (data.userId === partnerId) {
        setTypingUser(data.isTyping ? data.userId : null);
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('messageReceived', handleMessageReceived);
    socket.on('userTyping', handleTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageReceived', handleMessageReceived);
      socket.off('userTyping', handleTyping);
    };
  }, [partnerId, socket]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !partnerId) return;

    try {
      setSendingMessage(true);
      sendSocketMessage(newMessage.trim(), partnerId);
      setNewMessage('');
      stopTyping(partnerId);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      toast.error(errorResponse.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingPage withRadialBg={true} />;
  }

  if (!isAuthenticated || !partnerId) {
    return null;
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="radial-bg flex h-[100dvh] flex-col">
      {/* Chat Header */}
      <header className="flex flex-shrink-0 items-center gap-4 border-b border-white/10 bg-black/20 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="cursor-pointer text-white/70 duration-200 hover:text-white"
        >
          <FaChevronLeft />
        </button>

        <div className="size-10 overflow-hidden rounded-full">
          <Image
            src={partnerInfo?.avatar || '/avatars/avatar-placeholder.avif'}
            alt={'User Avatar'}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-semibold text-white">
            {partnerInfo?.name || `@${partnerInfo?.username}` || 'Loading...'}
          </h1>
          <p
            className={`text-sm ${partnerId && isUserOnline(partnerId) ? 'text-green-400' : 'text-white/60'}`}
          >
            {partnerId && isUserOnline(partnerId) ? 'Online' : 'Offline'}
          </p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {Object.keys(messageGroups).length === 0 && !isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-4xl">💬</div>
            <h2 className="mb-2 text-lg font-semibold text-white">Start a conversation</h2>
            <p className="text-white/60">
              Send a message to begin chatting with{' '}
              {partnerInfo?.name || `@${partnerInfo?.username}`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(messageGroups).map(([date, dayMessages]) => (
              <div key={date}>
                {/* Date Separator */}
                <div className="flex items-center justify-center py-2">
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {formatDate(date)}
                  </div>
                </div>

                {/* Messages for this date */}
                <div className="space-y-2">
                  {dayMessages.map((message) => {
                    const isOwn = message.senderId !== partnerId;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'from-primary-gradient-1 to-primary-gradient-2 bg-linear-to-r text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <p className="break-words">{message.content}</p>
                          <p
                            className={`mt-1 text-xs ${isOwn ? 'text-white/80' : 'text-white/60'}`}
                          >
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t border-white/10 bg-black/20 p-4">
        {/* Typing Indicator */}
        {typingUser && (
          <div className="mb-2 text-sm text-white/60">
            {partnerInfo?.name || `@${partnerInfo?.username}`} is typing...
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;

              if (e.target.value.trim() && partnerId) {
                startTyping(partnerId);
              } else if (partnerId) {
                stopTyping(partnerId);
              }
            }}
            onBlur={() => {
              if (partnerId) {
                stopTyping(partnerId);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder={`Message ${partnerInfo?.name || `@${partnerInfo?.username}`}...`}
            className="scrollbar-hide max-h-[120px] min-h-[40px] flex-1 resize-none overflow-y-auto rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
            disabled={sendingMessage}
            rows={1}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sendingMessage}
            className="from-primary-gradient-1 to-primary-gradient-2 flex size-10 items-center justify-center rounded-full bg-linear-to-r text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            aria-label="Send Message"
          >
            <IoSend className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
