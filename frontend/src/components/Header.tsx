import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from 'figma:asset/icon.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'noticias', label: 'Notícias' },
    { id: 'doar', label: 'Doar' },
    { id: 'contatos', label: 'Contatos' },
  ];

  const handleNavClick = (id: string) => {
    if (currentPage === 'home') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-background text-[#2d333b] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="Projeto Semear Lages" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <span className="text-xl font-semibold">Projeto Semear Lages</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto">
            {navItems.map((item) => {
              const colorClasses = {
                sobre: 'text-[#e74c3c] hover:text-[#d43f2f]',
                projetos: 'text-[#4a90e2] hover:text-[#3a7bc8]',
                noticias: 'text-[#2d333b] hover:text-[#1d232b]',
                doar: 'text-[#7cb342] hover:text-[#6ca332]',
                contatos: 'text-[#ffd740] hover:text-[#ffc930]',
              };
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-semibold transition-all duration-300 hover:scale-110 ${colorClasses[item.id as keyof typeof colorClasses] || 'hover:text-gray-600'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => {
              const colorClasses = {
                sobre: 'text-[#e74c3c] hover:text-[#d43f2f]',
                projetos: 'text-[#4a90e2] hover:text-[#3a7bc8]',
                noticias: 'text-[#2d333b] hover:text-[#1d232b]',
                doar: 'text-[#7cb342] hover:text-[#6ca332]',
                contatos: 'text-[#ffd740] hover:text-[#ffc930]',
              };
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-semibold block w-full text-left py-2 transition-colors ${colorClasses[item.id as keyof typeof colorClasses] || 'hover:text-gray-600'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}