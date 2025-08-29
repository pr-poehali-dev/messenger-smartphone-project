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
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'characters' | 'chat'>('welcome');
  const [selectedCharacter, setSelectedCharacter] = useState<AICharacter | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');

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
            <h1 className="text-2xl font-bold">Lyno</h1>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Get Lai+</Badge>
            <div className="flex gap-2">
              <Icon name="Search" size={20} />
              <Icon name="Bell" size={20} />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge variant="default" className="whitespace-nowrap bg-black text-white">For You</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Featured</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Scenes</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Voices</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Groups</Badge>
          </div>
        </div>
      </div>

      {/* Character Cards */}
      <div className="p-4 space-y-4">
        {aiCharacters.map((character) => (
          <Card 
            key={character.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            onClick={() => {
              setSelectedCharacter(character);
              setCurrentScreen('chat');
            }}
          >
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={character.avatar} />
                    <AvatarFallback>{character.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-lg mb-1">{character.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{character.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{character.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Icon name="Eye" size={12} className="mr-1" />
                      830.8k
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-purple-200 p-4">
        <div className="flex justify-around">
          <Icon name="Home" size={24} />
          <Icon name="MessageCircle" size={24} />
          <Icon name="Plus" size={24} />
          <Icon name="User" size={24} />
        </div>
        <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-2"></div>
      </div>
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
              onClick={() => setCurrentScreen('characters')}
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
            <Icon name="Search" size={20} />
            <Icon name="Bell" size={20} />
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
      {currentScreen === 'chat' && <ChatScreen />}
    </div>
  );
}