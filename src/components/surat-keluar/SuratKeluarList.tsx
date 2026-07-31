import React, { useState } from 'react';
import {
  Send,
  Plus,
  Search,
  Filter,
  FileText,
  ShieldCheck,
  Download,
  Edit2,
  Trash2,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { SuratKeluar, MasterInstansi, MasterKlasifikasi, User } from '../../types';
import { formatTanggalIndo, getStatusBadgeClass } from '../../utils/formatter';
import { generateLetterPdf } from '../../utils/pdfGenerator';
import { exportToExcel } from '../../utils/excelExporter';

interface Props {
  suratKeluarList: SuratKeluar[];
  instansi: MasterInstansi;
  klasifikasis: MasterKlasifikasi[];
  currentUser: User;
  onOpenCreate: () => void;
  onEdit: (surat: SuratKeluar) => void;
  onDelete: (id: string) => void;
  onOpenApprovalModal: (surat: SuratKeluar) => void;
}

export const SuratKeluarList: React.FC<Props> = ({
  suratKeluarList,
  instansi,
  klasifikasis,
  currentUser,
  onOpenCreate,
  onEdit,
  onDelete,
  onOpenApprovalModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [previewSurat, setPreviewSurat] = useState<SuratKeluar | null>(null);

  const filteredList = suratKeluarList.filter((s) => {
    const matchSearch =
      s.nomorSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.perihal.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'semua' || s.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const handleDownloadPdf = async (surat: SuratKeluar) => {
    await generateLetterPdf(surat, instansi, { autoDownload: true });
  };

  const handlePrintPdf = async (surat: SuratKeluar) => {
    await generateLetterPdf(surat, instansi, { printWindow: true });
  };

  const handleExportExcel = () => {
    const exportData = filteredList.map((s) => ({
      'No. Surat': s.nomorSurat,
      'Tanggal': s.tanggal,
      'Jenis Surat': s.jenisSurat,
      'Tujuan': s.tujuan,
      'Perihal': s.perihal,
      'Penandatangan': s.penandatanganNama,
      'Status': s.status,
      'Tahapan Approval': s.currentApprovalStage,
      'TTD Digital': s.ttdDigitalApplied ? 'Ya' : 'Tidak',
      'Pembuat': s.created_by
    }));
    exportToExcel(exportData, 'Laporan_Surat_Keluar', 'Surat Keluar');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Surat Keluar & Penomoran</h1>
            <p className="text-xs text-slate-500">Drafting naskah dinas, penomoran otomatis, & persetujuan TTD digital</p>
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
              <Plus className="w-4 h-4" /> Buat Surat Keluar
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor, tujuan, perihal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          >
            <option value="semua">Semua Status</option>
            <option value="Draft">Draft</option>
            <option value="Review">Menunggu Review</option>
            <option value="Disetujui">Disetujui (Final)</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Nomor & Tanggal</th>
                <th className="py-3.5 px-4">Tujuan & Perihal</th>
                <th className="py-3.5 px-4">Penandatangan</th>
                <th className="py-3.5 px-4">Approval Stage</th>
                <th className="py-3.5 px-4">Status & TTD</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada Surat Keluar terdaftar.
                  </td>
                </tr>
              ) : (
                filteredList.map((surat) => (
                  <tr key={surat.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Nomor & Tanggal */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-mono font-bold text-sky-700 dark:text-sky-400">{surat.nomorSurat}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{formatTanggalIndo(surat.tanggal)}</p>
                      <span className="inline-block text-[10px] font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                        {surat.jenisSurat}
                      </span>
                    </td>

                    {/* Tujuan & Perihal */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{surat.tujuan}</p>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">{surat.perihal}</p>
                    </td>

                    {/* Penandatangan */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{surat.penandatanganNama}</p>
                      <p className="text-[10px] text-slate-500">{surat.penandatanganJabatan}</p>
                    </td>

                    {/* Approval Stage */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[10px] border border-slate-200 dark:border-slate-700">
                        {surat.currentApprovalStage}
                      </span>
                    </td>

                    {/* Status & TTD Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(surat.status)}`}>
                          {surat.status}
                        </span>
                        {surat.ttdDigitalApplied && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> TTD Digital Verified
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Approval Action */}
                        {surat.status === 'Review' && (
                          <button
                            onClick={() => onOpenApprovalModal(surat)}
                            title="Proses Approval"
                            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-lg transition-colors border border-amber-200 animate-pulse"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                        )}

                        {/* PDF Download */}
                        <button
                          onClick={() => handleDownloadPdf(surat)}
                          title="Unduh PDF Resmi"
                          className="p-1.5 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/60 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {/* Print */}
                        <button
                          onClick={() => handlePrintPdf(surat)}
                          title="Cetak Naskah"
                          className="p-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Edit & Delete */}
                        {(currentUser.role === 'Administrator' || currentUser.role === 'Operator' || currentUser.role === 'Sekretaris') && (
                          <>
                            <button
                              onClick={() => onEdit(surat)}
                              title="Edit Draft"
                              className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus surat keluar ${surat.nomorSurat}?`)) {
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

    </div>
  );
};
