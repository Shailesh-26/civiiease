import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'bn', name: 'বাংলা' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out successfully',
      description: 'See you next time!',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CivicEase
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              {t('home')}
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              {t('services')}
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              {t('about')}
            </a>
            <a href="#help" className="text-foreground hover:text-primary transition-colors">
              {t('help')}
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? 'bg-primary/10' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="rounded-full">
                Sign Out
              </Button>
            ) : (
              <>
                <Button onClick={onAuthClick} variant="outline" className="rounded-full">
                  {t('signIn')}
                </Button>
                <Button onClick={onAuthClick} className="rounded-full bg-gradient-to-r from-primary to-secondary">
                  {t('signUp')}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a href="#home" className="block text-foreground hover:text-primary">
              {t('home')}
            </a>
            <a href="#services" className="block text-foreground hover:text-primary">
              {t('services')}
            </a>
            <a href="#about" className="block text-foreground hover:text-primary">
              {t('about')}
            </a>
            <a href="#help" className="block text-foreground hover:text-primary">
              {t('help')}
            </a>
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={language === lang.code ? 'bg-primary/10' : ''}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="w-full rounded-full">
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button onClick={onAuthClick} variant="outline" className="w-full rounded-full">
                  {t('signIn')}
                </Button>
                <Button onClick={onAuthClick} className="w-full rounded-full bg-gradient-to-r from-primary to-secondary">
                  {t('signUp')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;