import React, { useState } from 'react';
import { Building2, Save, Upload, PenTool, CheckCircle2 } from 'lucide-react';
import { MasterInstansi } from '../../types';
import { SignaturePadModal } from '../common/SignaturePadModal';

interface Props {
  instansi: MasterInstansi;
  onSave: (instansi: Partial<MasterInstansi>) => void;
}

export const MasterInstansiView: React.FC<Props> = ({ instansi, onSave }) => {
  const [formData, setFormData] = useState<MasterInstansi>(instansi);
  const [showPadModal, setShowPadModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert('Master Data Instansi & Kop Surat berhasil diperbarui!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData({ ...formData, logo: uploadEvent.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Instansi & Kop Surat Resmi</h1>
            <p className="text-xs text-slate-500">Konfigurasi identitas dinas, logo, garis kop, stempel, & TTD pimpinan</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form Info */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">
            Identitas Resmi Pemerintahan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nama Instansi Utama (Baris 1 Kop)
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Sub-Header / Organisasi (Baris 2 Kop)
              </label>
              <input
                type="text"
                value={formData.namaYayasan || ''}
                onChange={(e) => setFormData({ ...formData, namaYayasan: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Alamat Lengkap Kantor
            </label>
            <input
              type="text"
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Telepon / Fax
              </label>
              <input
                type="text"
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Email Kedinasan
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Website Resmi
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nama Pimpinan Tinggi / Kepala Dinas
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

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Catatan Footer PDF Resmi
            </label>
            <textarea
              rows={2}
              value={formData.footerText || ''}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

        </div>

        {/* Right Column: Kop Preview & Digital Stamp / TTD */}
        <div className="space-y-6">
          
          {/* Logo & Kop Preview Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-slate-800">
              Pratinjau Kop Surat Resmi
            </h3>

            {/* Live Kop Preview Box */}
            <div className="p-4 bg-white text-slate-900 rounded-xl border border-slate-300 font-serif text-center text-[10px] space-y-1 shadow-inner">
              <div className="flex items-center justify-center gap-3">
                {formData.logo && <img src={formData.logo} alt="Logo" className="w-12 h-12 object-contain" />}
                <div>
                  <p className="font-bold uppercase text-[11px] tracking-tight">{formData.nama}</p>
                  <p className="font-bold uppercase text-[12px]">{formData.namaYayasan}</p>
                  <p className="text-[9px] leading-tight">{formData.alamat}</p>
                  <p className="text-[8px]">Telp: {formData.telepon} | Email: {formData.email}</p>
                </div>
              </div>
              <div className="border-t-2 border-b border-black h-1 my-2" />
            </div>

            {/* Upload Logo */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Ganti Logo Instansi
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
          </div>

          {/* TTD Digital Pimpinan */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Tanda Tangan Digital Pimpinan
            </h3>
            
            <div className="p-3 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50 dark:bg-slate-800">
              {formData.ttdDigitalPimpinan ? (
                <img src={formData.ttdDigitalPimpinan} alt="TTD Pimpinan" className="h-16 mx-auto object-contain" />
              ) : (
                <p className="text-xs text-slate-400 py-4">Belum ada TTD Digital terdaftar</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowPadModal(true)}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
            >
              <PenTool className="w-3.5 h-3.5" /> Gambar TTD Digital
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Simpan Pengaturan Instansi
          </button>

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
