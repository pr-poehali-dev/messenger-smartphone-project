import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
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
          onClick={() => onNavigate('characters')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-2xl font-medium shadow-lg"
        >
          <Icon name="Apple" size={20} className="mr-2" />
          Continue with Apple
        </Button>
        
        <Button 
          onClick={() => onNavigate('characters')}
          variant="outline"
          className="w-full border-gray-300 py-3 rounded-2xl font-medium"
        >
          <Icon name="Chrome" size={20} className="mr-2" />
          Continue with Google
        </Button>
        
        <button 
          onClick={() => onNavigate('characters')}
          className="w-full text-gray-600 text-sm underline mt-4"
        >
          Другие варианты
        </button>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-4 w-32 h-1 bg-black/20 rounded-full"></div>
    </div>
  );
}