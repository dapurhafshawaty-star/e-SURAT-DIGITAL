import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import {
  Disposisi,
  SuratMasuk,
  MasterUnitKerja,
  User,
  PriorityLevel
} from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (disposisi: Disposisi) => void;
  suratMasukList: SuratMasuk[];
  unitKerjas: MasterUnitKerja[];
  users: User[];
  currentUser: User;
  preselectedSurat?: SuratMasuk | null;
}

export const DisposisiModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  suratMasukList,
  unitKerjas,
  users,
  currentUser,
  preselectedSurat
}) => {
  const selectedSurat = preselectedSurat || suratMasukList[0];

  const [suratId, setSuratId] = useState(selectedSurat?.id || '');
  const [penerimaTarget, setPenerimaTarget] = useState(unitKerjas[0]?.id || users[0]?.id || '');
  const [instruksi, setInstruksi] = useState('Tindak Lanjuti & Laporkan Hasilnya');
  const [catatan, setCatatan] = useState('');
  const [prioritas, setPrioritas] = useState<PriorityLevel>('Penting');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10));

  if (!isOpen) return null;

  const currentSuratObj = suratMasukList.find((s) => s.id === suratId) || selectedSurat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSuratObj) {
      alert('Mohon pilih Surat Masuk yang akan didisposisikan.');
      return;
    }

    // Determine receiver name & unit
    const unitMatch = unitKerjas.find((u) => u.id === penerimaTarget);
    const userMatch = users.find((u) => u.id === penerimaTarget);

    const penerimaNama = unitMatch ? unitMatch.namaUnit : userMatch ? userMatch.nama : 'Unit Kerja';
    const penerimaUnit = unitMatch ? unitMatch.kodeUnit : userMatch ? userMatch.unitKerja : '-';

    const newDisposisi: Disposisi = {
      id: `dsp-${Date.now()}`,
      suratMasukId: currentSuratObj.id,
      nomorSurat: currentSuratObj.nomorSurat,
      perihal: currentSuratObj.perihal,
      pengirimId: currentUser.id,
      pengirimNama: `${currentUser.nama} (${currentUser.role})`,
      penerimaId: penerimaTarget,
      penerimaNama,
      penerimaUnit,
      instruksi,
      catatanTambahan: catatan,
      prioritas,
      deadline,
      tanggalDisposisi: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Dalam Proses'
    };

    onSave(newDisposisi);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl max-w-lg w-full my-8 overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base">Lembar Disposisi Surat Masuk</h3>
            <p className="text-xs text-emerald-200">Meneruskan arahan dan instruksi pimpinan</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Surat Masuk Terkait
            </label>
            <select
              value={suratId}
              onChange={(e) => setSuratId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              {suratMasukList.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.nomorSurat}] - {s.perihal.slice(0, 45)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Penerima Disposisi (Unit Kerja / Pegawai)
            </label>
            <select
              value={penerimaTarget}
              onChange={(e) => setPenerimaTarget(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
            >
              <optgroup label="Unit Kerja / Bidang">
                {unitKerjas.map((u) => (
                  <option key={u.id} value={u.id}>
                    Bidang / Bagian: {u.namaUnit}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Pegawai Perorangan">
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    Pegawai: {u.nama} ({u.jabatan})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Instruksi Utama Pimpinan
            </label>
            <select
              value={instruksi}
              onChange={(e) => setInstruksi(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-emerald-800 dark:text-emerald-300"
            >
              <option value="Tindak Lanjuti & Laporkan Hasilnya">Tindak Lanjuti & Laporkan Hasilnya</option>
              <option value="Pelajari & Siapkan Bahan Paparan">Pelajari & Siapkan Bahan Paparan</option>
              <option value="Wakili Pimpinan dalam Rapat/Kegiatan">Wakili Pimpinan dalam Rapat/Kegiatan</option>
              <option value="Koordinasikan dengan Unit Terkait">Koordinasikan dengan Unit Terkait</option>
              <option value="Arsipkan & Catat sebagai Referensi">Arsipkan & Catat sebagai Referensi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tingkat Prioritas
              </label>
              <select
                value={prioritas}
                onChange={(e) => setPrioritas(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
              >
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Segera">Segera</option>
                <option value="Sangat Segera">Sangat Segera (Urgent)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Batas Waktu (Deadline)
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Catatan Disposisi Tambahan
            </label>
            <textarea
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Petunjuk teknis tambahan pimpinan..."
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Kirim Lembar Disposisi
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
