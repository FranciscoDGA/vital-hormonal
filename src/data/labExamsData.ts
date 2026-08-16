export interface LabExam {
  id: string;
  name: string;
  shortName: string;
  category: 'hormonios' | 'metabolismo' | 'vitaminas_minerais' | 'tireoide' | 'inflamacao';
  categoryLabel: string;
  purpose: string;
  conventionalRange: string;
  optimalRange: string;
  highMeaning: string;
  lowMeaning: string;
  collectionTips: string;
  relatedArticleId?: string;
  symptomsRelated: string[];
}

export const LAB_EXAMS_DATA: LabExam[] = [
  {
    id: 'fsh',
    name: 'FSH (Hormônio Folículo Estimulante)',
    shortName: 'FSH',
    category: 'hormonios',
    categoryLabel: 'Hormônios Sexuais & Hipófise',
    purpose: 'Avalia a reserva ovariana e o esforço que a hipófise está fazendo para estimular os folículos ovarianos a produzirem estrogênio.',
    conventionalRange: 'Mulher jovem: 3,5 a 12,5 mUI/mL • Pós-menopausa: > 25,8 a 134,8 mUI/mL',
    optimalRange: 'Na transição (35-48 anos): Níveis oscilantes > 15-20 mUI/mL indicam início da falência folicular',
    highMeaning: 'Indica diminuição da reserva ovariana. A hipófise "grita" enviando mais FSH porque os ovários estão produzindo menos estradiol e inibina B.',
    lowMeaning: 'Normal na fase reprodutiva inicial ou pode indicar supressão por uso de anticoncepcionais orais ou desnutrição grave.',
    collectionTips: 'Se ainda menstrua, colher preferencialmente entre o 2º e o 4º dia do ciclo menstrual pela manhã.',
    relatedArticleId: 'art-1',
    symptomsRelated: ['Ciclos menstruais encurtando ou atrasando', 'Fogachos', 'Suores noturnos']
  },
  {
    id: 'estradiol',
    name: 'Estradiol Sérico (17-Beta Estradiol - E2)',
    shortName: 'Estradiol (E2)',
    category: 'hormonios',
    categoryLabel: 'Hormônios Sexuais & Ovarianos',
    purpose: 'Principal estrogênio ativo da mulher fértil, responsável pelo trofismo da mucosa vaginal, saúde óssea, elasticidade vascular, termorregulação e neuroproteção.',
    conventionalRange: 'Fase folicular: 30-120 pg/mL • Pico ovulatório: 130-370 pg/mL • Menopausa: < 30 pg/mL',
    optimalRange: 'Com Terapia de Reposição Hormonal (TRH): alvo fisiológico usual de 50 a 100 pg/mL com alívio dos sintomas',
    highMeaning: 'Picos transitórios na perimenopausa (predomínio estrogênico relativo), hiperplasia endometrial, endometriose ou cistos foliculares.',
    lowMeaning: 'Ressecamento vaginal, fogachos, perda de massa óssea, perda de colágeno, fadiga mental e alterações de humor.',
    collectionTips: 'Na mulher que menstrua, dosar no 3º dia do ciclo para basal ou no 21º dia para avaliar função lútea.',
    relatedArticleId: 'art-2',
    symptomsRelated: ['Ressecamento íntimo', 'Fogachos', 'Dor articular', 'Névoa mental']
  },
  {
    id: 'progesterona',
    name: 'Progesterona Sérica',
    shortName: 'Progesterona',
    category: 'hormonios',
    categoryLabel: 'Hormônios Sexuais & Ovarianos',
    purpose: 'Hormônio produzido pelo corpo lúteo após a ovulação. Atua como o calmante natural do cérebro (estimula receptores GABA), equilibra o estrogênio e prepara o endométrio.',
    conventionalRange: 'Fase folicular: < 1 ng/mL • Fase lútea: 5 a 20 ng/mL • Pós-menopausa: < 0,5 ng/mL',
    optimalRange: 'Fase lútea (7 dias após a ovulação / dia 21 em ciclo de 28 dias): > 10 a 15 ng/mL',
    highMeaning: 'Gravidez ou fase lútea vigorosa.',
    lowMeaning: 'Ciclos anovulatórios (muito comuns a partir dos 35 anos), insônia de madrugada, TPM severa, inchaço mamário e ansiedade.',
    collectionTips: 'Obrigatório colher 7 dias antes da data prevista da menstruação (em ciclos regulares de 28 dias, no 21º dia).',
    relatedArticleId: 'art-2',
    symptomsRelated: ['Acordar às 3h da manhã', 'Ansiedade pré-menstrual', 'Mamas doloridas', 'Retenção de líquidos']
  },
  {
    id: 'testosterona-livre-total',
    name: 'Testosterona Total e Testosterona Livre Calculada',
    shortName: 'Testosterona Livre',
    category: 'hormonios',
    categoryLabel: 'Androgênios Femininos',
    purpose: 'Fundamental para libido, sensibilidade do clitóris, força muscular, disposição física, clareza mental e densidade óssea feminina.',
    conventionalRange: 'Total: 15 a 70 ng/dL • Livre calculada: 0,5 a 3,0 pg/mL',
    optimalRange: 'Mulher madura com queixa clínica: Testosterona total entre 35-55 ng/dL e Livre no terço superior da faixa fisiológica',
    highMeaning: 'SOP (Síndrome dos Ovários Policísticos), aumento de oleosidade cutânea, acne na mandíbula ou hirsutismo.',
    lowMeaning: 'Fadiga crônica, falta total de libido, fraqueza muscular, flacidez acelerada e desânimo matinal.',
    collectionTips: 'Colher sempre nas primeiras 2 horas após acordar, quando os níveis androgênicos estão no pico diário.',
    relatedArticleId: 'art-20',
    symptomsRelated: ['Perda de libido', 'Perda de força muscular', 'Cansaço crônico', 'Falta de foco']
  },
  {
    id: 'dhea-s',
    name: 'DHEA-S (Sulfato de Desidroepiandrosterona)',
    shortName: 'DHEA-S',
    category: 'hormonios',
    categoryLabel: 'Hormônios Adrenais',
    purpose: 'Pré-hormônio abundante sintetizado pelas glândulas adrenais, precursor de estrogênios e testosterona, marcador de reserva adrenal e longevidade celular.',
    conventionalRange: 'Mulheres 40-50 anos: 35 a 430 mcg/dL (faixa laboratorial muito ampla)',
    optimalRange: 'Faixa funcional otimizada para vitalidade: 150 a 250 mcg/dL',
    highMeaning: 'Hiperplasia adrenal, estresse agudo severo ou suplementação excessiva.',
    lowMeaning: 'Exaustão adrenal, baixa imunidade, perda de vitalidade, pele excessivamente fina e ressecada.',
    collectionTips: 'Jejum de 8 horas pela manhã.',
    relatedArticleId: 'art-13',
    symptomsRelated: ['Fadiga que não passa com o sono', 'Baixa imunidade', 'Perda de tônus cutâneo']
  },
  {
    id: 'shbg',
    name: 'SHBG (Globulina Carreadora de Hormônios Sexuais)',
    shortName: 'SHBG',
    category: 'hormonios',
    categoryLabel: 'Proteínas Transportadoras',
    purpose: 'Proteína produzida no fígado que se liga à testosterona e ao estradiol, controlando a quantidade de hormônio livre e ativo nos tecidos.',
    conventionalRange: 'Mulheres adultas: 18 a 114 nmol/L',
    optimalRange: 'Faixa funcional ideal: 40 a 75 nmol/L',
    highMeaning: 'Uso de estrogênio por via oral (pílula anticoncepcional ou TRH oral), hipertireoidismo ou restrição calórica severa — aprisiona a testosterona livre.',
    lowMeaning: 'Resistência à insulina, obesidade visceral, fígado gorduroso (esteatose) ou excesso de androgênios livres.',
    collectionTips: 'Importante dosar em conjunto com a Testosterona Total para calcular a fração livre.',
    relatedArticleId: 'art-20',
    symptomsRelated: ['Falta de libido mesmo com testo total normal', 'Gordura abdominal', 'Acne']
  },
  {
    id: 'ferritina',
    name: 'Ferritina Sérica',
    shortName: 'Ferritina (Estoques de Ferro)',
    category: 'vitaminas_minerais',
    categoryLabel: 'Micronutrientes & Estoques',
    purpose: 'Principal proteína de armazenamento de ferro intracelular, essencial para produção de energia nas mitocôndrias, síntese de neurotransmissores e bulbo capilar.',
    conventionalRange: 'Laboratórios convencionais: 10 a 200 ng/mL (muito permissivo)',
    optimalRange: 'Alvo funcional para queda de cabelo e energia celular: 70 a 120 ng/mL',
    highMeaning: 'Inflamação sistêmica oculta, sobrecarga hepática, síndrome metabólica ou hemocromatose.',
    lowMeaning: 'Eflúvio telógeno (queda acentuada de cabelo), unhas quebradiças, fadiga ao subir escadas, pernas inquietas e falta de ar ao esforço leve.',
    collectionTips: 'Evitar exercícios extenuantes no dia anterior e não colher durante quadros gripais/infecciosos agudos.',
    relatedArticleId: 'art-28',
    symptomsRelated: ['Queda de cabelo difusa', 'Unhas frágeis', 'Cansaço físico', 'Palpitações leves']
  },
  {
    id: 'vitamina-d',
    name: 'Vitamina D (25-Hidroxivitamina D - 25-OH-D)',
    shortName: 'Vitamina D (25-OH)',
    category: 'vitaminas_minerais',
    categoryLabel: 'Secoesteroides & Imunidade',
    purpose: 'Atua como um potente hormônio esteroide que regula mais de 2.000 genes, absorção de cálcio nos ossos, imunidade celular e síntese de serotonina.',
    conventionalRange: 'População geral: > 20 ng/mL • Grupos de risco: > 30 ng/mL',
    optimalRange: 'Mulheres 35+ com foco em saúde óssea, muscular e imunológica: 45 a 65 ng/mL',
    highMeaning: 'Toxicidade (rara, geralmente acima de 100-120 ng/mL por suplementação desregulada).',
    lowMeaning: 'Perda de densidade mineral óssea (osteopenia), dores musculares difusas, fraqueza, suscetibilidade a infecções e alterações de humor.',
    collectionTips: 'Não necessita de jejum prolongado. Se suplementa doses altas diárias, evitar tomar na manhã da coleta.',
    relatedArticleId: 'art-16',
    symptomsRelated: ['Dor nos ossos e músculos', 'Baixa imunidade', 'Tristeza sazonal', 'Osteopenia']
  },
  {
    id: 'tsh-t4-t3',
    name: 'Painel Tireoidiano (TSH, T4 Livre e T3 Livre)',
    shortName: 'TSH, T4L e T3 Livre',
    category: 'tireoide',
    categoryLabel: 'Tireoide & Termogênese',
    purpose: 'Mede o metabolismo basal, a taxa de queima calórica, a temperatura corporal e a agilidade mental regulada pela tireoide.',
    conventionalRange: 'TSH: 0,4 a 4,5 mUI/L • T4L: 0,7 a 1,8 ng/dL • T3L: 2,0 a 4,4 pg/mL',
    optimalRange: 'Faixa funcional otimizada: TSH entre 1,0 e 2,2 mUI/L • T3 Livre no terço superior (> 3,0 pg/mL)',
    highMeaning: 'TSH elevado indica Hipotireoidismo (a hipófise está exigindo mais da tireoide).',
    lowMeaning: 'TSH muito baixo indica Hipertireoidismo. T3 Livre baixo com TSH normal sugere má conversão periférica (Síndrome do T3 Baixo por estresse/inflamação).',
    collectionTips: 'Colher em jejum pela manhã. Se toma Levotiroxina (Puran/Synthroid), colher o sangue ANTES de tomar o comprimido do dia.',
    relatedArticleId: 'art-4',
    symptomsRelated: ['Dificuldade para emagrecer', 'Intolerância ao frio', 'Intestino muito preso', 'Pele muito seca', 'Lentidão mental']
  },
  {
    id: 'homa-ir-glicada',
    name: 'Insulina de Jejum, Glicemia e Hemoglobina Glicada (HbA1c)',
    shortName: 'Insulina & HOMA-IR',
    category: 'metabolismo',
    categoryLabel: 'Metabolismo & Glicose',
    purpose: 'Detecta a resistência à insulina anos antes do aumento da glicemia de jejum, identificando a causa raiz do acúmulo de gordura no abdômen.',
    conventionalRange: 'Insulina: até 25 uUI/mL (muito alto) • Glicose: < 99 mg/dL • HbA1c: < 5,7%',
    optimalRange: 'Metabolismo saudável 40+: Insulina de jejum entre 3 e 7 uUI/mL • HOMA-IR < 1,5 • HbA1c < 5,3%',
    highMeaning: 'Resistência à insulina, esteatose hepática, facilidade para acumular gordura visceral e risco cardiovascular aumentado.',
    lowMeaning: 'Excelente sensibilidade à insulina (ou raros casos de falência pancreática tipo 1).',
    collectionTips: 'Jejum rigoroso de 8 a 12 horas. Evitar refeições hipercalóricas ou álcool na noite anterior.',
    relatedArticleId: 'art-3',
    symptomsRelated: ['Gordura concentrada na barriga', 'Vontade incontrolável de doces após o almoço', 'Sonolência pós-prandial']
  },
  {
    id: 'apob-lipidios',
    name: 'Apolipoproteína B (ApoB) e Painel Lipídico Completo',
    shortName: 'ApoB & Perfil Lipídico',
    category: 'inflamacao',
    categoryLabel: 'Saúde Cardiovascular & Endotélio',
    purpose: 'ApoB quantifica o número exato de partículas aterogênicas circulantes (LDL + VLDL + IDL), sendo muito superior ao LDL-colesterol isolado para predizer risco cardíaco.',
    conventionalRange: 'ApoB: < 90 mg/dL para risco intermediário • < 80 mg/dL para alto risco',
    optimalRange: 'Meta preventiva em saúde cardiovascular feminina: ApoB < 75 mg/dL e Triglicerídeos/HDL ratio < 2.0',
    highMeaning: 'Aumento expressivo do risco de placas de aterosclerose e endurecimento arterial pós-menopausa.',
    lowMeaning: 'Baixa densidade de partículas aterogênicas.',
    collectionTips: 'Jejum de 8 a 12 horas sem consumo de álcool nas 48h prévias.',
    relatedArticleId: 'art-25',
    symptomsRelated: ['Pressão arterial oscilando', 'Histórico familiar de infarto', 'Aumento de LDL após os 45 anos']
  },
  {
    id: 'pcr-us',
    name: 'Proteína C-Reativa Ultrassensível (PCR-us)',
    shortName: 'PCR Ultrassensível',
    category: 'inflamacao',
    categoryLabel: 'Inflamação Subclínica',
    purpose: 'Marcador padrão-ouro de inflamação sistêmica de baixo grau (*inflammaging*) e estresse na parede dos vasos sanguíneos.',
    conventionalRange: 'Baixo risco cardiovascular: < 1,0 mg/L • Médio risco: 1,0 a 3,0 mg/L',
    optimalRange: 'Alvo funcional de longevidade saudável: < 0,5 mg/L',
    highMeaning: 'Inflamação crônica subclínica, disbiose intestinal, obesidade visceral ou aterosclerose ativa (se > 10 mg/L sugere infecção aguda).',
    lowMeaning: 'Ausência de inflamação endotelial detectável.',
    collectionTips: 'Não dosar se estiver com resfriado, infecção dentária ou machucado recente.',
    relatedArticleId: 'art-26',
    symptomsRelated: ['Dores articulares migratórias', 'Inchaço corporal generalizado', 'Enxaquecas frequentes']
  }
];
