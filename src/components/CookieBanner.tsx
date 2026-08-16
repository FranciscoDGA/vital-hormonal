import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vital_hormonal_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vital_hormonal_cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('vital_hormonal_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[#E3EBE6] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 sm:p-6 animate-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        
        <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="bg-[#E8F1EB] p-3 rounded-full hidden sm:block">
            <ShieldCheck className="w-6 h-6 text-[#26463E]" />
          </div>
          <div>
            <h4 className="text-[#26463E] font-bold text-sm sm:text-base">Sua privacidade é importante para nós</h4>
            <p className="text-[#525753] text-xs sm:text-sm mt-1">
              Utilizamos cookies para personalizar conteúdo, anúncios e melhorar sua experiência de navegação. 
              Ao continuar, você concorda com nossas <Link to="/legal" className="text-[#26463E] underline font-medium">Políticas de Privacidade</Link>.
            </p>
          </div>
        </div>

        <div className="flex w-full lg:w-auto items-center gap-3">
          <button 
            onClick={handleDecline}
            className="flex-1 lg:flex-none px-4 py-2.5 text-sm font-medium text-[#525753] bg-[#F9F7F2] hover:bg-[#E3EBE6] rounded-xl transition-colors"
          >
            Apenas Necessários
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 lg:flex-none px-6 py-2.5 text-sm font-medium text-white bg-[#26463E] hover:bg-[#1D362F] rounded-xl transition-colors shadow-sm"
          >
            Aceitar Todos
          </button>
          <button 
            onClick={handleDecline}
            className="p-2 text-[#7d837f] hover:text-[#26463E] hover:bg-[#E3EBE6] rounded-lg transition-colors hidden sm:block"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
