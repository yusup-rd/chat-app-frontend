'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthProvider';
import { Message } from 'yup';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  isUserOnline: (userId: string) => boolean;
  sendMessage: (message: string, receiverId: string) => void;
  joinChat: (otherUserId: string) => void;
  startTyping: (receiverId: string) => void;
  stopTyping: (receiverId: string) => void;
  onNewMessage: (callback: (message: Message) => void) => void;
  onTyping: (callback: (data: { userId: string; isTyping: boolean }) => void) => void;
  onUserOnline: (callback: (userId: string) => void) => void;
  onUserOffline: (callback: (userId: string) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const newSocket = io(
          process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000',
          {
            auth: {
              token: token,
            },
            extraHeaders: {
              Authorization: `Bearer ${token}`,
            },
            autoConnect: true,
          },
        );

        newSocket.on('connect', () => {
          setIsConnected(true);
          console.log('Connected to server');
        });

        newSocket.on('disconnect', () => {
          setIsConnected(false);
          setOnlineUsers(new Set());
          console.log('Disconnected from server');
        });

        newSocket.on('userOnline', (userId: string) => {
          setOnlineUsers((prev) => new Set([...prev, userId]));
        });

        newSocket.on('userOffline', (userId: string) => {
          setOnlineUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(userId);
            return newSet;
          });
        });

        newSocket.on('error', (error) => {
          console.error('Socket error:', error);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      }
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const sendMessage = (message: string, receiverId: string) => {
    if (socket && isConnected) {
      socket.emit('sendMessage', {
        content: message,
        receiverId: receiverId,
      });
    }
  };

  const joinChat = (otherUserId: string) => {
    if (socket && isConnected) {
      socket.emit('joinChat', { otherUserId });
    }
  };

  const startTyping = (receiverId: string) => {
    if (socket && isConnected) {
      socket.emit('typing', { receiverId, isTyping: true });

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Auto-stop typing after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        stopTyping(receiverId);
      }, 3000);
    }
  };

  const stopTyping = (receiverId: string) => {
    if (socket && isConnected) {
      socket.emit('typing', { receiverId, isTyping: false });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  const onNewMessage = (callback: (message: Message) => void) => {
    if (socket) {
      socket.on('newMessage', callback);
      return () => socket.off('newMessage', callback);
    }
    return () => {};
  };

  const onTyping = (callback: (data: { userId: string; isTyping: boolean }) => void) => {
    if (socket) {
      socket.on('userTyping', callback);
      return () => socket.off('userTyping', callback);
    }
    return () => {};
  };

  const onUserOnline = (callback: (userId: string) => void) => {
    if (socket) {
      socket.on('userOnline', callback);
      return () => socket.off('userOnline', callback);
    }
    return () => {};
  };

  const onUserOffline = (callback: (userId: string) => void) => {
    if (socket) {
      socket.on('userOffline', callback);
      return () => socket.off('userOffline', callback);
    }
    return () => {};
  };

  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.has(userId);
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    onlineUsers,
    isUserOnline,
    sendMessage,
    joinChat,
    startTyping,
    stopTyping,
    onNewMessage,
    onTyping,
    onUserOnline,
    onUserOffline,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
