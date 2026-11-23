'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { IconBot, IconChatBot } from './icons';
import {
  MAX_CONVERSATION_MESSAGES,
  MAX_MESSAGE_LENGTH
} from '@/lib/chat-guard';
import { prefersReducedMotion } from '@/lib/motion';

// Definimos tipos para evitar el uso de "any" implícito o estructuras sueltas
type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const ChatBot = () => {
  const t = useTranslations('Chatbot');
  const params = useParams();

  // Estados
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

  // Referencia para el auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const userTurns = messages.filter((msg) => msg.sender === 'user').length;
  const conversationFull = userTurns >= MAX_CONVERSATION_MESSAGES;

  // Efecto para bajar el scroll cuando hay nuevos mensajes o se abre el modal
  useEffect(() => {
    if (modalOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    }
  }, [messages, modalOpen]);

  useEffect(() => {
    if (modalOpen) inputRef.current?.focus();
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const conversationId = () => {
    try {
      const key = 'kc-chat-id';
      const existing = window.sessionStorage.getItem(key);
      if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) return existing;
      const created = crypto.randomUUID().replace(/-/g, '');
      window.sessionStorage.setItem(key, created);
      return created;
    } catch {
      return 'session';
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (
      !trimmed ||
      isLoading ||
      conversationFull ||
      trimmed.length > MAX_MESSAGE_LENGTH
    ) {
      return;
    }

    const userMessage: Message = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          locale: params.locale,
          conversationId: conversationId()
        })
      });

      const payload = (await response.json().catch(() => ({}))) as {
        response?: string;
        error?: string;
      };

      if (!response.ok) {
        const fallback =
          payload.error === 'conversation'
            ? t('conversationLimit')
            : response.status === 429
              ? t('rateLimit')
              : response.status === 400
                ? t('tooLong')
                : response.status === 503
                  ? t('unavailable')
                  : t('errorMessage');
        setMessages((prev) => [...prev, { sender: 'bot', text: fallback }]);
        return;
      }

      const botMessage: Message = {
        sender: 'bot',
        text: payload.response || t('errorMessage')
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: t('errorMessage') }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[22rem] flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)]">
      {modalOpen && (
        <div
          id="chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-panel-title"
          className="flex h-[min(70dvh,32rem)] w-full flex-col overflow-hidden rounded-[20px] border-[2px] border-gray-400 bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0] shadow-xl dark:border-[#323234] dark:from-[#030a14] dark:to-[#161b21]"
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-[20px] py-[10px] bg-[#eaeaec] dark:bg-[#1c1a27] shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-[#BB2649] h-[30px] w-[30px] rounded-full">
                <p className="text-white font-semibold text-xs">AI</p>
              </div>
              <p
                id="chat-panel-title"
                className="dark:text-[#ddd] font-semibold text-sm"
              >
                {t('modalTitle')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
                toggleRef.current?.focus();
              }}
              className="dark:text-[#ddd] font-bold hover:text-[#BB2649] transition-colors"
              aria-label={t('close')}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-[1rem] overflow-y-auto scrollbar-thin">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm mt-10">
                {t('welcomeMessage') || '¡Hola! ¿En qué puedo ayudarte?'}
              </p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-row items-end my-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="bg-[#BB2649] w-[24px] h-[24px] rounded-full flex items-center justify-center mr-2 shrink-0">
                    <IconBot className="text-white w-3 h-3" />
                  </div>
                )}
                <span
                  className={`inline-block py-2 px-3 rounded-xl text-sm max-w-[80%] break-words shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#d1e7dd] text-gray-800 rounded-br-none'
                      : 'bg-white dark:bg-[#2a2a2e] dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start my-2 ml-8">
                <span className="text-xs text-gray-400 animate-pulse">
                  {t('loading')}
                </span>
              </div>
            )}
            {/* Dummy div para el auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area (Form) */}
          <div className="p-[15px] bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <form
              onSubmit={sendMessage}
              className="flex justify-between items-center border border-gray-400 dark:border-[#555] rounded-full py-1 px-1 bg-white dark:bg-[#1c1a27]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))
                }
                placeholder={t('placeholder')}
                disabled={isLoading || conversationFull}
                maxLength={MAX_MESSAGE_LENGTH}
                className="bg-transparent dark:text-white text-sm px-3 py-2 focus:outline-none w-full disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || conversationFull}
                className="bg-[#BB2649] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#9e1f3d] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? '...' : t('button')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setModalOpen((open) => !open)}
        aria-label={modalOpen ? t('close') : t('open')}
        aria-expanded={modalOpen}
        aria-controls="chat-panel"
        className="relative flex justify-end place-self-end transition-transform motion-reduce:transition-none hover:scale-105 motion-reduce:hover:scale-100"
      >
        <IconChatBot
          className={`w-[50px] h-[50px] drop-shadow-lg ${
            modalOpen ? 'text-shadow-pink' : 'text-shadow-pink rounded-full p-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ChatBot;
