import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, FileText, Send } from 'lucide-react';
import {
  SuratKeluar,
  MasterKlasifikasi,
  MasterPenandatangan,
  TemplateSurat,
  User,
  ApprovalStage
} from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (surat: SuratKeluar) => void;
  klasifikasis: MasterKlasifikasi[];
  penandatangans: MasterPenandatangan[];
  templates: TemplateSurat[];
  currentUser: User;
  autoNomorGenerator: (kode: string) => string;
  initialData?: SuratKeluar | null;
}

export const SuratKeluarModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  klasifikasis,
  penandatangans,
  templates,
  currentUser,
  autoNomorGenerator,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<SuratKeluar>>({
    nomorSurat: '',
    tanggal: new Date().toISOString().slice(0, 10),
    tujuan: '',
    alamatTujuan: '',
    perihal: '',
    isiSurat: '<p>Dengan hormat,</p><p>Sehubungan dengan pelaksanaan program dinas, bersama ini disampaikan...</p><p>Demikian untuk menjadi maklum, atas kerjasamanya diucapkan terima kasih.</p>',
    lampiranText: '1 (satu) Berkas',
    klasifikasiId: klasifikasis[0]?.id || 'kls-1',
    klasifikasiKode: klasifikasis[0]?.kodeKlasifikasi || '005/UND',
    jenisSurat: 'Undangan Resmi',
    penandatanganId: penandatangans[0]?.id || 'ttd-1',
    penandatanganNama: penandatangans[0]?.nama || 'Dr. H. Ahmad Wijaya, M.Si.',
    penandatanganNip: penandatangans[0]?.nip || '19820315 200801 1 002',
    penandatanganJabatan: penandatangans[0]?.jabatan || 'Kepala Dinas',
    status: 'Draft',
    currentApprovalStage: 'Operator' as ApprovalStage,
    approvalHistory: [],
    ttdDigitalApplied: false,
    created_by: currentUser.nama
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultKode = klasifikasis[0]?.kodeKlasifikasi || '005/UND';
      const generatedNomor = autoNomorGenerator(defaultKode);

      setFormData({
        nomorSurat: generatedNomor,
        tanggal: new Date().toISOString().slice(0, 10),
        tujuan: '',
        alamatTujuan: 'Di Tempat',
        perihal: '',
        isiSurat: '<p>Dengan hormat,</p><p>Sehubungan dengan pelaksanaan kegiatan dinas, bersama ini disampaikan...</p><p>Demikian untuk menjadi perhatian, terima kasih.</p>',
        lampiranText: '1 Berkas',
        klasifikasiId: klasifikasis[0]?.id || 'kls-1',
        klasifikasiKode: defaultKode,
        jenisSurat: 'Undangan Resmi',
        penandatanganId: penandatangans[0]?.id || 'ttd-1',
        penandatanganNama: penandatangans[0]?.nama || 'Dr. H. Ahmad Wijaya, M.Si.',
        penandatanganNip: penandatangans[0]?.nip || '19820315 200801 1 002',
        penandatanganJabatan: penandatangans[0]?.jabatan || 'Kepala Dinas',
        status: 'Draft',
        currentApprovalStage: 'Operator' as ApprovalStage,
        approvalHistory: [],
        ttdDigitalApplied: false,
        created_by: currentUser.nama
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleApplyTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = templates.find((t) => t.id === templateId);
    if (tmpl) {
      setFormData((prev) => ({
        ...prev,
        jenisSurat: tmpl.jenisSurat,
        perihal: tmpl.subjekDefault,
        isiSurat: tmpl.kontenHtml
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent, submitForApproval: boolean = false) => {
    e.preventDefault();
    if (!formData.nomorSurat || !formData.tujuan || !formData.perihal) {
      alert('Mohon lengkapi Nomor Surat, Tujuan, dan Perihal.');
      return;
    }

    const stage: ApprovalStage = submitForApproval ? 'Kepala Bagian' : 'Operator';
    const statusVal = submitForApproval ? 'Review' : 'Draft';

    const finalItem: SuratKeluar = {
      id: formData.id || `sk-${Date.now()}`,
      nomorSurat: formData.nomorSurat || '',
      tanggal: formData.tanggal || new Date().toISOString().slice(0, 10),
      tujuan: formData.tujuan || '',
      alamatTujuan: formData.alamatTujuan || 'Di Tempat',
      perihal: formData.perihal || '',
      isiSurat: formData.isiSurat || '',
      lampiranText: formData.lampiranText || '-',
      klasifikasiId: formData.klasifikasiId || klasifikasis[0]?.id || 'kls-1',
      klasifikasiKode: formData.klasifikasiKode || klasifikasis[0]?.kodeKlasifikasi || '005/UND',
      jenisSurat: formData.jenisSurat || 'Surat Dinas',
      penandatanganId: formData.penandatanganId || penandatangans[0]?.id || 'ttd-1',
      penandatanganNama: formData.penandatanganNama || 'Dr. H. Ahmad Wijaya, M.Si.',
      penandatanganNip: formData.penandatanganNip || '19820315 200801 1 002',
      penandatanganJabatan: formData.penandatanganJabatan || 'Kepala Dinas',
      status: statusVal,
      currentApprovalStage: stage,
      approvalHistory: formData.approvalHistory || [
        {
          id: `ah-${Date.now()}`,
          stage: 'Operator',
          actorNama: currentUser.nama,
          actorRole: currentUser.role,
          action: 'Submit',
          catatan: submitForApproval ? 'Diajukan untuk persetujuan berjenjang' : 'Draft disimpan',
          timestamp: new Date().toISOString()
        }
      ],
      ttdDigitalApplied: formData.ttdDigitalApplied || false,
      created_by: currentUser.nama,
      created_at: formData.created_at || new Date().toISOString()
    };

    onSave(finalItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base">{initialData ? 'Edit Draft Surat Keluar' : 'Pembuatan Surat Keluar Baru'}</h3>
            <p className="text-xs text-slate-400">Generator nomor otomatis, template, & alur persetujuan</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-6 space-y-4">
          
          {/* Quick Template Selector */}
          <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl">
            <label className="block text-xs font-bold text-sky-800 dark:text-sky-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" /> Pilih Template Otomatis (Opsional)
            </label>
            <select
              value={selectedTemplateId}
              onChange={(e) => handleApplyTemplate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-800"
            >
              <option value="">-- Pilih Template Naskah Dinas --</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.namaTemplate} ({t.jenisSurat})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nomor Surat Otomatis
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={formData.nomorSurat || ''}
                  onChange={(e) => setFormData({ ...formData, nomorSurat: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-sky-700 dark:text-sky-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Klasifikasi Surat
              </label>
              <select
                value={formData.klasifikasiId || ''}
                onChange={(e) => {
                  const sel = klasifikasis.find((k) => k.id === e.target.value);
                  const kode = sel?.kodeKlasifikasi || '005/UND';
                  const newNomor = autoNomorGenerator(kode);
                  setFormData({
                    ...formData,
                    klasifikasiId: e.target.value,
                    klasifikasiKode: kode,
                    nomorSurat: newNomor
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
                Tanggal Surat
              </label>
              <input
                type="date"
                value={formData.tanggal || ''}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Jenis / Perihal Naskah
              </label>
              <input
                type="text"
                placeholder="Contoh: Undangan Rapat / Surat Tugas"
                value={formData.jenisSurat || ''}
                onChange={(e) => setFormData({ ...formData, jenisSurat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tujuan Surat (Kepada Yth)
              </label>
              <input
                type="text"
                placeholder="Contoh: Kepala OPD / Seluruh Camat"
                value={formData.tujuan || ''}
                onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Alamat Tujuan
              </label>
              <input
                type="text"
                placeholder="Di Tempat / Kota Digital"
                value={formData.alamatTujuan || ''}
                onChange={(e) => setFormData({ ...formData, alamatTujuan: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
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
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Isi Surat (Editor Naskah Dinas)
            </label>
            <textarea
              rows={6}
              value={formData.isiSurat || ''}
              onChange={(e) => setFormData({ ...formData, isiSurat: e.target.value })}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-serif leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Keterangan Lampiran
              </label>
              <input
                type="text"
                placeholder="1 (satu) Berkas"
                value={formData.lampiranText || ''}
                onChange={(e) => setFormData({ ...formData, lampiranText: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Pejabat Penandatangan
              </label>
              <select
                value={formData.penandatanganId || ''}
                onChange={(e) => {
                  const sel = penandatangans.find((p) => p.id === e.target.value);
                  if (sel) {
                    setFormData({
                      ...formData,
                      penandatanganId: sel.id,
                      penandatanganNama: sel.nama,
                      penandatanganNip: sel.nip,
                      penandatanganJabatan: sel.jabatan
                    });
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
              >
                {penandatangans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama} - {p.jabatan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Batal
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                className="px-4 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 rounded-xl transition-colors"
              >
                Simpan Draft
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="px-5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Ajukan Persetujuan
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
