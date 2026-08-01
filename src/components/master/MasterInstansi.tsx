import React, { useState, useEffect } from 'react';
import { Building2, Save, Upload, PenTool, AlignLeft, AlignCenter, AlignRight, Type, Image as ImageIcon, Sliders, Layers, Eye } from 'lucide-react';
import { MasterInstansi } from '../../types';
import { SignaturePadModal } from '../common/SignaturePadModal';

interface Props {
  instansi: MasterInstansi;
  onSave: (instansi: Partial<MasterInstansi>) => void;
}

export const MasterInstansiView: React.FC<Props> = ({ instansi, onSave }) => {
  const [formData, setFormData] = useState<MasterInstansi>({
    ...instansi,
    barisAtasHeader: instansi.barisAtasHeader ?? 'PEMERINTAH PROVINSI / KABUPATEN',
    logoSize: instansi.logoSize ?? 70,
    kopAlign: instansi.kopAlign ?? 'center',
    fontFamilyHeader: instansi.fontFamilyHeader ?? 'Times New Roman',
    barisAtasSize: instansi.barisAtasSize ?? 13,
    barisAtasBold: instansi.barisAtasBold ?? true,
    barisAtasUppercase: instansi.barisAtasUppercase ?? true,
    namaInstansiSize: instansi.namaInstansiSize ?? 16,
    namaInstansiBold: instansi.namaInstansiBold ?? true,
    namaInstansiUppercase: instansi.namaInstansiUppercase ?? true,
    subHeaderSize: instansi.subHeaderSize ?? 13,
    subHeaderBold: instansi.subHeaderBold ?? true,
    subHeaderUppercase: instansi.subHeaderUppercase ?? true,
    alamatSize: instansi.alamatSize ?? 11,
    alamatItalic: instansi.alamatItalic ?? false,
    kontakSize: instansi.kontakSize ?? 10,
    kontakItalic: instansi.kontakItalic ?? true,
    kopGarisStyle: instansi.kopGarisStyle ?? 'double',
  });

  useEffect(() => {
    if (instansi) {
      setFormData({
        ...instansi,
        barisAtasHeader: instansi.barisAtasHeader ?? 'PEMERINTAH PROVINSI / KABUPATEN',
        logoSize: instansi.logoSize ?? 70,
        kopAlign: instansi.kopAlign ?? 'center',
        fontFamilyHeader: instansi.fontFamilyHeader ?? 'Times New Roman',
        barisAtasSize: instansi.barisAtasSize ?? 13,
        barisAtasBold: instansi.barisAtasBold ?? true,
        barisAtasUppercase: instansi.barisAtasUppercase ?? true,
        namaInstansiSize: instansi.namaInstansiSize ?? 16,
        namaInstansiBold: instansi.namaInstansiBold ?? true,
        namaInstansiUppercase: instansi.namaInstansiUppercase ?? true,
        subHeaderSize: instansi.subHeaderSize ?? 13,
        subHeaderBold: instansi.subHeaderBold ?? true,
        subHeaderUppercase: instansi.subHeaderUppercase ?? true,
        alamatSize: instansi.alamatSize ?? 11,
        alamatItalic: instansi.alamatItalic ?? false,
        kontakSize: instansi.kontakSize ?? 10,
        kontakItalic: instansi.kontakItalic ?? true,
        kopGarisStyle: instansi.kopGarisStyle ?? 'double',
      });
    }
  }, [instansi]);

  const [showPadModal, setShowPadModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert('Master Data Instansi & Format Kop Surat berhasil disimpan!');
  };

  const handleLogoUpload = (field: 'logo' | 'logoKanan') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData({ ...formData, [field]: uploadEvent.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Instansi & Penataan Kop Surat Resmi</h1>
            <p className="text-xs text-slate-500">Sesuaikan tata letak, ukuran huruf, ketebalan, alinea, dan logo untuk Kop Resmi Pemerintah</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Simpan Format Kop
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Config Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Penataan Letak & Font Utama */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sky-600 dark:text-sky-400">
              <Sliders className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">1. Tata Letak, Font & Garis Kop</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Align Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Posisi Alinea / Alignment Teks Kop
                </label>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kopAlign: 'left' })}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                      formData.kopAlign === 'left' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow' : 'text-slate-500'
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" /> Kiri
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kopAlign: 'center' })}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                      formData.kopAlign === 'center' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow' : 'text-slate-500'
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" /> Tengah
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, kopAlign: 'right' })}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                      formData.kopAlign === 'right' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow' : 'text-slate-500'
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" /> Kanan
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Jenis Font Kop Surat
                </label>
                <select
                  value={formData.fontFamilyHeader}
                  onChange={(e: any) => setFormData({ ...formData, fontFamilyHeader: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value="Times New Roman">Times New Roman (Standar Dinas)</option>
                  <option value="Arial">Arial (Modern Clean)</option>
                  <option value="Calibri">Calibri (Formal Crisp)</option>
                  <option value="Georgia">Georgia (Classic Serif)</option>
                  <option value="Courier New">Courier New (Monospace)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Gaya Garis Pembatas Kop */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Model Garis Pembatas Kop
                </label>
                <select
                  value={formData.kopGarisStyle || 'double'}
                  onChange={(e: any) => setFormData({ ...formData, kopGarisStyle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value="double">Garis Ganda Tebal-Tipis (Resmi Pemerintah)</option>
                  <option value="single_thick">Garis Tunggal Tebal</option>
                  <option value="dashed">Garis Putus-Putus</option>
                  <option value="none">Tanpa Garis Pembatas</option>
                </select>
              </div>

              {/* Logo Size Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Ukuran Logo ({formData.logoSize || 70}px)
                  </label>
                </div>
                <input
                  type="range"
                  min={40}
                  max={120}
                  value={formData.logoSize || 70}
                  onChange={(e) => setFormData({ ...formData, logoSize: parseInt(e.target.value) })}
                  className="w-full accent-sky-600 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Penataan Tulisan Per Baris */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sky-600 dark:text-sky-400">
              <Type className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">2. Penataan Teks & Format Per Baris Kop</h3>
            </div>

            {/* Baris 1: Header Atas */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Baris 1: Instansi Induk / Pemerintah Daerah</p>
              <input
                type="text"
                value={formData.barisAtasHeader || ''}
                onChange={(e) => setFormData({ ...formData, barisAtasHeader: e.target.value })}
                placeholder="Contoh: PEMERINTAH PROVINSI JAWA TIMUR"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
              />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Ukuran:</span>
                  <input
                    type="number"
                    min={8}
                    max={24}
                    value={formData.barisAtasSize || 13}
                    onChange={(e) => setFormData({ ...formData, barisAtasSize: parseInt(e.target.value) || 12 })}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold"
                  />
                  <span>px</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.barisAtasBold ?? true}
                    onChange={(e) => setFormData({ ...formData, barisAtasBold: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tebal (Bold)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.barisAtasUppercase ?? true}
                    onChange={(e) => setFormData({ ...formData, barisAtasUppercase: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">HURUF KAPITAL</span>
                </label>
              </div>
            </div>

            {/* Baris 2: Nama Instansi Utama */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Baris 2: Nama Instansi / Dinas Utama</p>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: DINAS PENDIDIKAN DAN KEBUDAYAAN"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                required
              />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Ukuran:</span>
                  <input
                    type="number"
                    min={10}
                    max={28}
                    value={formData.namaInstansiSize || 16}
                    onChange={(e) => setFormData({ ...formData, namaInstansiSize: parseInt(e.target.value) || 16 })}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold"
                  />
                  <span>px</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.namaInstansiBold ?? true}
                    onChange={(e) => setFormData({ ...formData, namaInstansiBold: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tebal (Bold)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.namaInstansiUppercase ?? true}
                    onChange={(e) => setFormData({ ...formData, namaInstansiUppercase: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">HURUF KAPITAL</span>
                </label>
              </div>
            </div>

            {/* Baris 3: Sub Header / Unit Kerja / Yayasan */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Baris 3: Sub-Header / Unit Kerja / Satuan Pendidikan</p>
              <input
                type="text"
                value={formData.namaYayasan || ''}
                onChange={(e) => setFormData({ ...formData, namaYayasan: e.target.value })}
                placeholder="Contoh: SEKOLAH MENENGAH ATAS NEGERI 1"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
              />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Ukuran:</span>
                  <input
                    type="number"
                    min={8}
                    max={24}
                    value={formData.subHeaderSize || 13}
                    onChange={(e) => setFormData({ ...formData, subHeaderSize: parseInt(e.target.value) || 13 })}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold"
                  />
                  <span>px</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.subHeaderBold ?? true}
                    onChange={(e) => setFormData({ ...formData, subHeaderBold: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tebal (Bold)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.subHeaderUppercase ?? true}
                    onChange={(e) => setFormData({ ...formData, subHeaderUppercase: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">HURUF KAPITAL</span>
                </label>
              </div>
            </div>

            {/* Baris 4 & 5: Alamat & Kontak */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <p className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Baris 4 & 5: Alamat Lengkap & Informasi Kontak</p>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Alamat Lengkap Kantor
                </label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Telepon / Fax
                  </label>
                  <input
                    type="text"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Website Resmi
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Ukuran Alamat:</span>
                  <input
                    type="number"
                    min={8}
                    max={18}
                    value={formData.alamatSize || 11}
                    onChange={(e) => setFormData({ ...formData, alamatSize: parseInt(e.target.value) || 11 })}
                    className="w-14 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold"
                  />
                  <span>px</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.alamatItalic ?? false}
                    onChange={(e) => setFormData({ ...formData, alamatItalic: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Alamat Miring (Italic)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.kontakItalic ?? true}
                    onChange={(e) => setFormData({ ...formData, kontakItalic: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Kontak Miring (Italic)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Section 3: Pimpinan & TTD */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sky-600 dark:text-sky-400">
              <PenTool className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">3. Pejabat Penandatangan & TTD Digital</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nama Lengkap & Gelar Pimpinan
                </label>
                <input
                  type="text"
                  value={formData.namaPimpinan}
                  onChange={(e) => setFormData({ ...formData, namaPimpinan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  NIP Pimpinan
                </label>
                <input
                  type="text"
                  value={formData.nipPimpinan}
                  onChange={(e) => setFormData({ ...formData, nipPimpinan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Jabatan Pimpinan High Rank
                </label>
                <input
                  type="text"
                  value={formData.jabatanPimpinan}
                  onChange={(e) => setFormData({ ...formData, jabatanPimpinan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Kode Singkatan Instansi
                </label>
                <input
                  type="text"
                  value={formData.kodeInstansi}
                  onChange={(e) => setFormData({ ...formData, kodeInstansi: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
            </div>

            {/* TTD Digital Upload/Draw */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {formData.ttdDigitalPimpinan ? (
                  <img src={formData.ttdDigitalPimpinan} alt="TTD" className="h-12 object-contain bg-slate-50 p-1 rounded-lg border" />
                ) : (
                  <span className="text-xs text-slate-400 italic">Belum ada TTD Digital</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPadModal(true)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5" /> Gambar TTD Digital
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Interactive Letterhead Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <Eye className="w-4 h-4" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pratinjau Kop Resmi Interaktif</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-sky-50 dark:bg-sky-950 text-sky-700 rounded-full border border-sky-200">
                Live Preview
              </span>
            </div>

            {/* Upload Logo Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Logo Kiri (Utama)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload('logo')}
                  className="block w-full text-[10px] text-slate-500 file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-sky-50 file:text-sky-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Logo Kanan (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload('logoKanan')}
                  className="block w-full text-[10px] text-slate-500 file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-slate-100 file:text-slate-700"
                />
              </div>
            </div>

            {/* Real-time A4 Kop Preview Canvas */}
            <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md space-y-3 min-h-[320px] flex flex-col justify-between" style={{ fontFamily: formData.fontFamilyHeader || 'Times New Roman' }}>
              
              {/* Kop Header Structure */}
              <div>
                <div
                  className="flex items-center gap-3"
                  style={{
                    justifyContent: formData.kopAlign === 'left' ? 'flex-start' : formData.kopAlign === 'right' ? 'flex-end' : 'center',
                    textAlign: formData.kopAlign || 'center'
                  }}
                >
                  {/* Logo Kiri */}
                  {formData.logo && (
                    <img
                      src={formData.logo}
                      alt="Logo Kiri"
                      style={{ width: `${formData.logoSize || 70}px`, height: `${formData.logoSize || 70}px`, objectFit: 'contain' }}
                    />
                  )}

                  {/* Header Texts */}
                  <div className="flex-1">
                    {formData.barisAtasHeader && (
                      <p
                        style={{
                          fontSize: `${formData.barisAtasSize || 13}px`,
                          fontWeight: formData.barisAtasBold ? 'bold' : 'normal',
                          textTransform: formData.barisAtasUppercase ? 'uppercase' : 'none',
                          lineHeight: 1.2
                        }}
                      >
                        {formData.barisAtasHeader}
                      </p>
                    )}

                    <p
                      style={{
                        fontSize: `${formData.namaInstansiSize || 16}px`,
                        fontWeight: formData.namaInstansiBold ? 'bold' : 'normal',
                        textTransform: formData.namaInstansiUppercase ? 'uppercase' : 'none',
                        lineHeight: 1.2
                      }}
                    >
                      {formData.nama}
                    </p>

                    {formData.namaYayasan && (
                      <p
                        style={{
                          fontSize: `${formData.subHeaderSize || 13}px`,
                          fontWeight: formData.subHeaderBold ? 'bold' : 'normal',
                          textTransform: formData.subHeaderUppercase ? 'uppercase' : 'none',
                          lineHeight: 1.2
                        }}
                      >
                        {formData.namaYayasan}
                      </p>
                    )}

                    <p
                      style={{
                        fontSize: `${formData.alamatSize || 11}px`,
                        fontStyle: formData.alamatItalic ? 'italic' : 'normal',
                        lineHeight: 1.25,
                        marginTop: '2px'
                      }}
                    >
                      {formData.alamat}
                    </p>

                    <p
                      style={{
                        fontSize: `${formData.kontakSize || 10}px`,
                        fontStyle: formData.kontakItalic ? 'italic' : 'normal',
                        lineHeight: 1.2
                      }}
                    >
                      Telp: {formData.telepon} | Email: {formData.email} | Web: {formData.website}
                    </p>
                  </div>

                  {/* Logo Kanan */}
                  {formData.logoKanan && (
                    <img
                      src={formData.logoKanan}
                      alt="Logo Kanan"
                      style={{ width: `${formData.logoSize || 70}px`, height: `${formData.logoSize || 70}px`, objectFit: 'contain' }}
                    />
                  )}
                </div>

                {/* Kop Divider Line Style */}
                {formData.kopGarisStyle === 'double' && (
                  <div className="mt-3">
                    <div className="border-t-2 border-black" />
                    <div className="border-t border-black mt-[2px]" />
                  </div>
                )}
                {formData.kopGarisStyle === 'single_thick' && (
                  <div className="mt-3 border-t-2 border-black" />
                )}
                {formData.kopGarisStyle === 'dashed' && (
                  <div className="mt-3 border-t-2 border-dashed border-black" />
                )}
              </div>

              {/* Sample Body Placeholder to visualize paper ratio */}
              <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded text-[10px] text-slate-400 space-y-1 my-2">
                <p className="font-bold text-center text-slate-500">[ AREA NASKAH SURAT KELUAR / LEMBAR DISPOSISI ]</p>
                <p className="line-clamp-2">Nomor, Perihal, Lampiran, dan isi naskah dinas akan mengikuti tata letak Kop Resmi di atas saat dicetak ke PDF atau pratinjau.</p>
              </div>

              {/* Footer TTD Preview */}
              <div className="flex justify-end pt-2 text-[10px] font-sans">
                <div className="text-center w-48 space-y-1">
                  <p className="font-bold">{formData.jabatanPimpinan}</p>
                  <div className="h-10 flex items-center justify-center">
                    {formData.ttdDigitalPimpinan ? (
                      <img src={formData.ttdDigitalPimpinan} alt="TTD" className="h-9 object-contain" />
                    ) : (
                      <span className="text-slate-300 italic">[ TTD Pimpinan ]</span>
                    )}
                  </div>
                  <p className="font-bold underline">{formData.namaPimpinan}</p>
                  <p className="text-[9px]">NIP. {formData.nipPimpinan}</p>
                </div>
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Simpan Pengaturan Kop Instansi
            </button>

          </div>
        </div>

      </form>

      {/* Signature Pad Modal */}
      <SignaturePadModal
        isOpen={showPadModal}
        onClose={() => setShowPadModal(false)}
        onSave={(dataUrl) => setFormData({ ...formData, ttdDigitalPimpinan: dataUrl })}
        title="Gambar TTD Digital Pimpinan"
      />

    </div>
  );
};
