import React, { useState } from 'react';
import {
  Inbox,
  Plus,
  Search,
  Filter,
  FileText,
  Send,
  Edit2,
  Trash2,
  Eye,
  History,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { SuratMasuk, MasterKlasifikasi, User } from '../../types';
import { formatTanggalIndo, getStatusBadgeClass } from '../../utils/formatter';
import { exportToExcel } from '../../utils/excelExporter';

interface Props {
  suratMasukList: SuratMasuk[];
  klasifikasis: MasterKlasifikasi[];
  currentUser: User;
  onOpenCreate: () => void;
  onEdit: (surat: SuratMasuk) => void;
  onDelete: (id: string) => void;
  onOpenDisposisiModal: (surat: SuratMasuk) => void;
}

export const SuratMasukList: React.FC<Props> = ({
  suratMasukList,
  klasifikasis,
  currentUser,
  onOpenCreate,
  onEdit,
  onDelete,
  onOpenDisposisiModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('semua');
  const [selectedSifat, setSelectedSifat] = useState<string>('semua');
  const [previewSurat, setPreviewSurat] = useState<SuratMasuk | null>(null);
  const [historyModalSurat, setHistoryModalSurat] = useState<SuratMasuk | null>(null);

  // Filtered List
  const filteredList = suratMasukList.filter((s) => {
    const matchSearch =
      s.nomorSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nomorAgenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.asalSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.perihal.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'semua' || s.status === selectedStatus;
    const matchSifat = selectedSifat === 'semua' || s.sifatSurat === selectedSifat;

    return matchSearch && matchStatus && matchSifat;
  });

  const handleExportExcel = () => {
    const exportData = filteredList.map((s) => ({
      'No. Agenda': s.nomorAgenda,
      'Tgl Terima': s.tanggalTerima,
      'Tgl Surat': s.tanggalSurat,
      'No. Surat': s.nomorSurat,
      'Asal Surat': s.asalSurat,
      'Perihal': s.perihal,
      'Sifat': s.sifatSurat,
      'Klasifikasi': s.klasifikasiKode,
      'Status': s.status,
      'Disposisi Count': s.disposisiCount,
      'Petugas': s.petugasInput
    }));
    exportToExcel(exportData, 'Laporan_Surat_Masuk', 'Surat Masuk');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-2xl">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Surat Masuk Digital</h1>
            <p className="text-xs text-slate-500">Pencatatan, pengarsipan, dan disposisi naskah dinas masuk</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Excel
          </button>
          
          {(currentUser.role === 'Administrator' || currentUser.role === 'Operator' || currentUser.role === 'Sekretaris') && (
            <button
              onClick={onOpenCreate}
              className="px-4 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Catat Surat Masuk
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor, perihal, asal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          >
            <option value="semua">Semua Status</option>
            <option value="Diterima">Diterima</option>
            <option value="Disposisi">Disposisi</option>
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>

          <select
            value={selectedSifat}
            onChange={(e) => setSelectedSifat(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          >
            <option value="semua">Semua Sifat Surat</option>
            <option value="Biasa">Biasa</option>
            <option value="Penting">Penting</option>
            <option value="Rahasia">Rahasia</option>
            <option value="Sangat Rahasia">Sangat Rahasia</option>
          </select>
        </div>

      </div>

      {/* Main Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Agenda & Tanggal</th>
                <th className="py-3.5 px-4">Nomor & Asal Surat</th>
                <th className="py-3.5 px-4">Perihal & Klasifikasi</th>
                <th className="py-3.5 px-4">Sifat</th>
                <th className="py-3.5 px-4">Status & Disposisi</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada data Surat Masuk yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((surat) => (
                  <tr key={surat.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Agenda & Tanggal */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-mono font-bold text-sky-700 dark:text-sky-400">{surat.nomorAgenda}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Terima: {formatTanggalIndo(surat.tanggalTerima)}</p>
                    </td>

                    {/* Nomor & Asal Surat */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{surat.nomorSurat}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{surat.asalSurat}</p>
                      <p className="text-[10px] text-slate-400">Surat: {formatTanggalIndo(surat.tanggalSurat)}</p>
                    </td>

                    {/* Perihal & Klasifikasi */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">{surat.perihal}</p>
                      <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {surat.klasifikasiKode}
                      </span>
                    </td>

                    {/* Sifat */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        surat.sifatSurat === 'Sangat Rahasia' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        surat.sifatSurat === 'Rahasia' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                        surat.sifatSurat === 'Penting' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {surat.sifatSurat}
                      </span>
                    </td>

                    {/* Status & Disposisi */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeClass(surat.status)}`}>
                          {surat.status}
                        </span>
                        <p className="text-[10px] text-slate-500">
                          Disposisi: <b>{surat.disposisiCount}x</b>
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Scan Preview */}
                        <button
                          onClick={() => setPreviewSurat(surat)}
                          title="Lihat Scan Surat"
                          className="p-1.5 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/60 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Send Disposisi */}
                        {(currentUser.role === 'Pimpinan' || currentUser.role === 'Kepala Bagian' || currentUser.role === 'Operator' || currentUser.role === 'Administrator') && (
                          <button
                            onClick={() => onOpenDisposisiModal(surat)}
                            title="Buat Disposisi"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}

                        {/* Log History */}
                        <button
                          onClick={() => setHistoryModalSurat(surat)}
                          title="Riwayat Audit Log"
                          className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <History className="w-4 h-4" />
                        </button>

                        {/* Edit & Delete */}
                        {(currentUser.role === 'Administrator' || currentUser.role === 'Operator') && (
                          <>
                            <button
                              onClick={() => onEdit(surat)}
                              title="Edit Surat"
                              className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus pencatatan surat masuk ${surat.nomorSurat}?`)) {
                                  onDelete(surat.id);
                                }
                              }}
                              title="Hapus"
                              className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Scan Viewer Modal */}
      {previewSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Preview Scan Naskah Surat Masuk</h3>
                <p className="text-xs text-slate-400">{previewSurat.nomorSurat} - {previewSurat.asalSurat}</p>
              </div>
              <button onClick={() => setPreviewSurat(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-4 overflow-hidden">
              {previewSurat.filePdfUrl ? (
                <iframe
                  src={previewSurat.filePdfUrl}
                  title="PDF Preview"
                  className="w-full h-full rounded-xl border border-slate-300 dark:border-slate-800"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FileText className="w-12 h-12 mb-2" />
                  <p className="text-sm">Tidak ada file scan yang diunggah untuk surat ini.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* History Log Viewer Modal */}
      {historyModalSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Riwayat Naskah Surat</h3>
              <button onClick={() => setHistoryModalSurat(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {historyModalSurat.historyLog.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada catatan riwayat terdaftar.</p>
              ) : (
                historyModalSurat.historyLog.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{log.userNama} ({log.userRole})</span>
                      <span className="text-[10px] text-slate-400">{log.timestamp.slice(0, 10)}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{log.deskripsi}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
