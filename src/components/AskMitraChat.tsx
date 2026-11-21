import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import type { AudienceMode, DepthLevel, Language } from '../types/election';
import { answerOfflineFaq } from '../data/constants';

interface AskMitraChatProps {
  language: Language;
  depth: DepthLevel;
  audience: AudienceMode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  source?: 'gemini' | 'offline-faq';
  isError?: boolean;
}

export const AskMitraChat: React.FC<AskMitraChatProps> = ({
  language,
  depth,
  audience,
  isOpen,
  setIsOpen,
}) => {
  const isKn = language === 'kn';
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offlineOnlyMode, setOfflineOnlyMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: isKn
        ? 'ನಮಸ್ಕಾರ! ನಾನು ಮತದಾನ ಮಿತ್ರ. ಮತದಾರರ ನೋಂದಣಿ (ಫಾರ್ಮ್ 6/8), VVPAT, ನೀತಿ ಸಂಹಿತೆ ಅಥವಾ ಕರ್ನಾಟಕ ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆಯ ಬಗ್ಗೆ ನಿಷ್ಪಕ್ಷಪಾತ ಮಾಹಿತಿ ಕೇಳಿ.'
        : 'Namaskara! I am Matadaan Mitra. Ask any non-partisan question about voter registration (Form 6/8), VVPAT 7-second slips, Model Code of Conduct, or Karnataka elections.',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (questionText?: string) => {
    const trimmed = (questionText ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');

    // Use built-in rule-based FAQ if Offline mode is selected or browser is offline
    if (offlineOnlyMode || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
      const offlineReply = answerOfflineFaq(trimmed, language);
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: offlineReply,
          source: 'offline-faq',
        },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
          language,
          depth,
          audience,
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string; code?: string };

      if (!res.ok || !data.reply) {
        const errMsg =
          data.error ||
          (isKn
            ? 'Gemini ಸೇವೆಯನ್ನು ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.'
            : 'Unable to reach Gemini assistant right now.');
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'model',
            text: `${errMsg}\n\n${isKn ? 'ಆಫ್‌ಲೈನ್ FAQ ಉತ್ತರ:' : 'Offline FAQ match:'} ${answerOfflineFaq(trimmed, language)}`,
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now()}`,
            role: 'model',
            text: data.reply || '',
            source: 'gemini',
          },
        ]);
      }
    } catch {
      const fallback = answerOfflineFaq(trimmed, language);
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'model',
          text: `${isKn ? 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ — ಆಫ್‌ಲೈನ್ FAQ ಉತ್ತರ:' : 'Network unavailable — Offline FAQ response:'} ${fallback}`,
          source: 'offline-faq',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = isKn
    ? ['ಫಾರ್ಮ್ 6 vs ಫಾರ್ಮ್ 8 ವ್ಯತ್ಯಾಸವೇನು?', 'VVPAT ಸ್ಲಿಪ್‌ನಲ್ಲಿ ಫೋಟೋ ಇರುತ್ತದೆಯೇ?', '48 ಗಂಟೆ ಮೌನ ಅವಧಿ ಎಂದರೇನು?']
    : ['Form 6 vs Form 8 difference?', 'Does VVPAT show candidate photo?', 'What is the 48-hour silence period?'];

  return (
    <>
      {/* Floating Chat Trigger */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={isKn ? 'ಮತದಾನ ಮಿತ್ರ AI ಸಹಾಯಕ ತೆರೆಯಿರಿ' : 'Open Matadaan Mitra AI Chatbot'}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{isKn ? 'ಮಿತ್ರ ಸಹಾಯಕ (Gemini)' : 'Ask Mitra (Gemini)'}</span>
        </button>
      )}

      {/* Docked Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={isKn ? 'ಮತದಾನ ಮಿತ್ರ ಸಹಾಯಕ' : 'Matadaan Mitra Gemini Civic Assistant'}
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[82vh] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold leading-tight">
                {isKn ? 'ಮತದಾನ ಮಿತ್ರ ಸಹಾಯಕ' : 'Matadaan Mitra Assistant'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {offlineOnlyMode
                  ? isKn
                    ? 'ಆಫ್‌ಲೈನ್ FAQ ಮೋಡ್'
                    : 'Offline Rule-Based FAQ'
                  : isKn
                    ? 'Gemini 4 · ನಿಷ್ಪಕ್ಷಪಾತ ಮಾರ್ಗದರ್ಶಿ'
                    : 'Gemini Civic Guide · Non-partisan'}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setOfflineOnlyMode(!offlineOnlyMode)}
                className="px-2 py-1 text-[10px] font-semibold rounded border border-slate-600 text-slate-200 hover:bg-slate-800 cursor-pointer"
              >
                {offlineOnlyMode ? 'Use Gemini' : 'Offline FAQ'}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-blue-700 text-white'
                      : msg.isError
                        ? 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {isKn ? 'ಉತ್ತರ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Thinking...'}
              </div>
            )}
          </div>

          {/* Quick Suggested Prompts */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                type="button"
                onClick={() => sendMessage(qp)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isKn ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ...' : 'Ask about voting rules, forms, EVM...'}
              aria-label="Ask Matadaan Mitra"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
