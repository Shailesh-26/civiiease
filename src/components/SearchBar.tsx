import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface SearchBarProps {
  onSearch: (results: any[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*');
    
    if (data) {
      setServices(data);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      onSearch(filtered);
    } else {
      onSearch(services);
    }
  }, [searchQuery, services]);

  return (
    <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-6 text-lg rounded-full glass-card border-2 focus:border-primary transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBar;