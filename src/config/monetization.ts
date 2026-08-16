/**
 * Configuração de Monetização do Portal Vital Hormonal
 * 
 * Este arquivo centraliza todas as configurações de monetização, permitindo que você ative
 * o Google AdSense, configure blocos de anúncios ou insira links de afiliados no futuro
 * apenas alterando as variáveis abaixo, sem precisar mexer no código do site!
 */

export interface MonetizationConfig {
  // Google AdSense
  googleAdsense: {
    enabled: boolean;
    publisherId: string; // Exemplo: 'ca-pub-1234567890123456'
    slots: {
      inArticleTop: string; // Slot ID
      inArticleMiddle: string; // Slot ID
      inArticleBottom: string; // Slot ID
      toolsFooter: string; // Slot ID
    };
  };

  // Banners Nativos Internos (Usados quando o AdSense está desativado ou para campanhas próprias)
  internalPromotions: {
    enabled: boolean;
    defaultCtaType: 'materials' | 'quiz' | 'protein' | 'exams' | 'checklist' | 'supplement';
  };

  // Links de Afiliados Pré-configurados (Amazon, Farmácias, Suplementos)
  affiliates: {
    enabled: boolean;
    amazonTag?: string; // Ex: 'vitalhormonal-20'
    disclaimerText: string;
  };
}

export const MONETIZATION_CONFIG: MonetizationConfig = {
  // AdSense inicia desativado até você colar seu ca-pub oficial
  googleAdsense: {
    enabled: false,
    publisherId: '', // Cole seu 'ca-pub-XXXXXXXXXXXXXXXX' aqui quando for aprovado
    slots: {
      inArticleTop: '1234567890',
      inArticleMiddle: '2345678901',
      inArticleBottom: '3456789012',
      toolsFooter: '4567890123',
    }
  },

  internalPromotions: {
    enabled: true,
    defaultCtaType: 'materials'
  },

  affiliates: {
    enabled: false, // Ative como true quando cadastrar suas contas de afiliado
    amazonTag: '',
    disclaimerText: 'Transparência Editorial: O Vital Hormonal pode receber comissões por compras qualificadas através de links recomendados, sem nenhum custo adicional para você.'
  }
};
