import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useData } from '../contexts/DataContext';

// Helper function to parse date string as local date (not UTC)
const parseLocalDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR');
};

interface NewsProps {
  onViewAll: () => void;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export function News({ onViewAll }: NewsProps) {
  const { news } = useData();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Show only the first 3 news items
  const newsItems = news.slice(0, 3);

  return (
    <section id="noticias" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[#2d333b] font-bold">Notícias</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe as últimas novidades e conquistas do Projeto Semear Lages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar size={16} />
                  <span>{parseLocalDate(item.date)}</span>
                </div>
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onViewAll}
            variant="outline"
            className="border-[#2d333b] text-[#2d333b] hover:bg-[#2d333b] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            Ver Todas as Notícias
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl pr-8">{selectedNews?.title}</DialogTitle>
            <DialogDescription>
              {selectedNews?.excerpt}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar size={16} />
              <span>{selectedNews && parseLocalDate(selectedNews.date)}</span>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{selectedNews?.content}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}