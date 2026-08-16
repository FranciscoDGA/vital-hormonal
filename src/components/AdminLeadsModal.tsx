import React, { useState, useEffect } from 'react';
import { X, Users, Download, Trash2, Mail, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import { getSavedLeads, exportLeadsToCSV, CapturedLead } from '../utils/leadStorage';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<CapturedLead[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLeads(getSavedLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar a lista local de contatos?')) {
      localStorage.removeItem('vital_hormonal_leads');
      setLeads([]);
    }
  };

  const handleRefresh = () => {
    setLeads(getSavedLeads());
  };

  return (
    <div
      id="admin-leads-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E3EBE6] relative max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#26463E] text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FAEDE7]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  Painel de Contatos & Leads Captados
                </h3>
                <span className="bg-[#C96E56] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {leads.length} {leads.length === 1 ? 'contato' : 'contatos'}
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Usuários que solicitaram os materiais gratuitos e checklists do portal.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="bg-[#F2F6F4] p-3 px-6 border-b border-[#E3EBE6] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="text-xs text-[#26463E] hover:bg-[#E3EBE6] px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Atualizar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <>
                <button
                  onClick={exportLeadsToCSV}
                  className="bg-[#26463E] hover:bg-[#1b332d] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#FAEDE7]" />
                  <span>Exportar Planilha (CSV)</span>
                </button>

                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  title="Limpar todos os registros"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Leads Table / List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#F9F7F2]">
          {leads.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E3EBE6] text-[#7d837f] flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#26463E]">
                Nenhum contato cadastrado ainda
              </h4>
              <p className="text-xs text-[#525753] max-w-sm mx-auto">
                Assim que as leitoras preencherem o formulário para baixar o Guia ou materiais, os e-mails e nomes aparecerão aqui em tempo real.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E3EBE6] overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E3EBE6]/60 text-[#26463E] font-bold border-b border-[#E3EBE6]">
                  <tr>
                    <th className="p-3.5">Nome</th>
                    <th className="p-3.5">E-mail</th>
                    <th className="p-3.5 hidden sm:table-cell">Material Solicitado</th>
                    <th className="p-3.5 text-right">Data & Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3EBE6]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F9F7F2] transition-colors">
                      <td className="p-3.5 font-bold text-[#26463E] whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="p-3.5 text-[#525753] font-medium flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#7d837f] shrink-0" />
                        <span className="break-all">{lead.email}</span>
                      </td>
                      <td className="p-3.5 text-[#525753] hidden sm:table-cell">
                        <span className="bg-[#F2F6F4] text-[#26463E] px-2 py-0.5 rounded-md text-[11px] font-semibold border border-[#E3EBE6]">
                          {lead.materialName}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#7d837f] text-right whitespace-nowrap text-[11px]">
                        {lead.capturedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white p-3.5 px-6 border-t border-[#E3EBE6] flex items-center justify-between text-xs text-[#7d837f]">
          <span>Armazenamento local seguro do navegador</span>
          <button
            onClick={onClose}
            className="bg-[#26463E] text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-[#1b332d] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
