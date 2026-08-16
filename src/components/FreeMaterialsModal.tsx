import React, { useState } from 'react';
import { X, Sparkles, Download, CheckCircle2, ShieldCheck, BookOpen, FileText, ArrowRight, Eye, Printer, Lock, Unlock } from 'lucide-react';
import { FREE_MATERIALS_DATA, FreeMaterial } from '../data/freeMaterials';
import { saveLead } from '../utils/leadStorage';
import { PrintableMaterialViewer } from './PrintableMaterialViewer';

interface FreeMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMaterialId?: string;
}

export const FreeMaterialsModal: React.FC<FreeMaterialsModalProps> = ({
  isOpen,
  onClose,
  initialMaterialId,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<FreeMaterial>(() => {
    const found = FREE_MATERIALS_DATA.find((m) => m.id === initialMaterialId);
    return found || FREE_MATERIALS_DATA[0];
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeViewerMaterial, setActiveViewerMaterial] = useState<FreeMaterial | null>(null);

  if (!isOpen) return null;

  const handleCaptureAndUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveLead(name, email, selectedMaterial.title, 'modal_materiais_gratuitos');
      setIsSubmitting(false);
      setIsUnlocked(true);
    }, 450);
  };

  const handleOpenViewer = (material: FreeMaterial) => {
    if (!isUnlocked) {
      // Focus form
      return;
    }
    setActiveViewerMaterial(material);
  };

  const handleDownloadDirect = (material: FreeMaterial) => {
    // Generate text/doc download
    let content = `=====================================================\nVITAL HORMONAL - CIÊNCIA & CURADORIA FEMININA\n${material.title.toUpperCase()}\n${material.subtitle}\n=====================================================\n\n`;
    content += `Documento emitido para: ${name || 'Leitora Vital'}\n`;
    content += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    content += `\n${material.description}\n\n`;

    material.sections.forEach((sec) => {
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
    link.download = material.downloadFilename.replace('.pdf', '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        id="free-materials-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      >
        <div
          className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E3EBE6] relative my-auto max-h-[92vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#26463E] text-white p-5 sm:p-7 flex items-center justify-between gap-4 shrink-0">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FAEDE7] text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C96E56]" />
                <span>Central de Materiais & Downloads Gratuitos</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                Biblioteca Prática de Saúde Hormonal Feminina
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Guias clínicos, checklists e tabelas de suplementação baseadas em evidências para imprimir ou salvar no seu celular.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Grid Content */}
          <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-[#F9F7F2]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Material Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#26463E] mb-2">
                  Escolha um Material:
                </h3>

                {FREE_MATERIALS_DATA.map((mat) => {
                  const isCurrent = mat.id === selectedMaterial.id;
                  return (
                    <div
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                        isCurrent
                          ? 'bg-white border-[#26463E] shadow-sm ring-1 ring-[#26463E]'
                          : 'bg-white/70 border-[#E3EBE6] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#C96E56] uppercase tracking-wider">
                          {mat.badge}
                        </span>
                        <span className="text-[10px] text-[#7d837f] font-medium">
                          {mat.pagesCount}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#26463E] leading-snug">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-[#525753] line-clamp-2 leading-relaxed">
                        {mat.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Material Details & Download/Unlock Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EBE6] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#58877b] bg-[#E3EBE6] px-2.5 py-1 rounded-full">
                      {selectedMaterial.category}
                    </span>
                    <span className="text-xs text-[#7d837f] font-medium">
                      {selectedMaterial.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#26463E] mb-2 leading-tight">
                    {selectedMaterial.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#525753] leading-relaxed mb-4">
                    {selectedMaterial.description}
                  </p>

                  {/* Highlights Bullets */}
                  <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#E3EBE6] space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#26463E] block">
                      O que você encontrará neste material:
                    </span>
                    {selectedMaterial.keyBenefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#2D312E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C96E56] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form or Unlocked Action Area */}
                {!isUnlocked ? (
                  <form onSubmit={handleCaptureAndUnlock} className="space-y-3 pt-2 border-t border-[#E3EBE6]">
                    <div className="flex items-center gap-1.5 text-xs text-[#26463E] font-bold">
                      <Lock className="w-4 h-4 text-[#C96E56]" />
                      <span>Informe seu nome e e-mail para liberar o download e impressão:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#26463E] mb-1">
                          Seu Nome:
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Claudia"
                          className="w-full px-3 py-2 rounded-xl border border-[#c2d5cd] text-xs sm:text-sm bg-[#F9F7F2] text-[#2D312E] focus:ring-2 focus:ring-[#26463E] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#26463E] mb-1">
                          Seu E-mail:
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className="w-full px-3 py-2 rounded-xl border border-[#c2d5cd] text-xs sm:text-sm bg-[#F9F7F2] text-[#2D312E] focus:ring-2 focus:ring-[#26463E] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C96E56] hover:bg-[#b55c45] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Unlock className="w-4 h-4" />
                          <span>Liberar Todos os Materiais Imediatamente</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7d837f]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#58877b]" />
                      <span>Zero spam. Acesso 100% gratuito e seguro.</span>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3 pt-4 border-t border-[#E3EBE6] bg-[#F2F6F4] p-4 rounded-2xl border border-[#c2d5cd]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#26463E]">
                      <CheckCircle2 className="w-4 h-4 text-[#58877b]" />
                      <span>Acesso Liberado para {name || 'Leitora'} ({email})</span>
                    </div>

                    <p className="text-xs text-[#525753] leading-relaxed">
                      Você pode visualizar e imprimir o documento formatado em alta definição ou baixar o arquivo estruturado.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => handleOpenViewer(selectedMaterial)}
                        className="bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold py-2.5 px-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#FAEDE7]" />
                        <span>Abrir & Imprimir / Salvar PDF</span>
                      </button>

                      <button
                        onClick={() => handleDownloadDirect(selectedMaterial)}
                        className="bg-white hover:bg-[#E3EBE6] text-[#26463E] text-xs font-semibold py-2.5 px-3.5 rounded-xl border border-[#c2d5cd] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C96E56]" />
                        <span>Baixar Arquivo</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-white p-3.5 px-6 border-t border-[#E3EBE6] flex items-center justify-between text-xs text-[#7d837f]">
            <span>Portal Vital Hormonal • Curadoria Científica & Autonomia</span>
            <button
              onClick={onClose}
              className="text-[#26463E] hover:underline font-semibold cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Printable Material Viewer Modal */}
      {activeViewerMaterial && (
        <PrintableMaterialViewer
          material={activeViewerMaterial}
          userName={name}
          onClose={() => setActiveViewerMaterial(null)}
        />
      )}
    </>
  );
};
