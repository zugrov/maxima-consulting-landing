import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function FloatingChatButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          Напишите нам в Telegram
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-slate-900 transform rotate-45 translate-y-1"></div>
        </div>
      )}
      
      {/* Floating Button */}
      <a
        href="https://t.me/maxima_cfo"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Открыть Telegram"
      >
        <MessageCircle size={24} />
      </a>

      {/* Pulse animation */}
      <div className="absolute inset-0 w-14 h-14 bg-teal-600 rounded-full animate-pulse opacity-20"></div>
    </div>
  );
}
