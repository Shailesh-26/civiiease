import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, RefreshCw, CreditCard, Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const QuickActions = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (!user) {
      toast({
        title: t('auth_required'),
        description: t('please_sign_in'),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t('action_initiated'),
      description: `${action} ${t('process_started')}`,
    });
  };

  const quickActions = [
    {
      icon: FileText,
      title: t('apply_passport'),
      action: () => handleAction(t('apply_passport')),
      gradient: 'from-primary to-primary-glow',
    },
    {
      icon: RefreshCw,
      title: t('update_aadhaar'),
      action: () => handleAction(t('update_aadhaar')),
      gradient: 'from-secondary to-secondary-glow',
    },
    {
      icon: CreditCard,
      title: t('pan_status'),
      action: () => handleAction(t('pan_status')),
      gradient: 'from-accent to-primary',
    },
    {
      icon: Car,
      title: t('dl_renewal'),
      action: () => handleAction(t('dl_renewal')),
      gradient: 'from-primary to-secondary',
    },
  ];

  return (
    <div className="mb-16 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
            onClick={action.action}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center glow-effect`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {action.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
