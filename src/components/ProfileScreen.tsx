import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { AICharacter } from '@/types';

interface ProfileScreenProps {
  character: AICharacter | null;
  onNavigate: (screen: string) => void;
  onStartChat: (character: AICharacter) => void;
}

export default function ProfileScreen({ 
  character, 
  onNavigate, 
  onStartChat 
}: ProfileScreenProps) {
  if (!character) {
    return null;
  }

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
        
        <div className="flex items-center justify-between px-4 pb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('characters')}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="font-semibold">Профиль персонажа</h2>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Avatar and Basic Info */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src={character.avatar} />
              <AvatarFallback className="text-2xl">{character.name[0]}</AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-4 right-0 w-6 h-6 rounded-full border-2 border-white ${character.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
          <Badge className="mb-3">{character.category}</Badge>
          <p className="text-gray-600 leading-relaxed">{character.description}</p>
        </div>

        {/* Personality */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Icon name="Sparkles" size={20} className="mr-2 text-purple-500" />
              Личность
            </h3>
            <p className="text-gray-600">{character.personality}</p>
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
            onClick={() => onStartChat(character)}
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
    </div>
  );
}