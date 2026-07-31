import React, { useState } from 'react';
import {
  Inbox,
  Send,
  Clock,
  XCircle,
  PlusCircle,
  QrCode,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { AppState } from '../../services/apiService';

interface Props {
  state: AppState;
  onSelectTab: (tab: string) => void;
  onOpenQRVerify: () => void;
  onOpenCreateSuratKeluar: () => void;
  onOpenCreateSuratMasuk: () => void;
}

export const DashboardView: React.FC<Props> = ({
  state,
  onSelectTab,
  onOpenQRVerify,
  onOpenCreateSuratKeluar,
  onOpenCreateSuratMasuk
}) => {
  const [verifyCodeInput, setVerifyCodeInput] = useState('');

  const suratMasuk = state?.suratMasukList || [];
  const suratKeluar = state?.suratKeluarList || [];

  // Key metrics calculation
  const totalMasuk = suratMasuk.length;
  const totalKeluar = suratKeluar.length;
  const pendingApprovals = suratKeluar.filter((s) => s.status === 'Review').length;
  const rejectedCount = suratKeluar.filter((s) => s.status === 'Ditolak').length;

  // Monthly trend chart data
  const monthlyFlow = [
    { month: 'FEB', count: 42 },
    { month: 'MAR', count: 65 },
    { month: 'APR', count: 85 },
    { month: 'MEI', count: 95 },
    { month: 'JUN', count: 55 },
    { month: 'JUL', count: totalMasuk + totalKeluar || 70 },
  ];

  // Combined recent surat activity table data
  const recentSuratList = [
    ...suratKeluar.map((s) => ({
      id: s.id,
      nomor: s.nomorSurat,
      perihal: s.perihal,
      unit: s.unitPengirim || 'Biro Kepegawaian',
      status: s.status,
      tipe: 'Keluar' as const
    })),
    ...suratMasuk.map((s) => ({
      id: s.id,
      nomor: s.nomorAgenda || s.nomorSurat,
      perihal: s.perihal,
      unit: s.pengirimInstansi,
      status: s.status,
      tipe: 'Masuk' as const
    }))
  ].slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disetujui':
      case 'Selesai':
      case 'Terdaftar':
        return 'bg-green-100 text-green-700';
      case 'Review':
      case 'Proses':
        return 'bg-blue-100 text-blue-700';
      case 'Ditolak':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenQRVerify();
  };

  return (
    <div className="p-8 flex-1 space-y-8 animate-in fade-in duration-200 bg-slate-50 min-h-screen">
      
      {/* Quick Action Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portal Administrasi e-Surat</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan surat masuk, surat keluar, disposisi, dan verifikasi tanda tangan digital resmi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateSuratMasuk}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Catat Surat Masuk
          </button>
          <button
            onClick={onOpenCreateSuratKeluar}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-blue-600" /> Draft Surat Keluar
          </button>
        </div>
      </div>

      {/* Stat Grid (4 Cards from Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Surat Masuk */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Surat Masuk</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalMasuk}</h3>
        </div>

        {/* Card 2: Surat Keluar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Surat Keluar</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalKeluar}</h3>
        </div>

        {/* Card 3: Persetujuan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Persetujuan</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{pendingApprovals}</h3>
        </div>

        {/* Card 4: Ditolak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Total
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Ditolak</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{rejectedCount}</h3>
        </div>

      </div>

      {/* Main Visual Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Recent Activity Table (2/3 width) */}
        <div className="flex-[2] bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-800">Aktivitas Surat Terbaru</h4>
            <button
              onClick={() => onSelectTab('surat-masuk')}
              className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-3 font-semibold">No. Surat</th>
                  <th className="px-6 py-3 font-semibold">Perihal</th>
                  <th className="px-6 py-3 font-semibold">Unit Asal / Pengirim</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentSuratList.map((row) => (
                  <tr key={row.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.nomor}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{row.perihal}</td>
                    <td className="px-6 py-4 text-slate-600">{row.unit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusBadge(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Action Sidebar inside Main (1/3 width) */}
        <div className="flex-1 space-y-6">
          
          {/* Chart Simulation / Monthly Surat Flow */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-800 text-sm mb-4">Alur Surat Bulanan</h4>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyFlow} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {monthlyFlow.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === monthlyFlow.length - 1 ? '#2563eb' : '#dbeafe'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-semibold">
              <span>FEB</span><span>MAR</span><span>APR</span><span>MEI</span><span>JUN</span><span>JUL</span>
            </div>
          </div>

          {/* Verification Tool (Dark Accent Box from Theme HTML) */}
          <div className="bg-[#1e293b] p-5 rounded-2xl shadow-xl text-white space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifikasi TTD Digital
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cek keaslian surat melalui QR Code atau Kode Unik Sistem secara langsung.
            </p>
            <form onSubmit={handleVerifySubmit} className="flex gap-2 pt-1">
              <input
                type="text"
                value={verifyCodeInput}
                onChange={(e) => setVerifyCodeInput(e.target.value)}
                placeholder="Kode Surat..."
                className="bg-slate-800 border-none rounded-lg px-3 py-2 text-xs w-full text-white placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer text-white flex-shrink-0"
              >
                Cek
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
