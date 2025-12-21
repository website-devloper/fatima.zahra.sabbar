'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'fr';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

type MessageValue = string | { [key: string]: MessageValue };

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [messages, setMessages] = useState<Record<string, MessageValue>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load saved locale from localStorage only on client side
        const saved = localStorage.getItem('preferredLocale') as Locale;
        if (saved && (saved === 'en' || saved === 'fr')) {
            setLocaleState(saved);
        }
    }, []);

    useEffect(() => {
        // Load messages for current locale
        import(`../../messages/${locale}.json`).then((module) => {
            setMessages(module.default);
        });
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        if (mounted) {
            localStorage.setItem('preferredLocale', newLocale);
        }
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: MessageValue | undefined = messages;

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
}
