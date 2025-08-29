import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import CharactersScreen from '@/components/CharactersScreen';
import ChatsScreen from '@/components/ChatsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import ChatScreen from '@/components/ChatScreen';
import type { AICharacter, Message, Chat } from '@/types';

const aiCharacters: AICharacter[] = [
  {
    id: '1',
    name: 'Luna',
    avatar: '/img/9c9ba4e6-e74a-4832-9d1b-97c21de4235e.jpg',
    description: 'Дружелюбный AI-помощник для ежедневного общения',
    category: 'Дружба',
    personality: 'Добрая, понимающая, всегда готова выслушать',
    isOnline: true,
    messageCount: 3
  },
  {
    id: '2', 
    name: 'Zara',
    avatar: '/img/1cc000a1-c92d-4aa7-b4a9-855418d3583f.jpg',
    description: 'Киберпанк-персонаж для креативных бесед',
    category: 'Развлечения',
    personality: 'Харизматичная, остроумная, любит технологии',
    isOnline: true,
    messageCount: 2
  },
  {
    id: '3',
    name: 'Nova',
    avatar: '/img/fdc776f9-248f-4b0a-b617-7e6be6bb33f7.jpg',
    description: 'Мистический персонаж для глубоких разговоров',
    category: 'Обучение',
    personality: 'Мудрая, спокойная, философская',
    isOnline: false
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'Привет! Как дела? Что интересного происходит у тебя сегодня?',
    isUser: false,
    timestamp: '10:30',
    avatar: '/img/9c9ba4e6-e74a-4832-9d1b-97c21de4235e.jpg'
  },
  {
    id: '2',
    text: 'Привет Luna! Работаю над новым проектом, очень увлекательно',
    isUser: true,
    timestamp: '10:32'
  },
  {
    id: '3',
    text: 'Звучит здорово! Расскажи подробнее, чем занимаешься? Я всегда готова обсудить интересные проекты',
    isUser: false,
    timestamp: '10:33',
    avatar: '/img/9c9ba4e6-e74a-4832-9d1b-97c21de4235e.jpg'
  }
];

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'characters' | 'chats' | 'chat' | 'profile'>('welcome');
  const [selectedCharacter, setSelectedCharacter] = useState<AICharacter | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      character: aiCharacters[0],
      lastMessage: 'Звучит здорово! Расскажи подробнее...',
      timestamp: '10:33',
      unreadCount: 0
    },
    {
      id: '2', 
      character: aiCharacters[1],
      lastMessage: 'Что думаешь о новых технологиях?',
      timestamp: 'вчера',
      unreadCount: 2
    }
  ]);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as any);
  };

  const handleCharacterSelect = (character: AICharacter) => {
    setSelectedCharacter(character);
    setCurrentScreen('profile');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setSelectedCharacter(chat.character);
    setCurrentScreen('chat');
  };

  const startChat = (character: AICharacter) => {
    const existingChat = chats.find(chat => chat.character.id === character.id);
    if (existingChat) {
      setSelectedChat(existingChat);
      setSelectedCharacter(character);
      setCurrentScreen('chat');
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        character,
        lastMessage: 'Начать общение',
        timestamp: 'сейчас',
        unreadCount: 0
      };
      setChats([newChat, ...chats]);
      setSelectedChat(newChat);
      setSelectedCharacter(character);
      setCurrentScreen('chat');
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Update chat list
    if (selectedChat) {
      const updatedChats = chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, lastMessage: newMessage, timestamp: 'сейчас' }
          : chat
      );
      setChats(updatedChats);
    }
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Это интересно! Расскажи больше об этом.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        avatar: selectedCharacter?.avatar
      };
      setMessages(prev => [...prev, aiResponse]);
      
      if (selectedChat) {
        const updatedChats = chats.map(chat => 
          chat.id === selectedChat.id 
            ? { ...chat, lastMessage: aiResponse.text, timestamp: 'сейчас' }
            : chat
        );
        setChats(updatedChats);
      }
    }, 1000);
  };

  return (
    <div className="font-['SF_Pro_Display']">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'characters' && (
        <CharactersScreen 
          characters={aiCharacters}
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onCharacterSelect={handleCharacterSelect}
        />
      )}
      {currentScreen === 'chats' && (
        <ChatsScreen 
          chats={chats}
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onChatSelect={handleChatSelect}
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen 
          character={selectedCharacter}
          onNavigate={handleNavigate}
          onStartChat={startChat}
        />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen 
          character={selectedCharacter}
          messages={messages}
          newMessage={newMessage}
          onNavigate={handleNavigate}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}