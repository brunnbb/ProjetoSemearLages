import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '../services/api';

interface AdminLoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export function AdminLogin({ onBack, onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't format/trim email or password here - let the API service handle it
    // This ensures we don't accidentally modify the data incorrectly
    if (!email || !password) {
      toast.error('E-mail e senha são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      await api.login(email, password);
      toast.success('Login realizado com sucesso!');
      onLogin();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-[#2d333b] rounded-full flex items-center justify-center">
                <Lock className="text-white" size={32} />
              </div>
            </div>
            <CardTitle className="text-center">Área Administrativa</CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Acesso restrito para administradores
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2d333b] hover:bg-[#1f2328] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                Demo: admin@projetosemear.org.br / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}