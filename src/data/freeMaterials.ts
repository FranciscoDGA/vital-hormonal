export interface FreeMaterial {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  readTime: string;
  pagesCount: string;
  downloadFilename: string;
  description: string;
  keyBenefits: string[];
  sections: {
    title: string;
    description: string;
    items?: {
      name: string;
      tag?: string;
      details: string;
      actionTip?: string;
    }[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    checklists?: {
      title: string;
      items: string[];
    }[];
    notes?: string[];
  }[];
}

export const FREE_MATERIALS_DATA: FreeMaterial[] = [
  {
    id: 'mat-7-sinais-perimenopausa',
    title: 'Guia Clínico dos 7 Sinais da Perimenopausa (35 a 52 anos)',
    subtitle: 'Checklist de Auto-Observação, Roteiro de Exames Laboratoriais e Estratégia dos 4 Pilares Funcionais',
    category: 'Manual Clínico & Checklist',
    badge: 'Mais Baixado',
    readTime: '8 min de leitura',
    pagesCount: '6 páginas de conteúdo prático',
    downloadFilename: 'vital_hormonal_guia_7_sinais_perimenopausa.pdf',
    description: 'Um dossiê completo para identificar se a insônia das 3h, o cansaço à tarde e as alterações de humor são causados pela queda precoce da progesterona — e como se preparar com os exames certos para sua próxima consulta médica.',
    keyBenefits: [
      'Identificação precisa dos 7 sintomas silenciosos pós-35 anos',
      'Lista dos 6 exames essenciais e a janela certa do ciclo (21º dia)',
      'Checklist de 14 dias para monitorar intensidade e frequência',
      'Roteiro de 5 perguntas estratégicas para fazer ao seu médico'
    ],
    sections: [
      {
        title: '1. A Anatomia dos 7 Sinais Silenciosos',
        description: 'A partir dos 35-38 anos, os ciclos ovulatórios começam a falhar de forma discreta. A progesterona é o primeiro hormônio a declinar (até 75%), enquanto o estrogênio oscila como uma montanha-russa antes de cair. Isso desencadeia sintomas específicos:',
        items: [
          {
            name: 'Sinal 1: O Despertar Noturno Entre 2h e 4h da Madrugada',
            tag: 'Declínio de Progesterona / Pico de Cortisol',
            details: 'A progesterona se converte em alopregnanolona no cérebro, ativando os receptores calmantes GABA. Sem ela, o sono REM fica fragmentado e o cortisol noturno desperta você com mente acelerada e sensação de alerta.',
            actionTip: 'Evite luzes fortes após as 21h e considere magnésio bisglicinato (300mg) associado à taurina no jantar.'
          },
          {
            name: 'Sinal 2: Névoa Mental & Lapso de Memória de Curto Prazo',
            tag: 'Oscilação do Estradiol no Hipocampo',
            details: 'Os receptores estrogênicos alimentam a captação de glicose nos neurônios do córtex pré-frontal. Na oscilação estrogênica, o cérebro consome até 20% menos energia, gerando lentidão de raciocínio temporária.',
            actionTip: 'Proteína de alto valor biológico pela manhã (25g a 30g) e creatina monohidratada (3g a 5g) para suporte energético neuronal.'
          },
          {
            name: 'Sinal 3: Irritabilidade Súbita e Perca de Paciência com Pequenezas',
            tag: 'Desbalanço GABA / Serotonina',
            details: 'Não é "falta de paciência" psicológica: a queda dos esteroides neuroativos reduz a sensibilidade aos neurotransmissores da serenidade, tornando o sistema nervoso hiper-reativo a estímulos rotineiros.',
            actionTip: 'Prática de respiração com expiração prolongada (4s inspira, 7s segura, 8s expira) para estimular o nervo vago.'
          },
          {
            name: 'Sinal 4: Acúmulo de Gordura Abdominal Mesmo Sem Mudar a Dieta',
            tag: 'Resistência Periférica à Insulina & Cortisol',
            details: 'Com menos estrogênio protetor, o corpo redistribui os adipócitos para a região visceral (cintura). Cortisol elevado crônico amplifica a retenção de gordura ao redor dos órgãos.',
            actionTip: 'Treino resistido (musculação com carga progressiva) 3x por semana para restaurar receptores GLUT-4 nos músculos.'
          },
          {
            name: 'Sinal 5: Inchaço Acentuado e Retenção Hídrica Pré-Menstrual',
            tag: 'Dominância Estrogênica Relativa',
            details: 'Quando há estrogênio sem progesterona suficiente para contrapor, ocorre ativação excessiva da aldosterona, retendo sódio e água nos tecidos moles e mamas.',
            actionTip: 'Aumente alimentos ricos em potássio (abacate, espinafre) e chá de cavalinha ou dente-de-leão na 2ª fase do ciclo.'
          },
          {
            name: 'Sinal 6: Enxaquecas Pré-Menstruais e Tensão Cervical',
            tag: 'Queda Brusca do Estradiol',
            details: 'A flutuação vascular cerebral decorrente da queda rápida de estradiol desencadeia vasodilatação inflamatória nas meninges.',
            actionTip: 'Magnésio Treonato (para barreira hematoencefálica) e Coenzima Q10 (100mg) como profilaxia funcional.'
          },
          {
            name: 'Sinal 7: Queda de Energia e Moleza às 15h-17h',
            tag: 'Curva Invertida de Cortisol & Fadiga Mitocondrial',
            details: 'A adrenal sobrecarregada gasta suas reservas de pregnenolona para produzir cortisol, deixando a produção hormonal deficitária e derrubando o metabolismo à tarde.',
            actionTip: 'Lanche proteico com gorduras boas (oleaginosas) às 15h30 e banho de sol de 10 min para ancorar o ritmo biológico.'
          }
        ]
      },
      {
        title: '2. Roteiro dos 6 Exames Laboratoriais Funcionais',
        description: 'Exames isolados sem correlação com a fase do ciclo frequentemente voltam com laudo "dentro da normalidade" mesmo com sintomas severos. Leve esta lista para conversar com seu médico:',
        table: {
          headers: ['Exame Solicitado', 'Momento Ideal de Coleta', 'Alvo Funcional Otimizado (Não apenas referência)'],
          rows: [
            ['Progesterona Sérica', '21º dia do ciclo (ou 7 dias pós-ovulação)', '> 10 a 15 ng/mL na fase lútea (valores < 5 indicam anovulação)'],
            ['Estradiol (E2)', '3º ao 5º dia do ciclo (fase folicular)', '30 a 70 pg/mL (evitar picos acima de 300 sem progesterona)'],
            ['FSH e LH', '3º ao 5º dia do ciclo', 'FSH < 10 mUI/mL em idade fértil (acima de 25 indica declínio ovariano)'],
            ['TSH e T4 Livre', 'Manhã em jejum', 'TSH entre 1.0 e 2.0 mUI/L | T4L entre 1.1 e 1.4 ng/dL'],
            ['Insulina de Jejum + Glicemia', 'Manhã em jejum (mínimo 10h)', 'Insulina ideal abaixo de 6 a 8 µUI/mL (HOMA-IR < 1.5)'],
            ['Ferritina Sérica', 'Manhã em jejum (sem infecção ativa)', 'Ideal entre 70 e 100 ng/mL para saúde tireoidiana e capilar']
          ]
        }
      },
      {
        title: '3. Checklist Prático de Auto-Observação (14 Dias)',
        description: 'Imprima esta página e marque diariamente por duas semanas para mapear os padrões e levar à consulta:',
        checklists: [
          {
            title: 'Sinais da Noite & Manhã',
            items: [
              'Acordou entre 2h e 4h da madrugada sem motivo?',
              'Sensação de sono não-reparador ao levantar da cama?',
              'Suores noturnos leves ou sensação de calor nos pés/pescoço?',
              'Palpitações leves ao deitar no travesseiro?'
            ]
          },
          {
            title: 'Sinais de Cognição & Humor',
            items: [
              'Dificuldade de encontrar palavras ou nomes familiares durante conversas?',
              'Sensação de irritabilidade desproporcional com familiares ou colegas?',
              'Ansiedade matinal sem motivo factual concreto?',
              'Falta de motivação para tarefas que antes eram prazerosas?'
            ]
          },
          {
            title: 'Sinais Metabólicos & Físicos',
            items: [
              'Inchaço abdominal visível no final do dia?',
              'Desejo incontrolável por carboidratos refinados ou doces após as 16h?',
              'Dores articulares nas mãos, joelhos ou pés ao acordar?',
              'Ciclo menstrual adiantou ou atrasou mais de 4 dias no último mês?'
            ]
          }
        ]
      },
      {
        title: '4. Perguntas Estratégicas para Fazer ao Seu Médico',
        description: 'Perguntas formuladas para estabelecer um diálogo colaborativo e respeitoso na consulta:',
        items: [
          {
            name: '1. "Meus sintomas atuais podem estar associados a uma insuficiência lútea ou declínio inicial de progesterona?"',
            details: 'Isso direciona o raciocínio para além da menopausa tardia, focando na fase de transição (perimenopausa).'
          },
          {
            name: '2. "Podemos avaliar minha insulina de jejum e ferritina além do hemograma básico?"',
            details: 'Garante a investigação de resistência insulínica subclínica e anemia funcional que imitam fadiga hormonal.'
          },
          {
            name: '3. "Qual a sua opinião sobre o uso de progesterona bioidêntica/micronizada na fase lútea para proteção do sono e humor?"',
            details: 'Abre espaço para discutir terapias hormonais modernas regulamentadas.'
          }
        ]
      }
    ]
  },
  {
    id: 'mat-tabela-magnesios-fitoquimicos',
    title: 'Guia Definitivo dos Tipos de Magnésio & Fitoquímicos 35+',
    subtitle: 'Qual Forma Usar para Sono, Ansiedade, Memória e Dores Musculares',
    category: 'Tabela Prática de Suplementação',
    badge: 'Protocolo Nutricional',
    readTime: '6 min de leitura',
    pagesCount: '4 páginas estruturadas',
    downloadFilename: 'vital_hormonal_tabela_magnesios_fitoquimicos.pdf',
    description: 'Aprenda a escolher a molécula certa de magnésio para o seu sintoma predominante, evitando gastar dinheiro com formas pouco absorvíveis como o óxido de magnésio.',
    keyBenefits: [
      'Diferença farmacológica entre Bisglicinato, Treonato, Malato e Dimalato',
      'Tabela de dosagens diárias elementares seguras para mulheres',
      'Melhores horários de ingestão (manhã vs. noite) para máxima absorção',
      'Combinações sinérgicas com Vitamina B6, Taurina e Zinco Quelato'
    ],
    sections: [
      {
        title: '1. Comparativo das 4 Formas Nobres de Magnésio',
        description: 'O magnésio precisa de um carreador orgânico (quelato) para atravessar a parede intestinal sem provocar efeito laxativo indesejado:',
        table: {
          headers: ['Forma de Magnésio', 'Alvo Principal', 'Dosagem Típica', 'Melhor Horário', 'Como Age no Organismo'],
          rows: [
            ['Magnésio Bisglicinato (Quelato)', 'Insônia, Ansiedade, TPM e Tensão Muscular', '200 a 350mg elementar', '30-45 min antes de dormir', 'Ligado a duas moléculas de glicina, atravessa o intestino com alta biodisponibilidade e acalma receptores NMDA no cérebro.'],
            ['Magnésio L-Treonato', 'Névoa Mental, Foco, Memória e Neuroproteção', '150 a 250mg elementar', 'Pela manhã ou início da tarde', 'Única molécula capaz de ultrapassar a barreira hematoencefálica com facilidade, aumentando a densidade sináptica no hipocampo.'],
            ['Magnésio Dimalato / Malato', 'Fadiga Crônica, Fibromialgia e Energia Celular', '200 a 400mg elementar', 'Pela manhã (junto ao café da manhã)', 'O ácido málico participa do Ciclo de Krebs na mitocôndria, aumentando a geração de ATP e reduzindo dores musculares difusas.'],
            ['Citrato de Magnésio', 'Constipação Intestinal e Digestão Lenta', '200 a 300mg elementar', 'À noite ou com água morna', 'Ação osmótica suave que atrai água para o lúmen intestinal, facilitando o peristaltismo de mulheres com intestino preso pós-35 anos.']
          ]
        }
      },
      {
        title: '2. Fitoquímicos e Adaptógenos Auxiliares',
        description: 'Compostos botânicos com respaldo em ensaios clínicos duplo-cegos para equilíbrio neuroendócrino:',
        items: [
          {
            name: 'Ashwagandha (Withania somnifera - KSM-66)',
            tag: 'Modulação do Eixo HPA & Cortisol',
            details: 'Extrato padronizado com 5% de withanolídeos. Estudos demonstram redução de até 27% no cortisol salivar após 60 dias de uso contínuo (300mg a 600mg/dia).',
            actionTip: 'Ideal para quem acorda assustada ou vive em estado de alerta permanente.'
          },
          {
            name: 'Vitex Agnus-Castus (Extrato Seco)',
            tag: 'Estímulo Lúteo & Progesterona Endógena',
            details: 'Atua sobre os receptores dopaminérgicos hipofisários, modulando a prolactina e favorecendo a produção natural de progesterona pelo corpo lúteo (20mg a 40mg de extrato padronizado).',
            actionTip: 'Muito benéfico para mastalgia (dores nas mamas) e TPM severa na 2ª fase do ciclo.'
          },
          {
            name: 'Fosfatidilserina (100mg a 200mg)',
            tag: 'Controle de Cortisol Noturno',
            details: 'Fosfolipídio de membrana que atenua o pico adrenocortical induzido pelo estresse crônico quando tomado no final da tarde.',
            actionTip: 'Excelente para quem não consegue "desligar os pensamentos" ao deitar.'
          }
        ]
      }
    ]
  },
  {
    id: 'mat-diario-rastreador-ciclo',
    title: 'Diário de Rastreamento Circadiano & Ciclo Feminino (Planner 7 Dias)',
    subtitle: 'Template Imprimível para Identificar Padrões de Fadiga, Humor e Sono',
    category: 'Ferramenta Prática & Planner',
    badge: 'Ferramenta Imprimível',
    readTime: '4 min de leitura',
    pagesCount: '3 páginas imprimíveis',
    downloadFilename: 'vital_hormonal_diario_rastreador_circadiano.pdf',
    description: 'Um planner diário simples e objetivo para mapear a conexão entre o que você come, suas horas de exposição solar e a qualidade do seu sono e humor.',
    keyBenefits: [
      'Escala visual de energia matinal, vespertina e noturna (1 a 10)',
      'Registro de despertares noturnos e horários exatos',
      'Mapeamento do dia do ciclo menstrual vs. irritabilidade/inchaço',
      'Checklist de higiene do sono e exposição à luz natural'
    ],
    sections: [
      {
        title: '1. Como Utilizar Seu Diário de Auto-Observação',
        description: 'Os hormônios respondem a ciclos biológicos. Preencha este diário por 7 a 14 dias seguidos para enxergar com clareza matemática os gatilhos dos seus sintomas:',
        items: [
          {
            name: 'Passo 1: Registro Matinal (ao acordar)',
            details: 'Anote a hora que dormiu, hora que acordou, se despertou às 3h e atribua uma nota de 1 a 10 para o nível de descanso mental.'
          },
          {
            name: 'Passo 2: Registro Vespertino (às 17h)',
            details: 'Avalie seu nível de foco, clareza mental e vontade súbita de doces/café à tarde.'
          },
          {
            name: 'Passo 3: Registro Noturno (antes de dormir)',
            details: 'Cheque se cumpriu o corte de luzes artificiais e registre o dia atual do ciclo menstrual.'
          }
        ]
      },
      {
        title: '2. Tabela de Monitoramento Semanal',
        description: 'Campos estruturados para preenchimento diário manual ou digital:',
        table: {
          headers: ['Dia / Data', 'Dia do Ciclo', 'Horas Dormidas', 'Despertar Noturno?', 'Energia Manhã (1-10)', 'Foco Tarde (1-10)', 'Sintoma Predominante'],
          rows: [
            ['Exemplo: Segunda', 'Dia 21', '6h 30min', 'Sim (03h15)', '5 / 10', '4 / 10', 'Névoa mental e inchaço'],
            ['Dia 1: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 2: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 3: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 4: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 5: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 6: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________'],
            ['Dia 7: _____', 'Dia __', '___ h ___ min', '[ ] Sim  [ ] Não', '__ / 10', '__ / 10', '_______________________']
          ]
        }
      }
    ]
  }
];
