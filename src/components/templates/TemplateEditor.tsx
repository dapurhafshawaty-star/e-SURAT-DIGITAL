import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Save,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Sparkles,
  Printer
} from 'lucide-react';
import { TemplateSurat } from '../../types';

interface Props {
  templates: TemplateSurat[];
  onSaveTemplate: (template: TemplateSurat) => void;
}

export const TemplateEditor: React.FC<Props> = ({ templates, onSaveTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateSurat>(templates[0]);
  const [editorContent, setEditorContent] = useState(templates[0]?.kontenHtml || '');
  const [namaTemplate, setNamaTemplate] = useState(templates[0]?.namaTemplate || '');
  const [jenisSurat, setJenisSurat] = useState(templates[0]?.jenisSurat || 'Undangan Resmi');

  const handleSelect = (tmpl: TemplateSurat) => {
    setSelectedTemplate(tmpl);
    setEditorContent(tmpl.kontenHtml);
    setNamaTemplate(tmpl.namaTemplate);
    setJenisSurat(tmpl.jenisSurat);
  };

  const handleCreateNew = () => {
    const newTmpl: TemplateSurat = {
      id: `tmpl-${Date.now()}`,
      kode: `TPL-${Math.floor(Math.random() * 899 + 100)}`,
      namaTemplate: 'Template Naskah Baru',
      jenisSurat: 'Surat Dinas',
      deskripsi: 'Deskripsi template baru',
      subjekDefault: 'Perihal {JUDUL}',
      kontenHtml: '<p>Dengan hormat,</p><p>Isi naskah dinas...</p>',
      placeholders: ['{NOMOR_SURAT}', '{TANGGAL_SURAT}', '{TUJUAN_NAMA}']
    };
    setSelectedTemplate(newTmpl);
    setEditorContent(newTmpl.kontenHtml);
    setNamaTemplate(newTmpl.namaTemplate);
    setJenisSurat(newTmpl.jenisSurat);
  };

  const handleSave = () => {
    const updated: TemplateSurat = {
      ...selectedTemplate,
      namaTemplate,
      jenisSurat,
      kontenHtml: editorContent
    };
    onSaveTemplate(updated);
    alert('Template berhasil disimpan ke sistem generator!');
  };

  const insertPlaceholder = (ph: string) => {
    setEditorContent((prev) => prev + ` ${ph} `);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Generator & Editor Template Surat</h1>
            <p className="text-xs text-slate-500">Kelola template otomatis untuk 15+ jenis naskah dinas resmi</p>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Buat Template Baru
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Template List Sidebar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Daftar Template Resmi</p>
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full text-left p-3 rounded-xl text-xs transition-all ${
                  t.id === selectedTemplate.id
                    ? 'bg-sky-50 dark:bg-sky-950/60 font-bold border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="font-bold">{t.namaTemplate}</p>
                <span className="text-[10px] text-slate-400 font-normal">{t.jenisSurat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Word-like WYSIWYG Editor Workspace */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Nama Template
              </label>
              <input
                type="text"
                value={namaTemplate}
                onChange={(e) => setNamaTemplate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Jenis Surat Dinas
              </label>
              <input
                type="text"
                value={jenisSurat}
                onChange={(e) => setJenisSurat(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Placeholders Toolbar */}
          <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl space-y-2">
            <p className="text-[11px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Variabel Otomatis (Klik untuk menyisipkan ke naskah):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(selectedTemplate.placeholders || ['{NOMOR_SURAT}', '{TANGGAL_SURAT}', '{TUJUAN_NAMA}', '{NAMA_PEGAWAI}']).map((ph) => (
                <button
                  key={ph}
                  onClick={() => insertPlaceholder(ph)}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 rounded-lg border border-sky-200 dark:border-sky-700 hover:bg-sky-100 transition-colors"
                >
                  {ph}
                </button>
              ))}
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><Bold className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><Italic className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><Underline className="w-4 h-4" /></button>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><AlignLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><AlignCenter className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><AlignRight className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200"><List className="w-4 h-4" /></button>
          </div>

          {/* Editor TextArea */}
          <div>
            <textarea
              rows={12}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="w-full p-4 text-xs font-serif leading-relaxed rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan Template
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
