import React from 'react';

interface AdSlotProps {
  position?: 'sidebar' | 'content' | 'footer' | 'header';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position = 'content', className = '' }) => {
  // Configurações de altura e largura recomendadas pelo AdSense para blocos responsivos
  const getPositionStyles = () => {
    switch (position) {
      case 'sidebar':
        return 'w-full h-[600px] max-w-[300px]';
      case 'header':
        return 'w-full h-[90px] max-w-[728px] mx-auto';
      case 'footer':
        return 'w-full h-[250px] max-w-[970px] mx-auto';
      case 'content':
      default:
        return 'w-full h-[250px] sm:h-[280px] max-w-[800px] mx-auto';
    }
  };

  return (
    <div className={`my-8 flex justify-center w-full ${className}`}>
      {/* 
        Abaixo ficará o código real do Google AdSense futuramente:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
      
      {/* Placeholder Visual (Apenas para ver como o layout se comporta antes da aprovação) */}
      <div 
        className={`bg-[#E3EBE6] border border-[#d1ded6] rounded-xl flex items-center justify-center relative overflow-hidden group ${getPositionStyles()}`}
        aria-hidden="true"
      >
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#F9F7F2]/80 backdrop-blur-sm rounded text-[10px] text-[#7d837f] uppercase tracking-wider font-medium">
          Publicidade
        </div>
        <div className="text-center">
          <p className="text-[#26463E]/40 font-serif font-medium text-lg mb-1 group-hover:text-[#26463E]/60 transition-colors">
            Espaço Reservado
          </p>
          <p className="text-[#525753]/50 text-xs px-4">
            Google AdSense Placeholder
          </p>
        </div>
      </div>
    </div>
  );
};
