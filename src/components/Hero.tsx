import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Search } from 'lucide-react';

const Hero = ({ onChatClick }: { onChatClick: () => void }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all glow-effect"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="mr-2 h-5 w-5" />
              {t('explore_services')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
              onClick={onChatClick}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('talk_to_ai')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;