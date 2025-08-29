import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AICharacter {
  id: string;
  name: string;
  avatar: string;
  description: string;
  category: string;
  personality: string;
  isOnline: boolean;
  messageCount?: number;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  avatar?: string;
}

interface Chat {
  id: string;
  character: AICharacter;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

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

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex flex-col items-center justify-center p-6">
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 text-sm font-medium">
        <span>9:41</span>
        <div className="flex gap-1">
          <Icon name="Signal" size={16} />
          <Icon name="Wifi" size={16} />
          <Icon name="Battery" size={16} />
        </div>
      </div>

      {/* Floating Avatars */}
      <div className="relative w-full max-w-sm mb-12">
        <div className="absolute top-8 left-12 animate-float">
          <Avatar className="w-16 h-16 border-4 border-white/30 shadow-lg">
            <AvatarImage src="/img/9c9ba4e6-e74a-4832-9d1b-97c21de4235e.jpg" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="absolute top-32 right-8 animate-float" style={{ animationDelay: '1s' }}>
          <Avatar className="w-20 h-20 border-4 border-white/30 shadow-xl">
            <AvatarImage src="/img/1cc000a1-c92d-4aa7-b4a9-855418d3583f.jpg" />
            <AvatarFallback>Z</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="absolute top-48 left-8 animate-float" style={{ animationDelay: '2s' }}>
          <Avatar className="w-12 h-12 border-4 border-white/30 shadow-lg">
            <AvatarImage src="/img/fdc776f9-248f-4b0a-b617-7e6be6bb33f7.jpg" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 right-16 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Welcome Content */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-gray-600 max-w-xs leading-relaxed">
          Погружайтесь в AI-разговоры с вашими любимыми персонажами — в любое время, в любом месте
        </p>
      </div>

      {/* Auth Buttons */}
      <div className="space-y-4 w-full max-w-xs animate-fade-in">
        <Button 
          onClick={() => setCurrentScreen('characters')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-2xl font-medium shadow-lg"
        >
          <Icon name="Apple" size={20} className="mr-2" />
          Continue with Apple
        </Button>
        
        <Button 
          onClick={() => setCurrentScreen('characters')}
          variant="outline"
          className="w-full border-gray-300 py-3 rounded-2xl font-medium"
        >
          <Icon name="Chrome" size={20} className="mr-2" />
          Continue with Google
        </Button>
        
        <button 
          onClick={() => setCurrentScreen('characters')}
          className="w-full text-gray-600 text-sm underline mt-4"
        >
          Другие варианты
        </button>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-4 w-32 h-1 bg-black/20 rounded-full"></div>
    </div>
  );

  const CharactersScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-200 z-10">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex gap-1">
            <Icon name="Signal" size={16} />
            <Icon name="Wifi" size={16} />
            <Icon name="Battery" size={16} />
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Персонажи</h1>
            <div className="flex gap-2">
              <Icon name="Search" size={20} />
              <Icon name="SlidersHorizontal" size={20} />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge variant="default" className="whitespace-nowrap bg-black text-white">Все</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Дружба</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Развлечения</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Обучение</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Романтика</Badge>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 pb-20">
        {aiCharacters.map((character) => (
          <Card 
            key={character.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            onClick={() => {
              setSelectedCharacter(character);
              setCurrentScreen('profile');
            }}
          >
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-400 to-pink-400 relative">
                <img 
                  src={character.avatar} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className={`w-3 h-3 rounded-full ${character.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base mb-1">{character.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{character.description}</p>
                <Badge variant="secondary" className="text-xs">{character.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-purple-200 p-4">
        <div className="flex justify-around">
          <button 
            onClick={() => setCurrentScreen('characters')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'characters' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <Icon name="Users" size={24} />
            <span className="text-xs">Персонажи</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('chats')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'chats' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">Чаты</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Icon name="Plus" size={24} />
            <span className="text-xs">Создать</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
        <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-2"></div>
      </div>
    </div>
  );

  const ChatsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-200 z-10">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex gap-1">
            <Icon name="Signal" size={16} />
            <Icon name="Wifi" size={16} />
            <Icon name="Battery" size={16} />
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Чаты</h1>
            <div className="flex gap-2">
              <Icon name="Search" size={20} />
              <Icon name="Edit" size={20} />
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              placeholder="Поиск чатов..."
              className="pl-10 rounded-full border-purple-200"
            />
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="pb-20">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Icon name="MessageCircle" size={32} className="text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Пока нет чатов</h3>
            <p className="text-gray-600 mb-4">Выберите персонажа и начните общение</p>
            <Button 
              onClick={() => setCurrentScreen('characters')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Выбрать персонажа
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className="flex items-center p-4 hover:bg-white/50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedChat(chat);
                  setSelectedCharacter(chat.character);
                  setCurrentScreen('chat');
                }}
              >
                <Avatar className="w-12 h-12 mr-3">
                  <AvatarImage src={chat.character.avatar} />
                  <AvatarFallback>{chat.character.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold truncate">{chat.character.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white min-w-[20px] h-5 rounded-full text-xs">
                    {chat.unreadCount}
                  </Badge>
                )}
                <div className={`w-2 h-2 rounded-full ml-2 ${chat.character.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-purple-200 p-4">
        <div className="flex justify-around">
          <button 
            onClick={() => setCurrentScreen('characters')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'characters' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <Icon name="Users" size={24} />
            <span className="text-xs">Персонажи</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('chats')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'chats' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">Чаты</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Icon name="Plus" size={24} />
            <span className="text-xs">Создать</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
        <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-2"></div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-200 z-10">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex gap-1">
            <Icon name="Signal" size={16} />
            <Icon name="Wifi" size={16} />
            <Icon name="Battery" size={16} />
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 pb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentScreen('characters')}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="font-semibold">Профиль персонажа</h2>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>

      {selectedCharacter && (
        <div className="p-4 pb-20">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={selectedCharacter.avatar} />
                <AvatarFallback className="text-2xl">{selectedCharacter.name[0]}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-4 right-0 w-6 h-6 rounded-full border-2 border-white ${selectedCharacter.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{selectedCharacter.name}</h1>
            <Badge className="mb-3">{selectedCharacter.category}</Badge>
            <p className="text-gray-600 leading-relaxed">{selectedCharacter.description}</p>
          </div>

          {/* Personality */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Icon name="Sparkles" size={20} className="mr-2 text-purple-500" />
                Личность
              </h3>
              <p className="text-gray-600">{selectedCharacter.personality}</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">4.8</div>
                <div className="text-xs text-gray-600">Рейтинг</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">1.2k</div>
                <div className="text-xs text-gray-600">Чаты</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">24/7</div>
                <div className="text-xs text-gray-600">Онлайн</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => startChat(selectedCharacter)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-2xl font-medium shadow-lg"
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Начать чат
            </Button>
            <Button 
              variant="outline"
              className="w-full py-3 rounded-2xl font-medium"
            >
              <Icon name="Heart" size={20} className="mr-2" />
              Добавить в избранное
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const ChatScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-purple-200 z-10">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex gap-1">
            <Icon name="Signal" size={16} />
            <Icon name="Wifi" size={16} />
            <Icon name="Battery" size={16} />
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('chats')}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedCharacter?.avatar} />
              <AvatarFallback>{selectedCharacter?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{selectedCharacter?.name}</h2>
              <p className="text-xs text-green-500">онлайн</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Icon name="Phone" size={20} />
            <Icon name="MoreVertical" size={20} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {!message.isUser && (
              <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
                <AvatarImage src={message.avatar} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isUser
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white border border-purple-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="pr-20 rounded-full border-purple-200"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
                <Icon name="Paperclip" size={16} />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
                <Icon name="Mic" size={16} />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage}
            className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-purple-500 to-pink-500"
            disabled={!newMessage.trim()}
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
        <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="font-['SF_Pro_Display']">
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'characters' && <CharactersScreen />}
      {currentScreen === 'chats' && <ChatsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
    </div>
  );
}