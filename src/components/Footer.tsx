import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card/50 backdrop-blur-lg border-t mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('footer_cta_title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('footer_cta_subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onAuthClick}
              className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-effect"
            >
              {t('create_account')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('learn_more')}
            </Button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;