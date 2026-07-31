import React, { useState } from 'react';
import {
  GitPullRequest,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { Disposisi, User } from '../../types';
import { formatTanggalIndo, getPrioritasBadgeClass, getStatusBadgeClass } from '../../utils/formatter';
import { exportToExcel } from '../../utils/excelExporter';

interface Props {
  disposisiList: Disposisi[];
  currentUser: User;
  onOpenCreate: () => void;
  onCompleteDisposisi: (id: string, balasan: string) => void;
}

export const DisposisiList: React.FC<Props> = ({
  disposisiList,
  currentUser,
  onOpenCreate,
  onCompleteDisposisi
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [activeCompleteModal, setActiveCompleteModal] = useState<Disposisi | null>(null);
  const [balasanText, setBalasanText] = useState('');

  const filtered = disposisiList.filter((d) => {
    const matchSearch =
      d.nomorSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.penerimaNama.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'semua' || d.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const handleSaveBalasan = () => {
    if (!activeCompleteModal || !balasanText.trim()) return;
    onCompleteDisposisi(activeCompleteModal.id, balasanText);
    setBalasanText('');
    setActiveCompleteModal(null);
  };

  const handleExportExcel = () => {
    const exportData = filtered.map((d) => ({
      'No. Surat': d.nomorSurat,
      'Perihal': d.perihal,
      'Pengirim': d.pengirimNama,
      'Penerima': d.penerimaNama,
      'Instruksi': d.instruksi,
      'Prioritas': d.prioritas,
      'Deadline': d.deadline,
      'Status': d.status,
      'Laporan Balasan': d.balasanDisposisi || '-'
    }));
    exportToExcel(exportData, 'Laporan_Disposisi_Surat', 'Disposisi');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tracking Disposisi Surat</h1>
            <p className="text-xs text-slate-500">Pemantauan tindak lanjut dan penyelesaian instruksi pimpinan</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Excel
          </button>

          {(currentUser.role === 'Pimpinan' || currentUser.role === 'Kepala Bagian' || currentUser.role === 'Operator' || currentUser.role === 'Administrator') && (
            <button
              onClick={onOpenCreate}
              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Disposisi Baru
            </button>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor, penerima, perihal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
        >
          <option value="semua">Semua Status Disposisi</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Dalam Proses">Dalam Proses</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Nomor & Perihal</th>
                <th className="py-3.5 px-4">Pengirim & Penerima</th>
                <th className="py-3.5 px-4">Instruksi & Catatan</th>
                <th className="py-3.5 px-4">Prioritas & Deadline</th>
                <th className="py-3.5 px-4">Status & Laporan</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada lembar disposisi terdaftar.
                  </td>
                </tr>
              ) : (
                filtered.map((disp) => (
                  <tr key={disp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Nomor & Perihal */}
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-sky-700 dark:text-sky-400">{disp.nomorSurat}</p>
                      <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2 mt-0.5">{disp.perihal}</p>
                    </td>

                    {/* Pengirim & Penerima */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="text-[11px] text-slate-500">Dari: {disp.pengirimNama}</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100">Kepada: {disp.penerimaNama}</p>
                    </td>

                    {/* Instruksi */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400">{disp.instruksi}</p>
                      {disp.catatanTambahan && (
                        <p className="text-slate-500 text-[11px] line-clamp-1 italic mt-0.5">"{disp.catatanTambahan}"</p>
                      )}
                    </td>

                    {/* Prioritas & Deadline */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${getPrioritasBadgeClass(disp.prioritas)}`}>
                        {disp.prioritas}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Deadline: {formatTanggalIndo(disp.deadline)}
                      </p>
                    </td>

                    {/* Status & Laporan */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(disp.status)}`}>
                        {disp.status}
                      </span>
                      {disp.balasanDisposisi && (
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 truncate max-w-[140px]">
                          Laporan: {disp.balasanDisposisi}
                        </p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {disp.status !== 'Selesai' && (
                        <button
                          onClick={() => setActiveCompleteModal(disp)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Laporkan Selesai
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completion Response Input Modal */}
      {activeCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" /> Input Laporan Hasil Disposisi
              </h3>
              <button onClick={() => setActiveCompleteModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Laporan pelaksanaan instruksi untuk surat nomor: <b>{activeCompleteModal.nomorSurat}</b>
              </p>
              <textarea
                rows={4}
                value={balasanText}
                onChange={(e) => setBalasanText(e.target.value)}
                placeholder="Tuliskan tindak lanjut dan hasil pelaksanaan disposisi..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveCompleteModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveBalasan}
                  className="px-4 py-1.5 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                >
                  Simpan Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
