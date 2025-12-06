import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { NewsItem } from '../components/News';
import type { ContactInfo } from '../components/Contact';
import { api } from '../services/api';
import React from 'react';

interface DataContextType {
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  refreshNews: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'projetosemearlages@gmail.com',
    phone: '(49) 99138-1480',
  });

  const loadNews = async () => {
    try {
      const apiNews = await api.getNews();
      // Convert API response to NewsItem format
      const formattedNews: NewsItem[] = apiNews.map((item) => ({
        id: item.id.toString(),
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        date: item.date,
      }));
      setNews(formattedNews);
    } catch (error) {
      console.error('Error loading news:', error);
      // Keep empty array on error - don't show mock data
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <DataContext.Provider 
      value={{ 
        news, 
        setNews, 
        contactInfo, 
        setContactInfo,
        refreshNews: loadNews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
