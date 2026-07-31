import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  Search,
  Download,
  Eye,
  Archive,
  HardDrive
} from 'lucide-react';
import { SuratMasuk, SuratKeluar } from '../../types';
import { formatTanggalIndo } from '../../utils/formatter';

interface Props {
  suratMasukList: SuratMasuk[];
  suratKeluarList: SuratKeluar[];
}

export const ArsipDigitalView: React.FC<Props> = ({ suratMasukList, suratKeluarList }) => {
  const [selectedFolder, setSelectedFolder] = useState<'masuk' | 'keluar' | 'semua'>('semua');
  const [searchTerm, setSearchTerm] = useState('');

  const allArchive = [
    ...suratMasukList.map((sm) => ({
      id: sm.id,
      kategori: 'Surat Masuk' as const,
      nomor: sm.nomorSurat,
      agenda: sm.nomorAgenda,
      tanggal: sm.tanggalTerima,
      perihal: sm.perihal,
      sifat: sm.sifatSurat,
      asalTujuan: sm.asalSurat,
      pdfUrl: sm.filePdfUrl
    })),
    ...suratKeluarList.map((sk) => ({
      id: sk.id,
      kategori: 'Surat Keluar' as const,
      nomor: sk.nomorSurat,
      agenda: sk.klasifikasiKode,
      tanggal: sk.tanggal,
      perihal: sk.perihal,
      sifat: sk.jenisSurat,
      asalTujuan: sk.tujuan,
      pdfUrl: undefined
    }))
  ];

  const filteredArchive = allArchive.filter((item) => {
    const matchFolder =
      selectedFolder === 'semua' ||
      (selectedFolder === 'masuk' && item.kategori === 'Surat Masuk') ||
      (selectedFolder === 'keluar' && item.kategori === 'Surat Keluar');

    const matchSearch =
      item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.asalTujuan.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFolder && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Arsip Digital & Berkas Surat</h1>
            <p className="text-xs text-slate-500">Penyimpanan terstruktur berkas naskah dinas elektronik</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          <HardDrive className="w-4 h-4 text-sky-600" /> Total Arsip: {allArchive.length} Berkas
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Folder Tree Navigation */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Direktori Arsip</p>
          
          <button
            onClick={() => setSelectedFolder('semua')}
            className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              selectedFolder === 'semua' ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800' : 'hover:bg-slate-50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-sky-600" /> Semua Berkas Arsip
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">{allArchive.length}</span>
          </button>

          <button
            onClick={() => setSelectedFolder('masuk')}
            className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              selectedFolder === 'masuk' ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800' : 'hover:bg-slate-50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-500" /> Folder Surat Masuk
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">{suratMasukList.length}</span>
          </button>

          <button
            onClick={() => setSelectedFolder('keluar')}
            className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              selectedFolder === 'keluar' ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800' : 'hover:bg-slate-50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-emerald-500" /> Folder Surat Keluar
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">{suratKeluarList.length}</span>
          </button>
        </div>

        {/* Files Grid */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative">
            <Search className="w-4 h-4 absolute left-7 top-6 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berkas nomor, perihal, asal/tujuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArchive.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className={`w-6 h-6 ${item.kategori === 'Surat Masuk' ? 'text-amber-500' : 'text-emerald-500'}`} />
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.kategori}
                      </span>
                      <p className="font-mono font-bold text-xs text-sky-700 dark:text-sky-400 mt-1">{item.nomor}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{formatTanggalIndo(item.tanggal)}</span>
                </div>

                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{item.perihal}</p>
                <p className="text-[11px] text-slate-500">Asal / Tujuan: <b>{item.asalTujuan}</b></p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">Kode: {item.agenda}</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg" title="Buka Detail">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
