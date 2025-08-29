import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Chat } from '@/types';

interface ChatsScreenProps {
  chats: Chat[];
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onChatSelect: (chat: Chat) => void;
}

export default function ChatsScreen({ 
  chats, 
  currentScreen, 
  onNavigate, 
  onChatSelect 
}: ChatsScreenProps) {
  return (
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
              onClick={() => onNavigate('characters')}
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
                onClick={() => onChatSelect(chat)}
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
            onClick={() => onNavigate('characters')}
            className={`flex flex-col items-center gap-1 ${currentScreen === 'characters' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <Icon name="Users" size={24} />
            <span className="text-xs">Персонажи</span>
          </button>
          <button 
            onClick={() => onNavigate('chats')}
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
}