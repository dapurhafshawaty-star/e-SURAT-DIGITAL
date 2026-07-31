export function formatTanggalIndo(dateStr: string | Date): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function formatDateTimeIndo(dateTimeStr: string): string {
  if (!dateTimeStr) return '-';
  const d = new Date(dateTimeStr);
  if (isNaN(d.getTime())) return dateTimeStr;
  
  const formattedDate = formatTanggalIndo(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${formattedDate} ${hours}:${minutes} WIB`;
}

export function getAngkaRomawiBulan(monthIndex: number): string {
  const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  return romanMonths[monthIndex] || 'I';
}

export function formatNomorSuratOtomatis(
  nextNumber: number,
  kodeKlasifikasi: string,
  kodeInstansi: string,
  date: Date = new Date(),
  customFormat?: string
): string {
  const urutStr = String(nextNumber).padStart(3, '0');
  const bulanRomawi = getAngkaRomawiBulan(date.getMonth());
  const tahun = date.getFullYear();

  const pattern = customFormat || "{URUT}/{KODE_SURAT}/{KODE_INSTANSI}/{BULAN_ROMAWI}/{TAHUN}";

  return pattern
    .replace('{URUT}', urutStr)
    .replace('{KODE_SURAT}', kodeKlasifikasi || 'ADM')
    .replace('{KODE_INSTANSI}', kodeInstansi || 'GOV')
    .replace('{BULAN_ROMAWI}', bulanRomawi)
    .replace('{TAHUN}', String(tahun));
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Disetujui':
    case 'Selesai':
    case 'Aktif':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    case 'Disposisi':
    case 'Review':
    case 'Proses':
    case 'Dalam Proses':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    case 'Draft':
    case 'Diterima':
    case 'Menunggu':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    case 'Ditolak':
    case 'Nonaktif':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    case 'Terkirim':
    case 'Diarsipkan':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  }
}

export function getPrioritasBadgeClass(prioritas: string): string {
  switch (prioritas) {
    case 'Sangat Segera':
      return 'bg-red-600 text-white font-semibold animate-pulse';
    case 'Segera':
      return 'bg-rose-500 text-white font-medium';
    case 'Penting':
      return 'bg-amber-500 text-white font-medium';
    default:
      return 'bg-slate-500 text-white font-normal';
  }
}
