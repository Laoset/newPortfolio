'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { IconBot, IconChatBot } from './icons';

const ChatBot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const t = useTranslations('Chatbot');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, locale: params.locale })
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Hubo un error, inténtalo más tarde.'
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="hidden lg:block fixed bottom-0 right-0 mb-4 mr-4 w-auto">
      {modalOpen && (
        <div className="border-[2px] border-gray-400 dark:border-[#323234] rounded-[20px] shadow dark:from-[#030a14] dark:to-[#161b21] bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0] w-[310px]">
          <div className="flex flex-row items-center justify-between px-[20px] py-[10px] cursor-default bg-[#eaeaec] dark:bg-[#1c1a27] rounded-tl-[20px] rounded-tr-[20px]">
            <div className="flex items-center justify-center bg-[#BB2649] h-[40px] w-[40px] rounded-[100%]">
              <p className="text-white font-semibold text-sm">#KC</p>
            </div>
            <p className="dark:text-[#ddd] font-semibold">{t('modalTitle')}</p>
            <button
              onClick={handleModalOpen}
              className="dark:text-[#ddd] font-semibold"
            >
              X
            </button>
          </div>
          <div className="p-[1rem] overflow-y-auto h-[400px]  px-[20px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-row items-center my-[0.5rem] mx-0 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="bg-[#BB2649] w-[32px] h-[32px] rounded-[100%] flex items-center justify-center mr-2">
                    <IconBot className="text-[#f8f7fd]" />
                  </div>
                )}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    background: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da'
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="px-[20px] mb-4">
            <div className="flex justify-between border-[2px] border-gray-400 dark:border-[#323234] rounded-[50px] py-2 px-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                placeholder={t('placeholder')}
                className="bg-transparent dark:text-white text-[15px] focus:outline-none w-[75%]"
              />
              <button
                onClick={sendMessage}
                className="bg-[#BB2649] text-white text-[15px] px-2 py-1 rounded-[20px]"
              >
                {t('button')}
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleModalOpen}
        id="open-chat"
        aria-label="Chat"
        name="Chat"
        className="relative flex justify-end place-self-end"
      >
        <IconChatBot
          className={`w-[40px] h-[40px] hover:text-[#BB2649] ${
            modalOpen ? 'text-[#BB2649]' : 'text-white'
          }`}
        />
      </button>
    </div>
  );
};

export default ChatBot;
