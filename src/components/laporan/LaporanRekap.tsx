import React, { useState } from 'react';
import {
  FileCheck,
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  BarChart2
} from 'lucide-react';
import { SuratMasuk, SuratKeluar, Disposisi } from '../../types';
import { formatTanggalIndo } from '../../utils/formatter';
import { exportToExcel } from '../../utils/excelExporter';

interface Props {
  suratMasukList: SuratMasuk[];
  suratKeluarList: SuratKeluar[];
  disposisiList: Disposisi[];
}

export const LaporanRekapView: React.FC<Props> = ({
  suratMasukList,
  suratKeluarList,
  disposisiList
}) => {
  const [reportType, setReportType] = useState<'masuk' | 'keluar' | 'disposisi'>('masuk');
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const handleExportExcel = () => {
    if (reportType === 'masuk') {
      const data = suratMasukList.map((s) => ({
        'Agenda': s.nomorAgenda,
        'Nomor Surat': s.nomorSurat,
        'Tgl Terima': s.tanggalTerima,
        'Asal Surat': s.asalSurat,
        'Perihal': s.perihal,
        'Sifat': s.sifatSurat,
        'Status': s.status
      }));
      exportToExcel(data, `Laporan_Surat_Masuk_${startDate}_to_${endDate}`, 'Surat Masuk');
    } else if (reportType === 'keluar') {
      const data = suratKeluarList.map((s) => ({
        'Nomor Surat': s.nomorSurat,
        'Tanggal': s.tanggal,
        'Tujuan': s.tujuan,
        'Perihal': s.perihal,
        'Penandatangan': s.penandatanganNama,
        'Status': s.status
      }));
      exportToExcel(data, `Laporan_Surat_Keluar_${startDate}_to_${endDate}`, 'Surat Keluar');
    } else {
      const data = disposisiList.map((d) => ({
        'Nomor Surat': d.nomorSurat,
        'Perihal': d.perihal,
        'Pengirim': d.pengirimNama,
        'Penerima': d.penerimaNama,
        'Instruksi': d.instruksi,
        'Status': d.status
      }));
      exportToExcel(data, `Laporan_Disposisi_${startDate}_to_${endDate}`, 'Disposisi');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-2xl">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Laporan & Rekapitulasi Eksekutif</h1>
            <p className="text-xs text-slate-500">Cetak rekapitulasi persuratan berkala untuk pimpinan (PDF & Excel)</p>
          </div>
        </div>

        <button
          onClick={handleExportExcel}
          className="px-4 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" /> Unduh Laporan Excel
        </button>
      </div>

      {/* Filter Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            >
              <option value="masuk">Laporan Surat Masuk</option>
              <option value="keluar">Laporan Surat Keluar</option>
              <option value="disposisi">Laporan Disposisi Surat</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Awal (Periode)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Akhir (Periode)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>

      </div>

      {/* Data Table Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-xs uppercase text-slate-700 dark:text-slate-300">
            Pratinjau Data Laporan ({reportType === 'masuk' ? 'Surat Masuk' : reportType === 'keluar' ? 'Surat Keluar' : 'Disposisi'})
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Periode: {formatTanggalIndo(startDate)} s/d {formatTanggalIndo(endDate)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nomor Naskah</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Asal / Tujuan / Penerima</th>
                <th className="py-3 px-4">Perihal</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {reportType === 'masuk' &&
                suratMasukList.map((sm, idx) => (
                  <tr key={sm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-sky-600">{sm.nomorSurat}</td>
                    <td className="py-3 px-4">{formatTanggalIndo(sm.tanggalTerima)}</td>
                    <td className="py-3 px-4 font-semibold">{sm.asalSurat}</td>
                    <td className="py-3 px-4">{sm.perihal}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-bold">{sm.status}</span></td>
                  </tr>
                ))}

              {reportType === 'keluar' &&
                suratKeluarList.map((sk, idx) => (
                  <tr key={sk.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-teal-600">{sk.nomorSurat}</td>
                    <td className="py-3 px-4">{formatTanggalIndo(sk.tanggal)}</td>
                    <td className="py-3 px-4 font-semibold">{sk.tujuan}</td>
                    <td className="py-3 px-4">{sk.perihal}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-bold">{sk.status}</span></td>
                  </tr>
                ))}

              {reportType === 'disposisi' &&
                disposisiList.map((d, idx) => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{d.nomorSurat}</td>
                    <td className="py-3 px-4">{d.tanggalDisposisi}</td>
                    <td className="py-3 px-4 font-semibold">{d.penerimaNama}</td>
                    <td className="py-3 px-4">{d.instruksi}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-bold">{d.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
