import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { News } from './components/News';
import { Donate } from './components/Donate';
import { Contact } from './components/Contact';
import { NewsPage } from './components/NewsPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { Favicon } from './components/Favicon';
import { DataProvider } from './contexts/DataContext';
import React from 'react';

type Page = 'home' | 'news' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === 'news') {
      setCurrentPage('news');
    } else if (page === 'admin-login') {
      setCurrentPage('admin-login');
    } else if (page === 'home') {
      setCurrentPage('home');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  return (
    <DataProvider>
      {/* Admin Dashboard */}
      {currentPage === 'admin-dashboard' && isAuthenticated ? (
        <>
          <Favicon />
          <AdminDashboard 
            onBack={() => setCurrentPage('home')}
            onLogout={handleLogout}
          />
          <Toaster />
        </>
      ) : null}

      {/* Admin Login */}
      {currentPage === 'admin-login' ? (
        <>
          <Favicon />
          <AdminLogin 
            onBack={() => setCurrentPage('home')}
            onLogin={handleLogin}
          />
          <Toaster />
        </>
      ) : null}

      {/* News Page */}
      {currentPage === 'news' ? (
        <div className="min-h-screen flex flex-col">
          <Favicon />
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <NewsPage onBack={() => setCurrentPage('home')} />
          <Footer onNavigate={handleNavigate} />
          <Toaster />
        </div>
      ) : null}

      {/* Home Page */}
      {currentPage === 'home' ? (
        <div className="min-h-screen flex flex-col">
          <Favicon />
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Projects />
            <News onViewAll={() => setCurrentPage('news')} />
            <Donate />
            <Contact />
          </main>
          <Footer onNavigate={handleNavigate} />
          <Toaster />
        </div>
      ) : null}
    </DataProvider>
  );
}