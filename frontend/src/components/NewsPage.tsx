import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import type { NewsItem } from './News';
import { useData } from '../contexts/DataContext';

// Helper function to parse date string as local date (not UTC)
const parseLocalDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR');
};

interface NewsPageProps {
  onBack: () => void;
}

export function NewsPage({ onBack }: NewsPageProps) {
  const { news } = useData();

  // Sort state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Sort news by date
  const sortedNews = [...news].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </Button>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1>Todas as Notícias</h1>
            <Button
              onClick={toggleSortOrder}
              variant="outline"
              className="gap-2"
            >
              <ArrowUpDown size={16} />
              {sortOrder === 'desc' ? 'Mais recentes' : 'Mais antigas'}
            </Button>
          </div>
          <p className="text-xl text-gray-600">
            Fique por dentro de todas as novidades e conquistas do Projeto Semear Lages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNews.map((item) => (
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
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
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
    </div>
  );
}