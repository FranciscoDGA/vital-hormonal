import { Article, QuickTrack } from '../types';
import { ARTICLES_PART_1 } from './articles/articlesPart1';
import { ARTICLES_PART_2 } from './articles/articlesPart2';
import { ARTICLES_PART_3 } from './articles/articlesPart3';
import { ARTICLES_PART_4 } from './articles/articlesPart4';
import { ARTICLES_PART_5 } from './articles/articlesPart5';
import { ARTICLES_PART_6 } from './articles/articlesPart6';
import { ARTICLES_PART_7 } from './articles/articlesPart7';

export const ARTICLES_DATA: Article[] = [
  ...ARTICLES_PART_1,
  ...ARTICLES_PART_2,
  ...ARTICLES_PART_3,
  ...ARTICLES_PART_4,
  ...ARTICLES_PART_5,
  ...ARTICLES_PART_6,
  ...ARTICLES_PART_7
];

export const STARTER_TRACKS: QuickTrack[] = [
  {
    id: 'trilha-sono',
    title: 'Sono & Fadiga Noturna',
    subtitle: 'Para quem acorda às 3h da manhã, tem sono leve ou levanta sem energia.',
    iconName: 'Moon',
    symptoms: ['Despertar noturno', 'Insônia inicial', 'Cansaço matinal', 'Pernas inquietas'],
    categoryFilter: 'hormonios',
    recommendedArticleId: 'art-1',
    colorScheme: 'sage'
  },
  {
    id: 'trilha-foco',
    title: 'Foco & Névoa Mental',
    subtitle: 'Para quem esquece palavras, sente lentidão de raciocínio ou exaustão cognitiva.',
    iconName: 'Brain',
    symptoms: ['Esquecimento de nomes', 'Dificuldade de concentração', 'Sensação de cabeça cheia'],
    categoryFilter: 'sintomas',
    recommendedArticleId: 'art-2',
    colorScheme: 'mint'
  },
  {
    id: 'trilha-metabolismo',
    title: 'Metabolismo & Gordura Visceral',
    subtitle: 'Para quem sente ganho de peso abdominal, retenção de líquidos ou digestão lenta.',
    iconName: 'Flame',
    symptoms: ['Gordura na cintura', 'Inchaço após comer', 'Desejo por doces à tarde', 'Metabolismo lento'],
    categoryFilter: 'hormonios',
    recommendedArticleId: 'art-3',
    colorScheme: 'terracotta'
  },
  {
    id: 'trilha-tireoide',
    title: 'Tireoide & Energia Vital',
    subtitle: 'Para diferenciar hipotireoidismo de flutuações ovarianas e recuperar o pique.',
    iconName: 'Activity',
    symptoms: ['Fadiga matinal intensa', 'Queda de cabelo difusa', 'Intolerância ao frio', 'Unhas fracas'],
    categoryFilter: 'hormonios',
    recommendedArticleId: 'art-7',
    colorScheme: 'sage'
  },
  {
    id: 'trilha-trh',
    title: 'Reposição Hormonal & Longevidade',
    subtitle: 'Diretrizes científicas atualizadas sobre estradiol transdérmico e bioidênticos.',
    iconName: 'ShieldCheck',
    symptoms: ['Janela de oportunidade', 'Segurança cardiovascular', 'Proteção óssea', 'Prevenção cognitiva'],
    categoryFilter: 'hormonios',
    recommendedArticleId: 'art-10',
    colorScheme: 'mint'
  },
  {
    id: 'trilha-longevidade',
    title: 'Longevidade Celular & Músculo',
    subtitle: 'Preservação de massa magra, saúde das artérias e telômeros para os 50+.',
    iconName: 'Sparkles',
    symptoms: ['Perda de massa magra', 'Colesterol subindo', 'Rigidez matinal', 'Envelhecimento celular'],
    categoryFilter: 'longevidade',
    recommendedArticleId: 'art-24',
    colorScheme: 'terracotta'
  }
];

export const POPULAR_SYMPTOMS = [
  'Acordar às 3h da manhã',
  'Névoa mental e esquecimento',
  'Gordura abdominal súbita',
  'Irritabilidade e pavio curto',
  'Calorões e suor noturno',
  'Fadiga ao acordar',
  'Queda de cabelo difusa',
  'Baixa libido e ressecamento',
  'Palpitações e ansiedade',
  'Inchaço e retenção severa',
  'Dor nas juntas ao acordar',
  'Zumbido no ouvido (Tinnitus)',
  'Perda de força e massa magra',
  'Colesterol subindo aos 45',
  'Osteopenia e ossos fracos'
];
