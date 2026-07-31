import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Data storage path
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'e-Surat Digital', timestamp: new Date().toISOString() });
});

// GET persistent state
app.get('/api/data', (req, res) => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return res.json(JSON.parse(content));
    }
    return res.json({ initialized: false });
  } catch (err: any) {
    console.error('Error reading db_store:', err);
    res.status(500).json({ error: 'Failed to read database store' });
  }
});

// SAVE persistent state
app.post('/api/data', (req, res) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true, timestamp: new Date().toISOString() });
  } catch (err: any) {
    console.error('Error writing db_store:', err);
    res.status(500).json({ error: 'Failed to save database store' });
  }
});

// GET Verification data for public QR Code
app.get('/api/verify/:letterNumber', (req, res) => {
  try {
    const { letterNumber } = req.params;
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      const letter = (data.suratKeluar || []).find((s: any) => 
        s.nomorSurat === letterNumber || encodeURIComponent(s.nomorSurat) === encodeURIComponent(letterNumber) || s.id === letterNumber
      );
      if (letter) {
        return res.json({
          valid: true,
          instansi: data.instansi?.nama || 'Dinas Komunikasi dan Informatika',
          nomorSurat: letter.nomorSurat,
          perihal: letter.perihal,
          tanggal: letter.tanggal,
          penandatangan: letter.penandatanganNama || 'Kepala Dinas',
          nip: letter.penandatanganNip || '19820315 200801 1 002',
          status: letter.status,
          verifiedAt: new Date().toISOString()
        });
      }
    }
    res.status(404).json({ valid: false, message: 'Dokumen surat tidak ditemukan dalam sistem registry resmi.' });
  } catch (err: any) {
    res.status(500).json({ valid: false, error: err.message });
  }
});

// Start server function
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server e-Surat running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
