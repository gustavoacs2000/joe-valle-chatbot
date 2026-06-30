'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, FormEvent } from 'react';

const WELCOME_MESSAGE = {
  id: 'welcome-msg',
  role: 'assistant' as const,
  content:
    'Olá! Sou o JoeBot, assistente virtual de campanha do Joe Valle. O que mais te preocupa no nosso cenário distrital atual para que eu possa te mostrar como podemos ajudar?',
};

export default function JoeBotChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ initialMessages: [WELCOME_MESSAGE] });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  return (
    <div
      style={{ height: '100dvh' }}
      className="flex flex-col bg-[#eceef1] overflow-hidden"
    >
      {/* ── Header ── */}
      <header className="flex-shrink-0 flex items-center gap-3 bg-[#0d2240] px-4 py-3 shadow-md">
        <div className="w-10 h-10 rounded-full bg-[#2e7d32] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none">
          JV
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-base leading-tight">
            JoeBot
          </p>
          <p className="text-[#66bb6a] text-xs leading-tight">
            EngajaBR · Campanha 2026
          </p>
        </div>
      </header>

      {/* ── Message list ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#2e7d32] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-0.5 select-none">
                  JV
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  isUser
                    ? 'bg-[#1565c0] text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-[#2e7d32] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-0.5 select-none">
              JV
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div
        className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-2.5"
        style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
      >
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-full bg-[#f0f2f5] px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1565c0]/30 transition-shadow"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar"
            className="w-10 h-10 rounded-full bg-[#1565c0] flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-[#0d47a1] active:scale-95 transition-all duration-150"
          >
            {/* Paper-plane icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5 translate-x-px"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
