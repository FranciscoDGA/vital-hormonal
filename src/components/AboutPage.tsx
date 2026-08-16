import React from 'react';
import { Sparkles, Heart, BookOpen, ShieldCheck, Award, Users } from 'lucide-react';

interface AboutPageProps {
  onOpenGuideModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenGuideModal }) => {
  return (
    <main className="flex-1 bg-[#F9F7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E3EBE6]">
        
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EBE6] text-[#26463E] text-xs font-bold uppercase tracking-wider mb-6 border border-[#c2d5cd]">
          <Heart className="w-3.5 h-3.5 text-[#C96E56]" />
          <span>Nossa História & Propósito</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26463E] mb-6 leading-tight">
          Por trás do Vital Hormonal: Ciência traduzida em acolhimento e clareza.
        </h1>

        <p className="text-base sm:text-lg text-[#525753] leading-relaxed mb-10">
          Um portal editorial independente criado para transformar a literatura médica global em conhecimento prático, acessível e sem jargões para mulheres a partir dos 35 anos.
        </p>

        {/* Founder Letter Box */}
        <div className="bg-[#F9F7F2] rounded-2xl p-6 sm:p-8 border border-[#E3EBE6] mb-12 space-y-4 text-base text-[#2D312E] leading-relaxed">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E3EBE6]">
            <div className="w-12 h-12 rounded-full bg-[#26463E] text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs">
              V
            </div>
            <div>
              <span className="font-bold text-[#26463E] block text-lg">
                Mensagem do Idealizador
              </span>
              <span className="text-sm text-[#7d837f] block">
                Fundador & Pesquisador de Conteúdo do Vital Hormonal
              </span>
            </div>
          </div>

          <p className="italic text-[#525753]">
            &ldquo;Como homem, esposo e pai de família, testemunhei de perto a jornada silenciosa e muitas vezes solitária que as mulheres enfrentam ao entrar na transição hormonal após os 35 anos.
          </p>
          <p className="italic text-[#525753]">
            Vi pessoas incríveis ouvirem que o cansaço constante, a névoa mental e as alterações de humor eram 'apenas estresse da idade' ou 'coisa da cabeça'. Fiquei inconformado ao constatar como a ciência hormonal de ponta já possui respostas valiosas — mas que quase nunca chegam de forma clara e humana a quem mais precisa.
          </p>
          <p className="italic text-[#525753]">
            O <strong>Vital Hormonal</strong> nasceu desse amor e compromisso: ser uma ponte entre os melhores ensaios clínicos do mundo e o seu dia a dia, trazendo autonomia para que você tome as rédeas da sua saúde com serenidade e respeito.&rdquo;
          </p>
        </div>

        {/* The 3 Editorial Pillars */}
        <div className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#26463E] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C96E56]" />
            Nossos 3 Pilares Editoriais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E3EBE6] shadow-xs">
              <BookOpen className="w-6 h-6 text-[#58877b] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#26463E] mb-2">
                1. Curadoria Baseada em Evidências
              </h3>
              <p className="text-sm text-[#525753] leading-relaxed">
                Consultamos estudos indexados no PubMed, The Lancet e NAMS, traduzindo dados complexos em linguagem acolhedora.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3EBE6] shadow-xs">
              <Award className="w-6 h-6 text-[#C96E56] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#26463E] mb-2">
                2. Zero Sensacionalismo
              </h3>
              <p className="text-sm text-[#525753] leading-relaxed">
                Não prometemos curas mágicas nem usamos alarmismo. Abordamos a biologia com respeito à individualidade.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3EBE6] shadow-xs">
              <Users className="w-6 h-6 text-[#26463E] mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-[#26463E] mb-2">
                3. Diálogo com seu Médico
              </h3>
              <p className="text-sm text-[#525753] leading-relaxed">
                Munimos você com conhecimento para que converse de igual para igual nas consultas com seu médico de confiança.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Compliance: Detailed About Us */}
        <div className="space-y-4 mb-10">
          <h2 className="font-serif text-2xl font-bold text-[#26463E]">Nossa Missão, Visão e Políticas</h2>
          <div className="text-base text-[#525753] space-y-4 leading-relaxed mt-4">
            <p><strong>Missão:</strong> Democratizar o acesso à informação científica de alta qualidade sobre saúde funcional e endocrinologia para o público feminino, desmistificando tabus da menopausa e envelhecimento ativo.</p>
            <p><strong>Visão:</strong> Ser a principal e mais confiável referência editorial de longevidade e bem-estar feminino na América Latina até 2030, criando uma comunidade de mulheres empoderadas pela ciência.</p>
            <p><strong>Política Editorial e Fontes:</strong> Nossa equipe de redatores revisa metodicamente as literaturas de peso global. Cada artigo é fundamentado em dados peer-reviewed (revisados por pares), sem influência de financiadores externos ou conflitos de interesse da indústria farmacêutica em nossas avaliações de tratamento.</p>
            <p><strong>Sede e Contato:</strong> O Vital Hormonal é mantido por uma equipe editorial independente e revisores da área da saúde. Dúvidas sobre pautas ou parcerias? Entre em contato pelo e-mail: <strong className="text-[#26463E]">contato@vitalhormonal.com</strong>.</p>
          </div>
        </div>

        {/* Ethical Box */}
        <div className="bg-[#E3EBE6]/60 rounded-2xl p-5 border border-[#c2d5cd] flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#58877b] shrink-0 mt-0.5" />
          <p className="text-sm text-[#26463E] leading-relaxed">
            <strong>Transparência Ética:</strong> O Vital Hormonal é um portal de mídia e educação em saúde feminina. O conteúdo não substitui a consulta médica individualizada, o diagnóstico clínico ou a prescrição terapêutica.
          </p>
        </div>

      </div>
    </main>
  );
};
