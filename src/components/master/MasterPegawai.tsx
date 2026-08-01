import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, CheckCircle2 } from 'lucide-react';
import { User, Role, MasterUnitKerja, MasterJabatan } from '../../types';

interface Props {
  users: User[];
  unitKerjas: MasterUnitKerja[];
  jabatans: MasterJabatan[];
  onSaveUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export const MasterPegawaiView: React.FC<Props> = ({
  users,
  unitKerjas,
  jabatans,
  onSaveUser,
  onDeleteUser
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<Partial<User>>({
    nip: '',
    nama: '',
    jabatan: jabatans[0]?.namaJabatan || 'Pranata Komputer',
    unitKerja: unitKerjas[0]?.namaUnit || 'Subbagian TI',
    noHp: '',
    email: '',
    role: 'Pegawai' as Role,
    status: 'Aktif'
  });

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormData({
      nip: '',
      nama: '',
      jabatan: jabatans[0]?.namaJabatan || 'Pranata Komputer',
      unitKerja: unitKerjas[0]?.namaUnit || 'Subbagian TI',
      noHp: '',
      email: '',
      role: 'Pegawai' as Role,
      status: 'Aktif'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (u: User) => {
    setEditingUser(u);
    setFormData(u);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) {
      alert('Mohon lengkapi Nama dan Email Pegawai.');
      return;
    }

    const finalUser: User = {
      id: formData.id || `usr-${Date.now()}`,
      nip: formData.nip || '-',
      nama: formData.nama || '',
      jabatan: formData.jabatan || 'Pegawai',
      unitKerja: formData.unitKerja || 'General',
      noHp: formData.noHp || '-',
      email: formData.email || '',
      pin: formData.pin || '123456',
      role: (formData.role || 'Pegawai') as Role,
      status: formData.status || 'Aktif',
      foto: formData.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };

    onSaveUser(finalUser);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Pegawai & Hak Akses (RBAC)</h1>
            <p className="text-xs text-slate-500">Kelola NIP, jabatan, unit kerja, & peran (7 Role)</p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Pegawai
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Pegawai</th>
                <th className="py-3.5 px-4">NIP & Kontak</th>
                <th className="py-3.5 px-4">Jabatan & Unit</th>
                <th className="py-3.5 px-4">Role System</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={u.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{u.nama}</p>
                        <p className="text-[10px] text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <p className="font-bold text-slate-700 dark:text-slate-300">{u.nip}</p>
                    <p className="text-[10px] text-slate-400">{u.noHp}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{u.jabatan}</p>
                    <p className="text-[10px] text-slate-500">{u.unitKerja}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => handleOpenEdit(u)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteUser(u.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal CRUD */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingUser ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">NIP</label>
                <input
                  type="text"
                  value={formData.nip || ''}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={formData.nama || ''}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={formData.jabatan || ''}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Unit Kerja</label>
                  <input
                    type="text"
                    value={formData.unitKerja || ''}
                    onChange={(e) => setFormData({ ...formData, unitKerja: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">No HP / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.noHp || ''}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">PIN Akses Email (6 Angka)</label>
                  <input
                    type="password"
                    maxLength={10}
                    placeholder="Contoh: 123456"
                    value={formData.pin || ''}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Role System (Hak Akses)</label>
                  <select
                    value={formData.role || 'Pegawai'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Operator">Operator Persuratan</option>
                    <option value="Sekretaris">Sekretaris Dinas</option>
                    <option value="Kepala Bagian">Kepala Bagian / Kabag</option>
                    <option value="Pimpinan">Pimpinan / Kepala Dinas</option>
                    <option value="Pegawai">Pegawai</option>
                    <option value="Tamu">Tamu / Publik</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs">Batal</button>
                <button type="submit" className="px-5 py-2 text-xs bg-sky-600 text-white font-bold rounded-xl flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Simpan Pegawai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
