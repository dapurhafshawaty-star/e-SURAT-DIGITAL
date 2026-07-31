import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { SuratMasuk, MasterKlasifikasi, SifatSurat } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (surat: SuratMasuk) => void;
  klasifikasis: MasterKlasifikasi[];
  petugasNama: string;
  initialData?: SuratMasuk | null;
}

export const SuratMasukModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  klasifikasis,
  petugasNama,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<SuratMasuk>>({
    nomorAgenda: `AGD/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(Math.random() * 899 + 100)}`,
    tanggalTerima: new Date().toISOString().slice(0, 10),
    tanggalSurat: new Date().toISOString().slice(0, 10),
    nomorSurat: '',
    asalSurat: '',
    perihal: '',
    ringkasan: '',
    sifatSurat: 'Biasa' as SifatSurat,
    klasifikasiId: klasifikasis[0]?.id || 'kls-1',
    klasifikasiKode: klasifikasis[0]?.kodeKlasifikasi || '005/UND',
    lampiranCount: 0,
    status: 'Diterima',
    petugasInput: petugasNama,
    disposisiCount: 0,
    tags: [],
    historyLog: []
  });

  const [pdfFileName, setPdfFileName] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        nomorAgenda: `AGD/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(Math.random() * 899 + 100)}`,
        tanggalTerima: new Date().toISOString().slice(0, 10),
        tanggalSurat: new Date().toISOString().slice(0, 10),
        nomorSurat: '',
        asalSurat: '',
        perihal: '',
        ringkasan: '',
        sifatSurat: 'Biasa' as SifatSurat,
        klasifikasiId: klasifikasis[0]?.id || 'kls-1',
        klasifikasiKode: klasifikasis[0]?.kodeKlasifikasi || '005/UND',
        lampiranCount: 0,
        status: 'Diterima',
        petugasInput: petugasNama,
        disposisiCount: 0,
        tags: [],
        historyLog: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({ ...prev, filePdfUrl: uploadEvent.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nomorSurat || !formData.asalSurat || !formData.perihal) {
      alert('Mohon lengkapi Nomor Surat, Asal Surat, dan Perihal.');
      return;
    }

    const finalData: SuratMasuk = {
      id: formData.id || `sm-${Date.now()}`,
      nomorAgenda: formData.nomorAgenda || 'AGD/2026/01',
      tanggalTerima: formData.tanggalTerima || new Date().toISOString().slice(0, 10),
      tanggalSurat: formData.tanggalSurat || new Date().toISOString().slice(0, 10),
      nomorSurat: formData.nomorSurat || '',
      asalSurat: formData.asalSurat || '',
      perihal: formData.perihal || '',
      ringkasan: formData.ringkasan || '',
      sifatSurat: (formData.sifatSurat || 'Biasa') as SifatSurat,
      klasifikasiId: formData.klasifikasiId || klasifikasis[0]?.id || 'kls-1',
      klasifikasiKode: formData.klasifikasiKode || klasifikasis[0]?.kodeKlasifikasi || '005/UND',
      lampiranCount: Number(formData.lampiranCount || 0),
      filePdfUrl: formData.filePdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: formData.status || 'Diterima',
      petugasInput: petugasNama,
      disposisiCount: formData.disposisiCount || 0,
      tags: formData.tags || ['Inbound'],
      created_at: formData.created_at || new Date().toISOString(),
      historyLog: formData.historyLog || []
    };

    onSave(finalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base">{initialData ? 'Edit Surat Masuk' : 'Pencatatan Surat Masuk Baru'}</h3>
            <p className="text-xs text-slate-400">Pencatatan agenda dan scan berkas surat masuk dinas</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nomor Agenda / Registrasi
              </label>
              <input
                type="text"
                value={formData.nomorAgenda || ''}
                onChange={(e) => setFormData({ ...formData, nomorAgenda: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Klasifikasi Surat
              </label>
              <select
                value={formData.klasifikasiId || ''}
                onChange={(e) => {
                  const sel = klasifikasis.find((k) => k.id === e.target.value);
                  setFormData({
                    ...formData,
                    klasifikasiId: e.target.value,
                    klasifikasiKode: sel?.kodeKlasifikasi || ''
                  });
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                {klasifikasis.map((k) => (
                  <option key={k.id} value={k.id}>
                    [{k.kodeKlasifikasi}] - {k.namaKlasifikasi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tanggal Terima Surat
              </label>
              <input
                type="date"
                value={formData.tanggalTerima || ''}
                onChange={(e) => setFormData({ ...formData, tanggalTerima: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tanggal Naskah Surat
              </label>
              <input
                type="date"
                value={formData.tanggalSurat || ''}
                onChange={(e) => setFormData({ ...formData, tanggalSurat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nomor Asli Surat
              </label>
              <input
                type="text"
                placeholder="Contoh: 005/124/SETDA/2026"
                value={formData.nomorSurat || ''}
                onChange={(e) => setFormData({ ...formData, nomorSurat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Sifat Surat
              </label>
              <select
                value={formData.sifatSurat || 'Biasa'}
                onChange={(e) => setFormData({ ...formData, sifatSurat: e.target.value as SifatSurat })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Rahasia">Rahasia</option>
                <option value="Sangat Rahasia">Sangat Rahasia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Asal Instansi / Pengirim Surat
            </label>
            <input
              type="text"
              placeholder="Contoh: Sekretariat Daerah / Badan Siber BSSN"
              value={formData.asalSurat || ''}
              onChange={(e) => setFormData({ ...formData, asalSurat: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Perihal Surat
            </label>
            <input
              type="text"
              placeholder="Perihal naskah dinas..."
              value={formData.perihal || ''}
              onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Ringkasan Isi Surat
            </label>
            <textarea
              rows={3}
              placeholder="Rangkuman poin penting dari surat..."
              value={formData.ringkasan || ''}
              onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {/* Upload Scan PDF File */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Upload Scan Surat (PDF / Gambar)
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileUpload}
                id="scan-upload"
                className="hidden"
              />
              <label htmlFor="scan-upload" className="cursor-pointer flex flex-col items-center gap-1.5">
                <Upload className="w-6 h-6 text-sky-600" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {pdfFileName ? `File Terpilih: ${pdfFileName}` : 'Klik untuk mengunggah scan naskah PDF'}
                </span>
                <span className="text-[10px] text-slate-400">Format PDF/PNG/JPG hingga 20MB</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Simpan Surat Masuk
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
