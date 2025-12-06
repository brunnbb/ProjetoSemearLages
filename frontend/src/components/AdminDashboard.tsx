import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ArrowLeft, Plus, Trash2, Edit, CalendarIcon, ArrowUpDown, X } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { NewsItem } from './News';
import { useData } from '../contexts/DataContext';
import { api, ApiError } from '../services/api';

// Helper function to parse date string as local date (not UTC)
const parseLocalDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR');
};

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const { news, setNews, refreshNews } = useData();

  // News form state
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: new Date(),
  });

  // Edit mode state
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Sort state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Load news from API on mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
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
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        onLogout();
      } else {
        toast.error('Erro ao carregar notícias');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Sort news by date
  const sortedNews = [...news].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleAddNews = async () => {
    if (!newsForm.title || !newsForm.excerpt || !newsForm.content) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsLoading(true);
      // Format date as YYYY-MM-DD - this is the correct format expected by the API
      // Don't modify the date value, just format it correctly
      const dateString = format(newsForm.date, 'yyyy-MM-dd');
      
      // Send raw values - let the API service handle cleaning/validation
      const newNews = await api.createNews({
        title: newsForm.title,
        excerpt: newsForm.excerpt,
        content: newsForm.content,
        date: dateString,
      });

      // Convert API response to NewsItem format
      const formattedNews: NewsItem = {
        id: newNews.id.toString(),
        title: newNews.title,
        excerpt: newNews.excerpt,
        content: newNews.content,
        date: newNews.date,
      };

      // Reload news from API to ensure consistency
      await refreshNews();
      setNewsForm({ title: '', excerpt: '', content: '', date: new Date() });
      toast.success('Notícia adicionada com sucesso!');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao adicionar notícia');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    // Parse the date string correctly to avoid timezone issues
    const [year, month, day] = item.date.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    setNewsForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: localDate,
    });
  };

  const handleUpdateNews = async () => {
    if (!editingNews) return;
    
    if (!newsForm.title || !newsForm.excerpt || !newsForm.content) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsLoading(true);
      const newsId = parseInt(editingNews.id);
      if (isNaN(newsId)) {
        toast.error('ID de notícia inválido');
        return;
      }

      // Format date as YYYY-MM-DD - correct format for API
      const dateString = format(newsForm.date, 'yyyy-MM-dd');
      
      // Send raw values - let the API service handle cleaning/validation
      const updatedNews = await api.updateNews(newsId, {
        title: newsForm.title,
        excerpt: newsForm.excerpt,
        content: newsForm.content,
        date: dateString,
      });

      // Convert API response to NewsItem format
      const formattedNews: NewsItem = {
        id: updatedNews.id.toString(),
        title: updatedNews.title,
        excerpt: updatedNews.excerpt,
        content: updatedNews.content,
        date: updatedNews.date,
      };

      // Reload news from API to ensure consistency
      await refreshNews();
      setNewsForm({ title: '', excerpt: '', content: '', date: new Date() });
      setEditingNews(null);
      toast.success('Notícia atualizada com sucesso!');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao atualizar notícia');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
    setNewsForm({ title: '', excerpt: '', content: '', date: new Date() });
  };

  const handleDeleteNews = async (id: string) => {
    try {
      setIsLoading(true);
      const newsId = parseInt(id);
      if (isNaN(newsId)) {
        toast.error('ID de notícia inválido');
        return;
      }

      await api.deleteNews(newsId);
      // Reload news from API to ensure consistency
      await refreshNews();
      if (editingNews && editingNews.id === id) {
        handleCancelEdit();
      }
      toast.success('Notícia removida com sucesso!');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao remover notícia');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Error during logout:', error);
    }
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2d333b] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="ghost"
              className="text-white hover:text-gray-300"
            >
              <ArrowLeft className="mr-2" size={20} />
              Voltar ao site
            </Button>
            <h1 className="text-xl">Painel Administrativo</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:text-gray-300"
          >
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#2d333b]">Gerenciar Notícias</h2>
          <p className="text-gray-600 mt-1">Adicione, edite ou remova notícias do site</p>
        </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
          {/* Add News Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                {editingNews ? 'Editar Notícia' : 'Adicionar Nova Notícia'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="news-title">Título *</Label>
                <Input
                  id="news-title"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Título da notícia"
                />
              </div>
              <div>
                <Label htmlFor="news-excerpt">Resumo *</Label>
                <Textarea
                  id="news-excerpt"
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  placeholder="Breve resumo da notícia"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="news-content">Conteúdo Completo *</Label>
                <Textarea
                  id="news-content"
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Conteúdo completo da notícia"
                  rows={5}
                />
              </div>
              <div>
                <Label>Data da Notícia *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newsForm.date ? format(newsForm.date, "PPP", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newsForm.date}
                      onSelect={(date) => date && setNewsForm({ ...newsForm, date })}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button 
                onClick={editingNews ? handleUpdateNews : handleAddNews}
                disabled={isLoading}
                className="w-full bg-[#2d333b] hover:bg-[#1f2328] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {isLoading ? (
                  'Processando...'
                ) : editingNews ? (
                  <>
                    <Edit className="mr-2" size={16} />
                    Atualizar Notícia
                  </>
                ) : (
                  <>
                    <Plus className="mr-2" size={16} />
                    Adicionar Notícia
                  </>
                )}
              </Button>
              {editingNews && (
                <Button 
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <X className="mr-2" size={16} />
                  Cancelar Edição
                </Button>
              )}
            </CardContent>
          </Card>

          {/* News List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notícias Cadastradas</CardTitle>
                <Button
                  onClick={toggleSortOrder}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowUpDown size={16} />
                  {sortOrder === 'desc' ? 'Mais recentes' : 'Mais antigas'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {sortedNews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma notícia cadastrada
                  </p>
                ) : (
                  sortedNews.map((item) => (
                    <div 
                      key={item.id} 
                      className={`border rounded-lg p-4 ${editingNews?.id === item.id ? 'border-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                          <p className="text-xs text-gray-500">
                            {parseLocalDate(item.date)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditNews(item)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteNews(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}