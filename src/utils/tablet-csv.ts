import Papa from 'papaparse';

/**
 * Gera um nome de arquivo com data e hora atual
 * @returns {string} Nome do arquivo no formato 'YYYY-MM-DD_HH-MM-SS.csv'
 */
const generateFilenameWithDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `exportacao_${day}-${month}-${year}_${hours}-${minutes}-${seconds}.csv`;
};

interface ExportToCsvOptions {
  filename?: string;
  delimiter?: string;
  quotes?: boolean;
}

export const createCsvExporter = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[], 
  options: ExportToCsvOptions = {}
) => {
  const {
    filename = generateFilenameWithDateTime(),
    delimiter = ',',
    quotes = true
  } = options;

  return () => {
    try {
      // Converte dados para CSV usando Papaparse
      const csv = Papa.unparse(data, {
        quotes,
        delimiter
      });

      // Cria um Blob para download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      
      // Cria link de download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      
      // Adiciona ao documento, clica e remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libera memória
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
    }
  };
};
