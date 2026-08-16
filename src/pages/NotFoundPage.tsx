import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F9F7F2] flex items-center justify-center py-20 px-4">
      <Helmet>
        <title>Página Não Encontrada | Vital Hormonal</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 relative inline-block">
          <div className="text-[120px] sm:text-[150px] font-serif font-black text-[#E8F1EB] leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 sm:w-20 sm:h-20 text-[#26463E] opacity-80" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#26463E] mb-4">
          Ops! Não encontramos essa página.
        </h1>
        
        <p className="text-lg text-[#525753] mb-10 max-w-lg mx-auto">
          O conteúdo que você tentou acessar pode ter sido movido, excluído ou o endereço está incorreto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#26463E] text-white rounded-xl font-medium hover:bg-[#1D362F] transition-all shadow-sm"
          >
            <Home className="w-5 h-5" />
            Voltar para a Home
          </Link>
          
          <Link 
            to="/blog" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#26463E] border border-[#E3EBE6] rounded-xl font-medium hover:bg-[#F9F7F2] transition-all shadow-sm"
          >
            <BookOpen className="w-5 h-5" />
            Ler o Blog
          </Link>
        </div>
      </div>
    </main>
  );
};
