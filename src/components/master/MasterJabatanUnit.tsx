import React, { useState } from 'react';
import { Briefcase, Network, Plus, Trash2 } from 'lucide-react';
import { MasterJabatan, MasterUnitKerja } from '../../types';

interface Props {
  jabatans: MasterJabatan[];
  unitKerjas: MasterUnitKerja[];
  onSaveJabatan: (jab: MasterJabatan) => void;
  onDeleteJabatan: (id: string) => void;
  onSaveUnit: (unit: MasterUnitKerja) => void;
  onDeleteUnit: (id: string) => void;
}

export const MasterJabatanUnitView: React.FC<Props> = ({
  jabatans,
  unitKerjas,
  onSaveJabatan,
  onDeleteJabatan,
  onSaveUnit,
  onDeleteUnit
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'jabatan' | 'unit'>('jabatan');

  // New Jabatan State
  const [namaJab, setNamaJab] = useState('');
  const [tingkat, setTingkat] = useState('Eselon III');

  // New Unit State
  const [kodeUnit, setKodeUnit] = useState('');
  const [namaUnit, setNamaUnit] = useState('');

  const handleAddJabatan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaJab.trim()) return;
    onSaveJabatan({
      id: `jab-${Date.now()}`,
      kodeJabatan: `JAB-${Math.floor(Math.random() * 899 + 100)}`,
      namaJabatan: namaJab,
      tingkatEselon: tingkat
    });
    setNamaJab('');
  };

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeUnit.trim() || !namaUnit.trim()) return;
    onSaveUnit({
      id: `unit-${Date.now()}`,
      kodeUnit,
      namaUnit,
      singkatan: kodeUnit,
      kepalaUnit: 'Plt. Kepala Unit'
    });
    setKodeUnit('');
    setNamaUnit('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Jabatan & Unit Kerja</h1>
            <p className="text-xs text-slate-500">Struktur hierarki eselonisasi, bagian, dan unit kerja dinas</p>
          </div>
        </div>

        {/* Sub-tab toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSubTab('jabatan')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'jabatan' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Master Jabatan
          </button>
          <button
            onClick={() => setActiveSubTab('unit')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'unit' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Master Unit Kerja
          </button>
        </div>
      </div>

      {activeSubTab === 'jabatan' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Tambah Jabatan Baru</h3>
            <form onSubmit={handleAddJabatan} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Nama Jabatan</label>
                <input
                  type="text"
                  placeholder="Contoh: Kepala Subbagian Umum"
                  value={namaJab}
                  onChange={(e) => setNamaJab(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Tingkat Eselon</label>
                <select
                  value={tingkat}
                  onChange={(e) => setTingkat(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Eselon II.a">Eselon II.a</option>
                  <option value="Eselon II.b">Eselon II.b</option>
                  <option value="Eselon III">Eselon III</option>
                  <option value="Eselon IV">Eselon IV</option>
                  <option value="Fungsional">Jabatan Fungsional</option>
                  <option value="Pelaksana">Staf Pelaksana</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Simpan Jabatan
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-4">Kode</th>
                  <th className="py-3 px-4">Nama Jabatan</th>
                  <th className="py-3 px-4">Eselonisasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {jabatans.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600">{j.kodeJabatan}</td>
                    <td className="py-3 px-4 font-semibold">{j.namaJabatan}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold">{j.tingkatEselon}</span></td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => onDeleteJabatan(j.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Tambah Unit Kerja Baru</h3>
            <form onSubmit={handleAddUnit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Kode / Singkatan Unit</label>
                <input
                  type="text"
                  placeholder="Contoh: BAG-UMUM"
                  value={kodeUnit}
                  onChange={(e) => setKodeUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Nama Lengkap Unit Kerja</label>
                <input
                  type="text"
                  placeholder="Contoh: Bagian Tata Usaha & Keuangan"
                  value={namaUnit}
                  onChange={(e) => setNamaUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Simpan Unit Kerja
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-4">Kode Unit</th>
                  <th className="py-3 px-4">Nama Unit Kerja</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {unitKerjas.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{u.kodeUnit}</td>
                    <td className="py-3 px-4 font-semibold">{u.namaUnit}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => onDeleteUnit(u.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
