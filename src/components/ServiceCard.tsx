import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Fingerprint, Plane, CreditCard, Vote, Car, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
  };
  onApply: (serviceId: string) => void;
  onLearnMore: (serviceId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  fingerprint: Fingerprint,
  plane: Plane,
  'credit-card': CreditCard,
  vote: Vote,
  car: Car,
};

const ServiceCard = ({ service, onApply, onLearnMore }: ServiceCardProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const Icon = iconMap[service.icon] || Fingerprint;

  const handleApply = () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to access this service.',
        variant: 'destructive',
      });
      return;
    }
    onApply(service.id);
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/50 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 glow-effect">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">{service.name}</CardTitle>
        <CardDescription className="text-base">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-full hover:bg-primary/10"
            onClick={() => onLearnMore(service.id)}
          >
            {t('learn_more')}
          </Button>
          <Button
            className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={handleApply}
          >
            {t('apply_now')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;