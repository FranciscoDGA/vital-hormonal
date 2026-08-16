export interface CapturedLead {
  id: string;
  name: string;
  email: string;
  materialName: string;
  source: string;
  capturedAt: string;
}

const STORAGE_KEY = 'vital_hormonal_leads';

export function saveLead(name: string, email: string, materialName: string, source: string = 'website'): CapturedLead {
  const existing = getSavedLeads();
  
  const newLead: CapturedLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim() || 'Leitora',
    email: email.trim().toLowerCase(),
    materialName,
    source,
    capturedAt: new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Erro ao salvar lead:', err);
  }

  return newLead;
}

export function getSavedLeads(): CapturedLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao ler leads:', err);
    return [];
  }
}

export function exportLeadsToCSV(): void {
  const leads = getSavedLeads();
  if (leads.length === 0) {
    alert('Nenhum contato captado até o momento.');
    return;
  }

  const headers = ['ID', 'Nome', 'E-mail', 'Material Solicitado', 'Origem', 'Data e Hora'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.materialName.replace(/"/g, '""')}"`,
    `"${l.source.replace(/"/g, '""')}"`,
    `"${l.capturedAt}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_vital_hormonal_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
