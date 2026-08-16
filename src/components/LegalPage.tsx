import React, { useState } from 'react';
import { Shield, FileText, Lock } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'lgpd';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'lgpd'>(initialTab);

  return (
    <main className="flex-1 bg-[#F9F7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E3EBE6] min-h-[60vh]">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26463E] mb-8 leading-tight">
          Políticas e Termos Legais
        </h1>

        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-[#E3EBE6] pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'privacy' ? 'bg-[#26463E] text-white' : 'text-[#525753] hover:bg-[#F2F6F4]'
            }`}
          >
            <Shield className="w-4 h-4" />
            Privacidade
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'terms' ? 'bg-[#26463E] text-white' : 'text-[#525753] hover:bg-[#F2F6F4]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Termos de Uso
          </button>
          <button
            onClick={() => setActiveTab('lgpd')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'lgpd' ? 'bg-[#26463E] text-white' : 'text-[#525753] hover:bg-[#F2F6F4]'
            }`}
          >
            <Lock className="w-4 h-4" />
            LGPD
          </button>
        </div>

        <div>
          {activeTab === 'privacy' && (
            <div className="space-y-6 text-base text-[#525753] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#26463E]">Políticas de Privacidade</h2>
              <p>O Vital Hormonal valoriza a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Coleta de Informações</h3>
              <p>Coletamos informações que você nos fornece diretamente, como nome e e-mail ao assinar nossa newsletter ou baixar materiais. Também coletamos dados automaticamente via cookies para melhorar sua experiência (como Google Analytics e Google AdSense).</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Uso das Informações e Google AdSense</h3>
              <p>Fornecedores de terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas anteriores do usuário ao seu website ou a outros websites. O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios para os usuários com base nas visitas feitas aos seus sites e/ou a outros sites na Internet. Os usuários podem desativar a publicidade personalizada acessando as Configurações de anúncios do Google.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">3. Proteção de Dados</h3>
              <p>Implementamos medidas de segurança para manter suas informações pessoais seguras. Não vendemos nem transferimos seus dados para terceiros sem seu consentimento expresso.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">4. Contato</h3>
              <p>Se tiver dúvidas sobre nossa Política de Privacidade, entre em contato através do e-mail: <strong className="text-[#26463E]">contato@vitalhormonal.com</strong></p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 text-base text-[#525753] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#26463E]">Termos de Uso</h2>
              <p>Bem-vindo ao Vital Hormonal. Ao acessar este site, você concorda em cumprir estes Termos de Uso.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Uso do Conteúdo</h3>
              <p>Todo o conteúdo editorial, calculadoras e glossários do Vital Hormonal têm caráter puramente educativo. O conteúdo não substitui em hipótese alguma a consulta médica individualizada, o diagnóstico clínico ou a prescrição terapêutica.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Direitos Autorais</h3>
              <p>O material contido neste site, incluindo textos, gráficos e logotipos, é de propriedade exclusiva do Vital Hormonal, protegido pelas leis de direitos autorais. É proibida a reprodução sem citação devida da fonte.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">3. Publicidade</h3>
              <p>Este site pode exibir anúncios (como o Google AdSense) e links para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">4. Alterações nos Termos</h3>
              <p>O Vital Hormonal reserva-se o direito de modificar estes termos a qualquer momento. Seu uso contínuo após alterações constitui aceitação dos novos termos.</p>
            </div>
          )}

          {activeTab === 'lgpd' && (
            <div className="space-y-6 text-base text-[#525753] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#26463E]">Lei Geral de Proteção de Dados (LGPD)</h2>
              <p>O Vital Hormonal está comprometido com o cumprimento da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Seus Direitos</h3>
              <p>Você tem o direito de solicitar: a) confirmação da existência de tratamento; b) acesso aos seus dados; c) correção de dados incompletos, inexatos ou desatualizados; d) anonimização, bloqueio ou eliminação de dados desnecessários; e) revogação do consentimento.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Como exercê-los</h3>
              <p>Para exercer qualquer um de seus direitos sob a LGPD, como solicitar a remoção de seu e-mail da nossa base de newsletter ou leads, envie uma solicitação clara para o nosso canal oficial.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">3. Encarregado de Dados (DPO)</h3>
              <p>Possuímos um encarregado de proteção de dados que pode ser contatado pelo e-mail: <strong className="text-[#26463E]">privacidade@vitalhormonal.com</strong></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
