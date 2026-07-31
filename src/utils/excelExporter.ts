import * as XLSX from 'xlsx';

export function exportToExcel(data: Record<string, any>[], filename: string, sheetName: string = 'Laporan') {
  if (!data || data.length === 0) {
    alert('Tidak ada data yang dapat diekspor.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Auto-fit columns
  const maxWidths: number[] = [];
  data.forEach((row) => {
    Object.keys(row).forEach((key, colIdx) => {
      const valStr = String(row[key] ?? '');
      maxWidths[colIdx] = Math.max(maxWidths[colIdx] || 10, valStr.length + 3);
    });
  });
  worksheet['!cols'] = maxWidths.map((w) => ({ wch: Math.min(w, 50) }));

  XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
