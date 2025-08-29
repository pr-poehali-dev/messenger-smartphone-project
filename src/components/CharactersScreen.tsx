import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { AICharacter } from '@/types';

interface CharactersScreenProps {
  characters: AICharacter[];
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onCharacterSelect: (character: AICharacter) => void;
}

export default function CharactersScreen({ 
  characters, 
  currentScreen, 
  onNavigate, 
  onCharacterSelect 
}: CharactersScreenProps) {
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
        {characters.map((character) => (
          <Card 
            key={character.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            onClick={() => onCharacterSelect(character)}
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