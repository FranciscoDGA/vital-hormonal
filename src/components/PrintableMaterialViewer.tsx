import React, { useRef } from 'react';
import { X, Printer, Download, Sparkles, CheckSquare, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';
import { FreeMaterial } from '../data/freeMaterials';

interface PrintableMaterialViewerProps {
  material: FreeMaterial;
  userName: string;
  onClose: () => void;
}

export const PrintableMaterialViewer: React.FC<PrintableMaterialViewerProps> = ({
  material,
  userName,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDoc = () => {
    // Generate text/markdown formatted downloadable document
    let content = `=====================================================\nVITAL HORMONAL - CIÊNCIA & CURADORIA FEMININA\n${material.title.toUpperCase()}\n${material.subtitle}\n=====================================================\n\n`;
    content += `Documento emitido com exclusividade para: ${userName || 'Leitora Vital'}\n`;
    content += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    content += `\n${material.description}\n\n`;

    material.sections.forEach((sec, idx) => {
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
        content += `TABELA COMPARATIVA:\n`;
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
    <div
      id="printable-material-viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E3EBE6] relative my-auto max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Action Bar (Header) */}
        <div className="bg-[#26463E] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[11px] font-bold text-[#FAEDE7] uppercase tracking-wider block">
                {material.category}
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
                {material.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs border border-white/20"
              title="Imprimir ou Salvar como PDF"
            >
              <Printer className="w-4 h-4 text-[#FAEDE7]" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
              <span className="sm:hidden">Imprimir</span>
            </button>

            <button
              onClick={handleDownloadDoc}
              className="inline-flex items-center gap-1.5 bg-[#C96E56] hover:bg-[#b55c45] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
              title="Baixar Arquivo Estruturado"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div
          ref={printRef}
          id="printable-content"
          className="p-6 sm:p-12 overflow-y-auto flex-1 bg-[#FDFAF7] text-[#2D312E] space-y-8"
        >
          {/* Document Header */}
          <div className="border-b-2 border-[#26463E]/20 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#26463E] text-[#FAEDE7] flex items-center justify-center font-serif font-bold text-sm">
                  V
                </div>
                <span className="font-serif text-lg font-bold text-[#26463E] tracking-tight">
                  Vital Hormonal
                </span>
                <span className="text-[11px] font-semibold text-[#58877b] bg-[#E3EBE6] px-2 py-0.5 rounded-md">
                  Material Clínico & Educativo
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#26463E] leading-tight mt-1">
                {material.title}
              </h1>
              <p className="text-sm text-[#525753] mt-1 font-medium">
                {material.subtitle}
              </p>
            </div>

            <div className="text-xs text-[#525753] bg-white p-3 rounded-xl border border-[#E3EBE6] shrink-0 sm:text-right">
              <span className="block text-[11px] text-[#7d837f] uppercase font-bold">
                Exemplar preparado para:
              </span>
              <strong className="text-[#26463E] block text-sm">
                {userName || 'Leitora Vital'}
              </strong>
              <span className="text-[10px] text-[#7d837f]">
                Curadoria Editorial • VitalHormonal.com.br
              </span>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-[#E3EBE6]/60 p-5 rounded-2xl border border-[#c2d5cd] text-sm text-[#26463E] leading-relaxed">
            <p className="font-medium">{material.description}</p>
          </div>

          {/* Sections Render */}
          {material.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#26463E] border-b border-[#E3EBE6] pb-2 flex items-center gap-2">
                <span>{section.title}</span>
              </h2>
              <p className="text-sm text-[#525753] leading-relaxed">
                {section.description}
              </p>

              {/* Items / Bullet List */}
              {section.items && (
                <div className="space-y-3.5 mt-3">
                  {section.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3EBE6] shadow-2xs space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-[#26463E]">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="text-[11px] font-semibold bg-[#FAEDE7] text-[#C96E56] px-2.5 py-0.5 rounded-full border border-[#fad5ca]">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#525753] leading-relaxed">
                        {item.details}
                      </p>
                      {item.actionTip && (
                        <div className="bg-[#F9F7F2] p-3 rounded-xl border border-[#E3EBE6] text-xs text-[#26463E] font-medium flex items-start gap-2 mt-2">
                          <Sparkles className="w-4 h-4 text-[#C96E56] shrink-0 mt-0.5" />
                          <span>
                            <strong>Recomendação Funcional:</strong> {item.actionTip}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Table Data */}
              {section.table && (
                <div className="overflow-x-auto my-4 bg-white rounded-2xl border border-[#E3EBE6] shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#26463E] text-white">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3EBE6]">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F2]'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 text-[#2D312E] leading-relaxed align-top font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Checklists */}
              {section.checklists && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {section.checklists.map((chk, cIdx) => (
                    <div key={cIdx} className="bg-white p-4 rounded-2xl border border-[#E3EBE6] shadow-2xs space-y-3">
                      <h4 className="font-bold text-xs sm:text-sm text-[#26463E] border-b border-[#E3EBE6] pb-2 flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-[#C96E56]" />
                        <span>{chk.title}</span>
                      </h4>
                      <div className="space-y-2.5">
                        {chk.items.map((it, itIdx) => (
                          <label key={itIdx} className="flex items-start gap-2.5 text-xs text-[#525753] cursor-pointer hover:text-[#26463E]">
                            <input
                              type="checkbox"
                              className="mt-0.5 rounded border-[#c2d5cd] text-[#26463E] focus:ring-[#26463E] w-4 h-4 cursor-pointer"
                            />
                            <span className="leading-snug">{it}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Footer Disclaimer for Printable Doc */}
          <div className="border-t border-[#E3EBE6] pt-6 text-xs text-[#7d837f] space-y-2">
            <div className="flex items-center gap-2 text-[#26463E] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#58877b]" />
              <span>Compromisso Ético e Responsabilidade Científica</span>
            </div>
            <p className="leading-relaxed">
              Este guia foi compilado pela <strong>Redação Vital Hormonal</strong> a partir de revisões sistemáticas e ensaios clínicos (PubMed, NAMS, The Lancet). Destina-se exclusivamente à educação em saúde e auto-observação informada, não substituindo o diagnóstico clínico ou a orientação médica individual.
            </p>
          </div>
        </div>

        {/* Bottom Bar in Viewer */}
        <div className="bg-[#F2F6F4] p-4 px-6 border-t border-[#E3EBE6] flex items-center justify-between gap-4 shrink-0 print:hidden">
          <div className="text-xs text-[#525753] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C96E56]" />
            <span>Documento completo pronto para impressão e estudo diário.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="bg-white hover:bg-[#E3EBE6] text-[#26463E] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#E3EBE6] transition-all cursor-pointer"
            >
              Fechar Leitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
