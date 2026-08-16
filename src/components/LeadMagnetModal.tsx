import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Download, Sparkles, ShieldCheck, Printer, ArrowRight, FileText } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';
import { FREE_MATERIALS_DATA } from '../data/freeMaterials';
import { PrintableMaterialViewer } from './PrintableMaterialViewer';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFreeMaterials?: () => void;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({
  isOpen,
  onClose,
  onOpenFreeMaterials,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const guideMaterial = FREE_MATERIALS_DATA[0]; // Guia 7 Sinais

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveLead(name, email, guideMaterial.title, 'modal_guia_7_sinais');
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 450);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail('');
    setName('');
    setIsViewerOpen(false);
    onClose();
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
      <div
        id="lead-magnet-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      >
        <div
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3EBE6] relative overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            id="close-guide-modal"
            onClick={handleClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 p-2 text-[#7d837f] hover:text-[#2D312E] rounded-full hover:bg-[#F9F7F2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C96E56]/15 text-[#C96E56] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Download Imediato em PDF</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] mb-2 leading-tight">
                Checklist dos 7 Sinais da Perimenopausa
              </h3>

              <p className="text-xs sm:text-sm text-[#525753] leading-relaxed mb-5">
                Receba o manual prático para entender o que está acontecendo com seu corpo,
                quais exames hormonais solicitar e quais nutrientes funcionais priorizar.
              </p>

              {/* Benefit Bullets */}
              <div className="space-y-2 mb-6 bg-[#F9F7F2] p-4 rounded-2xl border border-[#E3EBE6] text-xs text-[#2D312E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                  <span>Roteiro de exames para o 21º dia do ciclo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                  <span>Tabela dos 4 tipos de magnésio e como usar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96E56] shrink-0" />
                  <span>Estratégia para regular o sono sem sedativos</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26463E] mb-1">
                    Seu Primeiro Nome:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mariana"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#26463E] focus:border-transparent text-sm bg-[#F9F7F2] text-[#2D312E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26463E] mb-1">
                    Seu Melhor E-mail:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2d5cd] focus:ring-2 focus:ring-[#26463E] focus:border-transparent text-sm bg-[#F9F7F2] text-[#2D312E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#C96E56] hover:bg-[#b55c45] text-white text-sm font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Liberar & Baixar Guia Gratuito</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7d837f] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#58877b]" />
                  <span>Seus dados estão protegidos. Zero spam.</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-[#E3EBE6] text-[#26463E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#26463E]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#26463E]">
                Pronto, {name || 'Leitora'}!
              </h3>
              <p className="text-xs sm:text-sm text-[#525753]">
                Seu acesso ao <strong>Checklist dos 7 Sinais</strong> foi registrado para <strong>{email}</strong>.
              </p>

              {/* Action Buttons for Download and Print */}
              <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#E3EBE6] space-y-2.5 text-left">
                <span className="text-[11px] font-bold text-[#26463E] uppercase tracking-wider block">
                  Escolha como deseja acessar agora:
                </span>

                <button
                  onClick={() => setIsViewerOpen(true)}
                  className="w-full bg-[#26463E] hover:bg-[#1b332d] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#FAEDE7]" />
                  <span>Visualizar & Imprimir / Salvar PDF</span>
                </button>

                <button
                  onClick={handleDownloadDoc}
                  className="w-full bg-white hover:bg-[#E3EBE6] text-[#26463E] text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl border border-[#c2d5cd] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#C96E56]" />
                  <span>Baixar Arquivo Estruturado</span>
                </button>
              </div>

              {onOpenFreeMaterials && (
                <button
                  onClick={() => {
                    handleClose();
                    onOpenFreeMaterials();
                  }}
                  className="w-full text-xs text-[#58877b] hover:text-[#26463E] font-semibold flex items-center justify-center gap-1 cursor-pointer pt-1"
                >
                  <span>Ver outros 2 materiais gratuitos disponíveis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleClose}
                className="w-full text-xs text-[#7d837f] hover:text-[#2D312E] py-2 transition-colors cursor-pointer"
              >
                Voltar ao Portal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Printable Material Viewer */}
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
