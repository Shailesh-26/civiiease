import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import AuthDialog from '@/components/AuthDialog';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

const Index = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase.from('services').select('*');
    if (data) {
      setServices(data);
      setFilteredServices(data);
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen">
            <Navbar onAuthClick={() => setAuthOpen(true)} />
            <Hero onChatClick={() => {}} />
            
            <section id="services" className="py-20 px-4">
              <div className="container mx-auto">
                <SearchBar onSearch={setFilteredServices} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onApply={() => {}}
                      onLearnMore={() => {}}
                    />
                  ))}
                </div>
              </div>
            </section>

            <Footer onAuthClick={() => setAuthOpen(true)} />
            <ChatBot />
            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
