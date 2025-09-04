# Chat App Frontend 💬

A modern, responsive real-time chat application frontend built with Next.js 14, TypeScript, and Tailwind CSS. Features include user authentication, profile management, real-time messaging with Socket.IO, and a beautiful UI with dark theme support.

## 🔗 Repository Links

- **Frontend**: https://github.com/yusup-rd/chat-app-frontend
- **Backend**: https://github.com/yusup-rd/chat-app-backend

## ✨ Features

- 🔐 **Authentication System** - Secure registration and login
- 👤 **Profile Management** - Complete profile setup with interests
- 💬 **Real-time Chat** - Instant messaging with Socket.IO
- 🟢 **Online Status** - Live user presence indicators
- ⌨️ **Typing Indicators** - See when users are typing
- 🔔 **Notifications** - Unread message badges and counts
- 📱 **Responsive Design** - Mobile-first responsive UI
- 🌙 **Dark Theme** - Modern dark theme with gradients
- 🎨 **Beautiful UI** - Tailwind CSS with custom components
- ⚡ **Performance** - Next.js 14 with App Router
- 🔄 **Auto-scroll** - Smart chat scrolling behavior

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO Client
- **HTTP Client**: Fetch API
- **State Management**: React Context
- **Form Validation**: Zod
- **Icons**: React Icons
- **Notifications**: React Toastify

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend services running (see backend README)
- Git

### Installation

1. **Clone the frontend repository**

   ```bash
   git clone https://github.com/yusup-rd/chat-app-frontend.git
   cd chat-app-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Make sure backend is running**

   ```bash
   # In backend directory
   docker compose up --build
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api/docs

## 📖 Getting Started Guide

### 1. Create Test Users

Navigate to http://localhost:3000/register and create 2-3 test users:

**Example users:**

```
User 1: john@example.com / password123
User 2: jane@example.com / password123
User 3: bob@example.com / password123
```

### 2. Login with User Credentials

Visit http://localhost:3000/login and use your created credentials.

### 3. Set Up Profile Data

After logging in, you'll be guided to complete your profile:

- **Basic Info**: Name, gender, date of birth
- **Physical**: Height, weight
- **Avatar**: Profile picture URL
- **Interests**: Add your hobbies and interests

### 4. Explore the Feed

- **Homepage** displays all users in the system
- Click **"Chat"** button on any user to start messaging

### 5. Test Real-time Chat

For the best real-time experience:

1. **Open 2 browsers** (Chrome + Firefox, or Chrome + Incognito)
2. **Login with different users** in each browser
3. **Start chatting** between the users
4. **Observe real-time features**:
   - ✅ Messages appear instantly
   - ✅ Online/offline status updates
   - ✅ Typing indicators
   - ✅ Message timestamps

### 6. Real-time Features in Action

- **Instant Messages**: No refresh needed
- **Online Status**: Green dot for online users
- **Typing Indicators**: "User is typing..." appears
- **Auto-scroll**: Chat scrolls to latest messages
- **Message Status**: Read/unread indicators

### 7. Notification System

- **Homepage**: Unread count badges on user cards
- **Conversations**: Message notification badges
- **Chat Page**: Real-time message indicators
- **Browser**: Toast notifications for new messages

## 📱 App Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (protected)/       # Protected routes
│   │   ├── chat/          # Chat page
│   │   ├── conversations/ # Conversations list
│   │   └── profile/       # Profile pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Forms/            # Form components
│   ├── Layout/           # Layout components
│   ├── Sections/         # Page sections
│   └── Skeletons/        # Loading skeletons
├── providers/            # Context providers
│   ├── AuthProvider/     # Authentication context
│   └── SocketProvider/   # Socket.IO context
├── types/                # TypeScript types
├── utils/                # Utility functions
└── api/                  # API functions
```

## 🔌 Real-time Events

### Socket.IO Events

**Emitted by Client:**

- `joinChat` - Join specific chat room
- `sendMessage` - Send message to user
- `typing` - Start typing indicator
- `stopTyping` - Stop typing indicator

**Received from Server:**

- `newMessage` - New message from other users
- `messageReceived` - Confirmation of sent message
- `userTyping` - Someone is typing
- `userOnline` - User came online
- `userOffline` - User went offline

## 🎨 UI/UX Features

### Design System

- **Dark Theme**: Modern dark color scheme
- **Gradients**: Beautiful gradient backgrounds and buttons
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects
- **Typography**: Clean, readable font hierarchy

### Components

- **Form Components**: Styled input fields and buttons
- **Layout Components**: Header, navigation, containers
- **Chat Components**: Message bubbles, typing indicators
- **Loading States**: Skeleton components for better UX

### Pages

- **Landing**: Welcome page with authentication
- **Login/Register**: Clean authentication forms
- **Profile**: Complete profile management
- **Feed**: User discovery with chat buttons
- **Chat**: Real-time messaging interface
- **Conversations**: Chat list with unread counts

## 🔧 Environment Configuration

The app connects to these backend services:

```
API Server: http://localhost:5000
Socket.IO: ws://localhost:5000
```

## 📱 Screenshots

### Authentication Pages

_Clean, modern login and registration forms_

### Homepage Feed

_Discover users with profile cards and chat buttons_

### Profile Management

_Complete profile setup with interests_

### Real-time Chat

_Instant messaging with typing indicators_

### Conversations List

_Chat history with unread message badges_

## 🚀 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checker
```

## 📦 Dependencies

### Core

- **Next.js**: React framework with App Router
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first CSS framework

### Real-time & API

- **Socket.IO Client**: Real-time WebSocket communication
- **Zod**: Runtime type validation
- **React Hook Form**: Form state management

### UI & UX

- **React Icons**: Icon library
- **React Toastify**: Toast notifications
- **Next/Image**: Optimized image loading

## 🔒 Authentication Flow

1. **Registration**: Create account with email/username
2. **Login**: JWT token-based authentication
3. **Protected Routes**: Automatic redirect for auth
4. **Profile Setup**: Complete profile after registration
5. **Persistent Session**: Token stored in localStorage
6. **Auto Logout**: Invalid/expired token handling

## 🚀 Performance Optimizations

- **Next.js 14**: Latest features and optimizations
- **App Router**: Better performance and developer experience
- **Image Optimization**: Next/Image for optimized loading
- **Code Splitting**: Automatic route-based splitting
- **TypeScript**: Compile-time error catching
- **Lazy Loading**: Components loaded on demand

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Build errors:**

```bash
npm run lint:fix
npm run type-check
```

**Connection issues:**

- Ensure backend is running on port 5000
- Check browser console for errors
- Verify Socket.IO connection

**Authentication issues:**

- Clear localStorage and cookies
- Check if JWT token is valid
- Verify API endpoints are accessible

---

Made with ❤️ using Next.js, TypeScript, Tailwind CSS and Socket.IO
