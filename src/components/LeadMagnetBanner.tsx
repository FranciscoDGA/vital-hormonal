import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Download, Sparkles, ShieldCheck, ArrowRight, Printer, FolderOpen } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';
import { FREE_MATERIALS_DATA } from '../data/freeMaterials';
import { PrintableMaterialViewer } from './PrintableMaterialViewer';

interface LeadMagnetBannerProps {
  onOpenModal?: () => void;
  onOpenFreeMaterials?: () => void;
}

export const LeadMagnetBanner: React.FC<LeadMagnetBannerProps> = ({
  onOpenModal,
  onOpenFreeMaterials,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const guideMaterial = FREE_MATERIALS_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      saveLead(name, email, guideMaterial.title, 'banner_home');
      setIsLoading(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setName('');
  };

  const handleDownloadDoc = () => {
    let content = `=====================================================\nVITAL HORMONAL - CIÊNCIA & CURADORIA FEMININA\n${guideMaterial.title.toUpperCase()}\n${guideMaterial.subtitle}\n=====================================================\n\n`;
    content += `Documento emitido com exclusividade para: ${name || 'Leitora Vital'}\n`;
    content += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    content += `\n${guideMaterial.description}\n\n`;

    guideMaterial.sections.forEach((sec) => {
      content += `\n-----------------------------------------------------\n${sec.title}\n-----------------------------------------------------\n`;
      content += `${sec.description}\n\n`;

      if (sec.items) {
        sec.items.forEach((item) => {
          content += `* ${item.name}${item.tag ? ` [${item.tag}]` : ''}\n`;
          content += `  Detalhe: ${item.details}\n`;
          if (item.actionTip) {
            content += `  Dica Prática: ${item.actionTip}\n`;
          }
          content += `\n`;
        });
      }

      if (sec.table) {
        content += `TABELA:\n`;
        content += sec.table.headers.join(' | ') + '\n';
        content += sec.table.headers.map(() => '---').join(' | ') + '\n';
        sec.table.rows.forEach((row) => {
          content += row.join(' | ') + '\n';
        });
        content += '\n';
      }

      if (sec.checklists) {
        sec.checklists.forEach((chk) => {
          content += `\n[CHECKLIST] ${chk.title}:\n`;
          chk.items.forEach((it) => {
            content += `  [ ] ${it}\n`;
          });
        });
        content += '\n';
      }
    });

    content += `\n=====================================================\nAVISO ÉTICO-MÉDICO:\nEste material possui finalidade educativa e informativa.\nNão substitui a consulta médica individualizada ou prescrição.\nPortal Vital Hormonal • https://vitalhormonal.com.br\n=====================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = guideMaterial.downloadFilename.replace('.pdf', '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section id="lead-magnet-section" className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#26463E] rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-sm border border-[#335b51]">
            {/* Subtle background circular gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C96E56]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#58877b]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Content (7 cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FAEDE7] text-[10px] font-bold uppercase tracking-wider mb-3 border border-white/20">
                  <Sparkles className="w-3 h-3 text-[#C96E56]" />
                  <span>Material Gratuito Completo</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 leading-snug">
                  Checklist dos 7 Sinais da Perimenopausa
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
                  Um guia clínico conciso para identificar se suas alterações de sono,
                  temperamento e metabolismo têm origem hormonal — com a lista dos exames funcionais recomendados.
                </p>

                {/* Checklist benefits bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                    <span>Janela de idade dos 38 aos 48 anos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                    <span>Diferença entre estresse e progesterona</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                    <span>Exames no 21º dia do ciclo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                    <span>Protocolo inicial de 4 nutrientes</span>
                  </div>
                </div>

                {/* Free Materials Hub Link */}
                {onOpenFreeMaterials && (
                  <div className="pt-2">
                    <button
                      onClick={onOpenFreeMaterials}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#FAEDE7] hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 text-[#C96E56]" />
                      <span>Conhecer todos os 3 materiais gratuitos da biblioteca</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Card / Form Box (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white text-[#2D312E] rounded-2xl p-6 sm:p-7 shadow-sm border border-[#E3EBE6]">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#26463E]">
                          Checklist & Guia em PDF
                        </h4>
                        <p className="text-xs text-[#525753] mt-0.5">
                          Cadastre-se para baixar e imprimir gratuitamente.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#26463E] mb-1">
                          Seu Nome:
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Mariana"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#26463E] text-xs sm:text-sm bg-[#F9F7F2] text-[#2D312E] placeholder:text-[#7d837f] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#26463E] mb-1">
                          Seu Melhor E-mail:
                        </label>
                        <input
                          id="lead-email-input"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemplo@email.com"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#26463E] text-xs sm:text-sm bg-[#F9F7F2] text-[#2D312E] placeholder:text-[#7d837f] outline-hidden"
                        />
                      </div>

                      <button
                        id="btn-submit-lead"
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#C96E56] hover:bg-[#b55c45] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Baixar Guia Gratuito</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7d837f]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#58877b]" />
                        <span>Seus dados estão protegidos. Zero spam.</span>
                      </div>
                    </form>
                  ) : (
                    /* Success State */
                    <div className="text-center py-2 space-y-3">
                      <div className="w-11 h-11 bg-[#E3EBE6] text-[#26463E] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-[#26463E]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#26463E]">
                          Acesso Liberado, {name || 'Leitora'}!
                        </h4>
                        <p className="text-xs text-[#525753] mt-0.5">
                          Enviado para <strong>{email}</strong>.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => setIsViewerOpen(true)}
                          className="w-full bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#FAEDE7]" />
                          <span>Imprimir / Salvar em PDF</span>
                        </button>

                        <button
                          onClick={handleDownloadDoc}
                          className="w-full bg-[#F9F7F2] hover:bg-[#E3EBE6] text-[#26463E] text-xs font-semibold py-2 px-3 rounded-xl border border-[#c2d5cd] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C96E56]" />
                          <span>Baixar Arquivo Direto</span>
                        </button>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        {onOpenFreeMaterials && (
                          <button
                            onClick={onOpenFreeMaterials}
                            className="text-[#C96E56] font-semibold hover:underline cursor-pointer text-[11px]"
                          >
                            Outros Materiais
                          </button>
                        )}

                        <button
                          onClick={handleReset}
                          className="text-[#7d837f] hover:underline cursor-pointer text-[11px] ml-auto"
                        >
                          Novo cadastro
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printable Material Viewer */}
      {isViewerOpen && (
        <PrintableMaterialViewer
          material={guideMaterial}
          userName={name}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </>
  );
};
