import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { AICharacter, Message } from '@/types';

interface ChatScreenProps {
  character: AICharacter | null;
  messages: Message[];
  newMessage: string;
  onNavigate: (screen: string) => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function ChatScreen({ 
  character, 
  messages, 
  newMessage, 
  onNavigate, 
  onMessageChange, 
  onSendMessage 
}: ChatScreenProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
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
              onClick={() => onNavigate('chats')}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={character?.avatar} />
              <AvatarFallback>{character?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{character?.name}</h2>
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
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Написать сообщение..."
              className="pr-20 rounded-full border-purple-200"
              onKeyPress={handleKeyPress}
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
            onClick={onSendMessage}
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
}