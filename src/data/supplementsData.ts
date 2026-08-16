export interface SupplementItem {
  id: string;
  name: string;
  category: 'magnesio' | 'fitoterapicos' | 'adaptogenos' | 'antioxidantes' | 'mucosas_saude_intima';
  categoryLabel: string;
  primaryBenefit: string;
  mechanism: string;
  suggestedDosage: string;
  bestTiming: 'Manhã (com desjejum)' | 'Tarde (entre refeições)' | 'Noite (30-60min antes de dormir)' | 'Com as refeições principais';
  timingExplanation: string;
  cautionsOrContraindications: string;
  targetSymptoms: string[];
  relatedArticleId?: string;
}

export const SUPPLEMENTS_DATA: SupplementItem[] = [
  {
    id: 'mag-treonato',
    name: 'Magnésio L-Treonato',
    category: 'magnesio',
    categoryLabel: 'Tipos de Magnésio',
    primaryBenefit: 'Foco no Cérebro, Sono Profundo & Névoa Mental',
    mechanism: 'Única forma de magnésio comprovada cientificamente capaz de cruzar eficientemente a barreira hematoencefálica, aumentando a densidade das sinapses no hipocampo.',
    suggestedDosage: '1.000mg a 2.000mg de Treonato (fornecendo ~140mg a 280mg de magnésio elementar)',
    bestTiming: 'Noite (30-60min antes de dormir)',
    timingExplanation: 'Estimula a transmissão gabaérgica e diminui a hiperexcitabilidade de receptores NMDA, promovendo a fase 3 do sono NREM.',
    cautionsOrContraindications: 'Geralmente muito bem tolerado; não tem efeito laxativo.',
    targetSymptoms: ['Esquecimento de palavras', 'Insônia noturna', 'Névoa mental', 'Ansiedade ao deitar'],
    relatedArticleId: 'art-22'
  },
  {
    id: 'mag-glicinato',
    name: 'Magnésio Bisglicinato (Quelato)',
    category: 'magnesio',
    categoryLabel: 'Tipos de Magnésio',
    primaryBenefit: 'Relaxamento Muscular, Alívio da Tensão & Cólicas',
    mechanism: 'Magnésio quelado a duas moléculas do aminoácido Glicina. A glicina atua como neurotransmissor inibitório suave na medula espinhal, soltando a musculatura estriada.',
    suggestedDosage: '200mg a 400mg de magnésio elementar ao dia',
    bestTiming: 'Noite (30-60min antes de dormir)',
    timingExplanation: 'Excelente absorção intestinal sem provocar cólicas ou diarreia osmótica.',
    cautionsOrContraindications: 'Seguro para uso diário contínuo.',
    targetSymptoms: ['Tensão nos ombros e mandíbula (bruxismo)', 'Câimbras nas pernas', 'Ansiedade pré-menstrual', 'Dores no corpo'],
    relatedArticleId: 'art-22'
  },
  {
    id: 'mag-dimalato',
    name: 'Magnésio Dimalato',
    category: 'magnesio',
    categoryLabel: 'Tipos de Magnésio',
    primaryBenefit: 'Energia Celular, Mitocôndrias & Dores da Fibromialgia',
    mechanism: 'Combinado ao ácido málico, um intermediário chave do Ciclo de Krebs que auxilia as mitocôndrias na produção de ATP (moeda de energia celular).',
    suggestedDosage: '250mg a 500mg ao dia',
    bestTiming: 'Manhã (com desjejum)',
    timingExplanation: 'Como atua na produção energética celular, deve ser tomado pela manhã para não atrapalhar o sono à noite.',
    cautionsOrContraindications: 'Evitar tomar após as 17h para pessoas muito sensíveis a estimulantes de ATP.',
    targetSymptoms: ['Fadiga crônica', 'Falta de disposição matinal', 'Fibromialgia e pontos de dor', 'Fraqueza muscular'],
    relatedArticleId: 'art-22'
  },
  {
    id: 'mag-taurato',
    name: 'Magnésio Taurato',
    category: 'magnesio',
    categoryLabel: 'Tipos de Magnésio',
    primaryBenefit: 'Coração Saudável, Palpitações & Pressão Arterial',
    mechanism: 'O magnésio associado à Taurina age diretamente nos canais de cálcio dos miócitos cardíacos, estabilizando as contrações elétricas e favorecendo o óxido nítrico endotelial.',
    suggestedDosage: '250mg a 400mg de taurato ao dia',
    bestTiming: 'Tarde (entre refeições)',
    timingExplanation: 'Ajuda a amortecer picos de adrenalina vespertinos e noturnos.',
    cautionsOrContraindications: 'Ideal para mulheres com taquicardia benigna da perimenopausa e pressão arterial instável.',
    targetSymptoms: ['Palpitações súbitas', 'Coração acelerado no repouso', 'Pressão arterial com picos', 'Estresse autonômico'],
    relatedArticleId: 'art-29'
  },
  {
    id: 'mag-citrato',
    name: 'Magnésio Citrato',
    category: 'magnesio',
    categoryLabel: 'Tipos de Magnésio',
    primaryBenefit: 'Intestino Preso & Prevenção de Cálculos Renais',
    mechanism: 'Possui maior capacidade osmótica suave, puxando água para a luz do cólon e estimulando o peristaltismo natural e a alcalinização urinária.',
    suggestedDosage: '200mg a 350mg à noite',
    bestTiming: 'Noite (30-60min antes de dormir)',
    timingExplanation: 'Promove a evacuação suave e completa na manhã seguinte.',
    cautionsOrContraindications: 'Doses excessivas podem amolecer demais as fezes. Reduzir a dose se houver fezes líquidas.',
    targetSymptoms: ['Constipação intestinal', 'Barriga estufada', 'Digestão lenta', 'Histórico de cálculo renal de oxalato'],
    relatedArticleId: 'art-27'
  },
  {
    id: 'mio-inositol',
    name: 'Mio-Inositol',
    category: 'fitoterapicos',
    categoryLabel: 'Metabolismo & Eixo Ovariano',
    primaryBenefit: 'Sensibilidade à Insulina, Controle de Doces & Sono',
    mechanism: 'Segundo mensageiro intracelular fundamental para a cascata de sinalização da insulina e dos receptores de serotonina e FSH nos ovários.',
    suggestedDosage: '2.000mg a 4.000mg (em pó diluído em água) ao dia',
    bestTiming: 'Noite (30-60min antes de dormir)',
    timingExplanation: 'Evita a hipoglicemia reativa da madrugada e promove sono restaurador com calma mental.',
    cautionsOrContraindications: 'Extremamente seguro; pode ser combinado com magnésio.',
    targetSymptoms: ['Compulsão por doces', 'Gordura abdominal', 'Despertar às 3h com suor frio', 'Resistência insulínica'],
    relatedArticleId: 'art-22'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha KSM-66 (*Withania somnifera*)',
    category: 'adaptogenos',
    categoryLabel: 'Adaptógenos & Cortisol',
    primaryBenefit: 'Modulação do Cortisol, Estresse Crônico & Disposição',
    mechanism: 'Compostos withanolídeos padronizados que modulam o eixo HPA (hipotálamo-hipófise-adrenal), reduzindo picos descontrolados de cortisol.',
    suggestedDosage: '300mg a 600mg de extrato padronizado KSM-66 ao dia',
    bestTiming: 'Manhã (com desjejum)',
    timingExplanation: 'Ajuda na resposta ao estresse durante a jornada de trabalho diária.',
    cautionsOrContraindications: 'Evitar em mulheres com hipertireoidismo autoimune não controlado (Graves).',
    targetSymptoms: ['Sensação de estar "ligada no 220v" mas exausta', 'Irritabilidade', 'Ansiedade diurna', 'Cansaço adrenal'],
    relatedArticleId: 'art-13'
  },
  {
    id: 'vitex',
    name: 'Vitex Agnus-Castus (Tintura ou Extrato Seco)',
    category: 'fitoterapicos',
    categoryLabel: 'Regulação do Ciclo & Progesterona',
    primaryBenefit: 'Alívio da Mastalgia, TPM e Ciclos Curtos',
    mechanism: 'Estimula receptores dopaminérgicos D2 na hipófise anterior, reduzindo a prolactina e favorecendo a fase lútea equilibrada.',
    suggestedDosage: '20mg a 40mg de extrato padronizado ou 300mg a 400mg do pó da fruta seca',
    bestTiming: 'Manhã (com desjejum)',
    timingExplanation: 'Melhor absorvido em jejum matinal ou com o café da manhã.',
    cautionsOrContraindications: 'Não deve ser associado com pílulas anticoncepcionais combinadas sem supervisão médica.',
    targetSymptoms: ['Dor e inchaço nas mamas (mastalgia)', 'Ciclos menstruais encurtando', 'TPM com choro fácil', 'Enxaqueca pré-menstrual'],
    relatedArticleId: 'art-2'
  },
  {
    id: 'omega-7',
    name: 'Ômega 7 (Óleo de Espinheiro Marítimo - Sea Buckthorn)',
    category: 'mucosas_saude_intima',
    categoryLabel: 'Mucosas & Lubrificação',
    primaryBenefit: 'Olho Seco, Boca Seca e Hidratação Urogenital',
    mechanism: 'Riquíssimo em ácido palmitoleico, um ácido graxo essencial estrutural das membranas epiteliais das glândulas de Meibômio e salivares.',
    suggestedDosage: '500mg a 1.000mg de óleo puro padronizado',
    bestTiming: 'Com as refeições principais',
    timingExplanation: 'Sendo uma gordura lipossolúvel, absorve melhor na presença de gorduras da refeição.',
    cautionsOrContraindications: 'Excelente perfil de segurança, sem efeitos hormonais diretos.',
    targetSymptoms: ['Olho seco que arde no computador', 'Boca seca ao acordar', 'Ressecamento íntimo', 'Pele sem viço'],
    relatedArticleId: 'art-30'
  },
  {
    id: 'd-manose',
    name: 'D-Manose com Cranberry Padronizado (PACs)',
    category: 'mucosas_saude_intima',
    categoryLabel: 'Saúde Urinária & Bexiga',
    primaryBenefit: 'Prevenção Natural de Infecção Urinária (Cistite)',
    mechanism: 'Açúcar simples natural que se liga às fímbrias do tipo 1 da bactéria *E. coli*, impedindo sua fixação na parede da bexiga e permitindo sua eliminação na urina.',
    suggestedDosage: '1.500mg a 2.000mg ao dia em pó dissolvido em copo de água',
    bestTiming: 'Noite (30-60min antes de dormir)',
    timingExplanation: 'Permanece na bexiga durante as horas de repouso noturno, potencializando a limpeza da mucosa.',
    cautionsOrContraindications: 'Não é absorvido como açúcar pelo metabolismo glicêmico; seguro para diabéticas.',
    targetSymptoms: ['Cistite de repetição', 'Ardência ao urinar após relação', 'Urgência miccional', 'Desconforto na uretra'],
    relatedArticleId: 'art-34'
  },
  {
    id: 'coq10-ubiquinol',
    name: 'Coenzima Q10 (Ubiquinol ou Ubiquinona Microencapsulada)',
    category: 'antioxidantes',
    categoryLabel: 'Mitocôndrias & Longevidade',
    primaryBenefit: 'Energia Cardiovascular, Proteção Ovariana & Enxaqueca',
    mechanism: 'Transportador vital de elétrons na cadeia respiratória mitocondrial; potente antioxidante lipofílico que neutraliza radicais livres.',
    suggestedDosage: '100mg a 200mg ao dia',
    bestTiming: 'Manhã (com desjejum)',
    timingExplanation: 'Tomar sempre junto com uma refeição contendo gordura (ex: ovos, azeite, abacate) para absorção 3x superior.',
    cautionsOrContraindications: 'Indispensável para quem usa medicamentos da classe das estatinas.',
    targetSymptoms: ['Cansaço no meio da tarde', 'Enxaquecas frequentes', 'Dores musculares por estatina', 'Prevenção cardiovascular'],
    relatedArticleId: 'art-26'
  },
  {
    id: 'saw-palmetto',
    name: 'Saw Palmetto (*Serenoa repens*)',
    category: 'fitoterapicos',
    categoryLabel: 'Saúde Capilar & Androgênios',
    primaryBenefit: 'Bloqueio Natural de DHT e Queda de Cabelo na Coroa',
    mechanism: 'Inibe a enzima 5-alfa-redutase, diminuindo a conversão de testosterona em di-hidrotestosterona (DHT) que miniaturiza os folículos capilares.',
    suggestedDosage: '160mg a 320mg de extrato lipídico padronizado (85-95% de ácidos graxos)',
    bestTiming: 'Com as refeições principais',
    timingExplanation: 'Melhor absorvido com o almoço.',
    cautionsOrContraindications: 'Não usar durante a gestação ou lactação.',
    targetSymptoms: ['Afinamento da risca do cabelo', 'Queda de cabelo no topo da cabeça', 'Oleosidade excessiva no couro cabeludo'],
    relatedArticleId: 'art-28'
  }
];
