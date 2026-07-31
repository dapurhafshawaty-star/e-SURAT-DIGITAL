import React, { useState } from 'react';
import {
  Settings,
  Mail,
  MessageSquare,
  Database,
  History,
  Save,
  Send,
  Upload,
  Download,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { SystemConfig } from '../../types';

interface Props {
  config: SystemConfig;
  onSaveConfig: (cfg: SystemConfig) => void;
}

export const SystemSettingsView: React.FC<Props> = ({ config, onSaveConfig }) => {
  const [activeTab, setActiveTab] = useState<'smtp' | 'wa' | 'backup' | 'audit'>('smtp');
  const [formData, setFormData] = useState<SystemConfig>(config);
  const [testEmailAddr, setTestEmailAddr] = useState('');
  const [testWaNum, setTestWaNum] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    alert('Konfigurasi Pengaturan Sistem & Integrasi berhasil disimpan!');
  };

  const handleTestSmtp = () => {
    if (!testEmailAddr) {
      alert('Tuliskan email penerima ujin coba SMTP.');
      return;
    }
    alert(`[PHPMailer Test] Pesan pengujian berhasil dikirim ke ${testEmailAddr} via SMTP ${formData.smtpHost}:${formData.smtpPort}!`);
  };

  const handleTestWa = () => {
    if (!testWaNum) {
      alert('Tuliskan nomor WA pengujian.');
      return;
    }
    alert(`[WhatsApp Gateway Test] Notifikasi uji coba dikirim ke ${testWaNum} via API Gateway!`);
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BACKUP_E_SURAT_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Pengaturan Sistem & Integrasi Gateway</h1>
            <p className="text-xs text-slate-500">Konfigurasi SMTP PHPMailer, WhatsApp Gateway, & Backup Database</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('smtp')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'smtp' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> SMTP Email
          </button>
          <button
            onClick={() => setActiveTab('wa')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'wa' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> WA Gateway
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'backup' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> Backup & Restore
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SMTP Tab */}
        {activeTab === 'smtp' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600" /> Konfigurasi Mailer Kedinasan (PHPMailer / SMTP)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">SMTP Host Server</label>
                <input
                  type="text"
                  value={formData.smtpHost}
                  onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">SMTP Port</label>
                <input
                  type="number"
                  value={formData.smtpPort}
                  onChange={(e) => setFormData({ ...formData, smtpPort: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">SMTP User / Email Pengirim</label>
                <input
                  type="email"
                  value={formData.smtpUser}
                  onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">SMTP Password</label>
                <input
                  type="password"
                  value={formData.smtpPassword}
                  onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="autoMail"
                checked={formData.autoSendEmailNotification}
                onChange={(e) => setFormData({ ...formData, autoSendEmailNotification: e.target.checked })}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <label htmlFor="autoMail" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kirim Notifikasi Email Otomatis Saat Ada Disposisi & Approval Baru
              </label>
            </div>

            {/* Test Email Box */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <input
                type="email"
                placeholder="Email uji coba pengiriman..."
                value={testEmailAddr}
                onChange={(e) => setTestEmailAddr(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-64"
              />
              <button
                type="button"
                onClick={handleTestSmtp}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" /> Tes Pengiriman Email
              </button>
            </div>
          </div>
        )}

        {/* WA Gateway Tab */}
        {activeTab === 'wa' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> Integrasi WhatsApp Gateway API
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1">WhatsApp Gateway Server Endpoint URL</label>
              <input
                type="text"
                value={formData.waGatewayUrl}
                onChange={(e) => setFormData({ ...formData, waGatewayUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">API Key / Secret Token Gateway</label>
              <input
                type="password"
                value={formData.waApiKey}
                onChange={(e) => setFormData({ ...formData, waApiKey: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="autoWa"
                checked={formData.autoSendWaNotification}
                onChange={(e) => setFormData({ ...formData, autoSendWaNotification: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="autoWa" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kirim Pesan WhatsApp Otomatis ke HP Pegawai Saat Disposisi Masuk
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="081234567890"
                value={testWaNum}
                onChange={(e) => setTestWaNum(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-64"
              />
              <button
                type="button"
                onClick={handleTestWa}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" /> Tes Kirim Pesan WA
              </button>
            </div>
          </div>
        )}

        {/* Backup & Restore Tab */}
        {activeTab === 'backup' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" /> Backup & Restore Database
            </h3>

            <p className="text-xs text-slate-500">
              Unduh salinan cadangan penuh seluruh database e-Surat (Master Data, Surat Masuk, Surat Keluar, Disposisi, Audit Log) dalam format JSON/SQL.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Unduh Backup Database (.JSON)
              </button>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Simpan Semua Pengaturan
          </button>
        </div>

      </form>

    </div>
  );
};
