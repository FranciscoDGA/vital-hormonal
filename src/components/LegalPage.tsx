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
              <p>O <strong>Vital Hormonal</strong> (doravante "nós", "nosso" ou "site") valoriza e respeita a sua privacidade. Esta Política de Privacidade descreve de forma clara e detalhada como coletamos, usamos, armazenamos, compartilhamos e protegemos as suas informações pessoais quando você utiliza nossos serviços, navega no portal ou interage com nossos conteúdos.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Coleta de Informações</h3>
              <p>Coletamos diferentes tipos de informações para oferecer e aprimorar nossos serviços:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Informações fornecidas ativamente:</strong> Dados como nome e endereço de e-mail inseridos voluntariamente ao assinar nossa newsletter, enviar mensagens no formulário de contato ou baixar materiais educativos.</li>
                <li><strong>Informações coletadas automaticamente:</strong> Coletamos dados de navegação por meio de cookies e tecnologias de rastreamento (como endereço IP, tipo de navegador, páginas acessadas, tempo de permanência e cliques). Utilizamos o Google Analytics para entender o comportamento da nossa audiência de forma anônima.</li>
              </ul>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Uso de Cookies e Google AdSense</h3>
              <p>O Vital Hormonal exibe publicidade de terceiros, incluindo o <strong>Google AdSense</strong>. A respeito do uso de cookies para publicidade:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecedores de terceiros, incluindo o Google, utilizam cookies para veicular anúncios com base em visitas anteriores do usuário ao nosso site ou a outros sites na Internet.</li>
                <li>O uso de cookies de publicidade permite que o Google e seus parceiros exibam anúncios personalizados baseados no histórico de navegação.</li>
                <li>Os usuários podem desativar a publicidade personalizada a qualquer momento acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#C96E56] underline">Configurações de anúncios do Google</a>. Alternativamente, você pode acessar o site <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#C96E56] underline">www.aboutads.info</a> para desativar o uso de cookies de publicidade personalizada de fornecedores de terceiros.</li>
              </ul>

              <h3 className="font-bold text-[#2D312E] mt-6">3. Uso das Informações</h3>
              <p>As informações coletadas são utilizadas exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar e melhorar a experiência do usuário em nosso portal.</li>
                <li>Enviar newsletters, avisos importantes e e-books previamente solicitados.</li>
                <li>Otimizar o desempenho técnico e editorial do site com base em estatísticas.</li>
                <li>Cumprir obrigações legais e regulatórias vigentes.</li>
              </ul>

              <h3 className="font-bold text-[#2D312E] mt-6">4. Compartilhamento e Proteção de Dados</h3>
              <p>Nós <strong>não vendemos, alugamos ou comercializamos</strong> suas informações pessoais. Implementamos medidas rigorosas de segurança, utilizando certificados SSL e criptografia, para garantir a integridade dos seus dados contra acessos não autorizados. Compartilhamos dados apenas com fornecedores de serviços estritamente necessários para o funcionamento do site (como provedores de hospedagem), todos comprometidos com diretrizes rígidas de confidencialidade.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">5. Links de Terceiros</h3>
              <p>Ocasionalmente, a nosso critério, podemos incluir ou oferecer produtos ou serviços de terceiros (incluindo artigos científicos citados) em nosso site. Estes sites de terceiros possuem políticas de privacidade separadas e independentes. Portanto, não temos nenhuma responsabilidade ou obrigação pelo conteúdo e atividades desses sites vinculados.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">6. Contato e Encarregado de Dados</h3>
              <p>Caso tenha dúvidas ou queira exercer seus direitos em relação a esta Política de Privacidade, entre em contato através do e-mail oficial: <strong className="text-[#26463E]">privacidade@vitalhormonal.com</strong></p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 text-base text-[#525753] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#26463E]">Termos e Condições de Uso</h2>
              <p>Bem-vindo ao Vital Hormonal. A utilização deste site está condicionada à aceitação irrestrita e ao cumprimento dos Termos e Condições aqui estabelecidos. Ao continuar a acessar e navegar neste portal, você atesta a sua concordância formal com estes termos.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Natureza Informativa e Disclaimer Médico</h3>
              <p><strong>Atenção: Todo o conteúdo editorial, artigos, glossários e calculadoras do Vital Hormonal têm caráter estritamente educativo e informativo.</strong></p>
              <p>Nenhuma informação publicada substitui a avaliação médica presencial, o diagnóstico clínico, exames laboratoriais ou a prescrição de qualquer plano terapêutico. Nunca ignore conselhos médicos profissionais ou demore em procurá-los devido a algo que você tenha lido neste site. Em caso de emergência médica, procure imediatamente um serviço de pronto-atendimento.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Direitos Autorais e Propriedade Intelectual</h3>
              <p>Todo o conteúdo deste site (textos, design, gráficos, logotipos, ícones, banco de dados) é de propriedade exclusiva do Vital Hormonal e está protegido pelas leis internacionais de direitos autorais. É terminantemente proibida a reprodução, cópia, distribuição ou modificação de qualquer material sem a devida citação explícita da fonte ou autorização prévia por escrito.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">3. Limitação de Responsabilidade</h3>
              <p>A equipe do Vital Hormonal se esforça para manter os dados científicos sempre atualizados segundo as publicações médicas mais recentes. Contudo, não podemos garantir a ausência de imprecisões ao longo do tempo. O site e seus autores não assumem qualquer responsabilidade por danos diretos ou indiretos resultantes da má interpretação ou aplicação das informações contidas na plataforma.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">4. Anúncios e Links Externos</h3>
              <p>Este site é mantido através de redes de publicidade de terceiros (como o Google AdSense). A veiculação de um anúncio não constitui um endosso oficial do Vital Hormonal sobre o produto ou serviço anunciado. A responsabilidade por qualquer transação realizada com anunciantes recai inteiramente sobre o próprio usuário e a empresa terceira.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">5. Modificações dos Termos</h3>
              <p>O Vital Hormonal reserva-se o direito de alterar estes Termos de Uso a qualquer momento, visando se adequar às normas legais e ao desenvolvimento do projeto. O uso contínuo do site após eventuais alterações atesta o seu consentimento às novas condições.</p>
            </div>
          )}

          {activeTab === 'lgpd' && (
            <div className="space-y-6 text-base text-[#525753] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#26463E]">Lei Geral de Proteção de Dados (LGPD)</h2>
              <p>O Vital Hormonal está integralmente comprometido em assegurar a privacidade e a segurança dos dados dos seus usuários, em total conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">1. Base Legal para o Tratamento de Dados</h3>
              <p>Realizamos o tratamento de dados pessoais estritamente sob as bases legais previstas na LGPD, incluindo, mas não se limitando a: consentimento expresso do titular (para o envio de newsletter), legítimo interesse do controlador (para as métricas analíticas e funcionamento do site) e o cumprimento de obrigação legal ou regulatória.</p>
              
              <h3 className="font-bold text-[#2D312E] mt-6">2. Direitos do Titular dos Dados</h3>
              <p>De acordo com o Artigo 18 da LGPD, você possui garantias em relação às suas informações. O Vital Hormonal assegura a você os seguintes direitos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acesso e Confirmação:</strong> Saber se tratamos seus dados e ter acesso a eles.</li>
                <li><strong>Retificação:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Anonimização ou Exclusão:</strong> Requerer o bloqueio, anonimização ou eliminação de dados que não sejam mais necessários.</li>
                <li><strong>Portabilidade:</strong> Solicitar a transferência dos seus dados.</li>
                <li><strong>Revogação de Consentimento:</strong> Cancelar a sua assinatura de e-mails de maneira simples (opt-out) a qualquer instante.</li>
              </ul>
              
              <h3 className="font-bold text-[#2D312E] mt-6">3. Como exercer os seus Direitos</h3>
              <p>Facilitamos o pleno exercício de seus direitos. Para solicitar a exclusão definitiva do seu e-mail da nossa base de newsletter ou obter um relatório de dados, envie uma solicitação documentada. Responderemos em tempo hábil e em conformidade estrita com a legislação.</p>

              <h3 className="font-bold text-[#2D312E] mt-6">4. Encarregado pelo Tratamento de Dados (DPO)</h3>
              <p>Para assegurar total aderência à LGPD e fornecer um canal direto de comunicação com os usuários e autoridades competentes, possuímos um Data Protection Officer (DPO). Você pode contatá-lo diretamente através do seguinte e-mail: <br/><strong className="text-[#26463E]">privacidade@vitalhormonal.com</strong></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
