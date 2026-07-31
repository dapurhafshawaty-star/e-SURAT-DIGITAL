import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { MasterInstansi, SuratKeluar } from '../types';
import { formatTanggalIndo } from './formatter';

export async function generateLetterPdf(
  surat: SuratKeluar,
  instansi: MasterInstansi,
  options?: { autoDownload?: boolean; printWindow?: boolean }
): Promise<jsPDF> {
  // Generate QR Code data URL
  const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(surat.nomorSurat)}`;
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 120, margin: 1 });
  } catch (err) {
    console.error('Failed to generate QR code', err);
  }

  // Create temporary container for document rendering
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '794px'; // A4 width at 96 DPI
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Times New Roman', Times, serif";
  container.style.padding = '40px 50px';
  container.style.boxSizing = 'border-box';

  const logoHtml = instansi.logo
    ? `<img src="${instansi.logo}" style="width: 80px; height: 80px; object-fit: contain;" />`
    : `<div style="width: 80px; height: 80px; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 10px;">LOGO</div>`;

  const kopGarisHtml = instansi.kopGarisGanda
    ? `<div style="border-top: 3px solid #000; border-bottom: 1px solid #000; height: 2px; margin-top: 8px; margin-bottom: 20px;"></div>`
    : `<div style="border-top: 2px solid #000; margin-top: 8px; margin-bottom: 20px;"></div>`;

  container.innerHTML = `
    <!-- KOP SURAT RESMI -->
    <div style="display: flex; align-items: center; gap: 20px; text-align: center;">
      <div style="flex-shrink: 0;">${logoHtml}</div>
      <div style="flex-grow: 1;">
        <h4 style="margin: 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${instansi.nama}</h4>
        <h3 style="margin: 2px 0; font-size: 16px; font-weight: bold; text-transform: uppercase;">${instansi.namaYayasan || ''}</h3>
        <p style="margin: 2px 0; font-size: 11px; line-height: 1.3;">${instansi.alamat} - Kode Pos ${instansi.kodePos}</p>
        <p style="margin: 2px 0; font-size: 11px;">Telp: ${instansi.telepon} | Email: ${instansi.email} | Web: ${instansi.website}</p>
      </div>
    </div>
    ${kopGarisHtml}

    <!-- METADATA SURAT & TANGGAL -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; line-height: 1.5;">
      <div style="width: 60%;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="width: 80px; vertical-align: top;">Nomor</td><td style="vertical-align: top;">: ${surat.nomorSurat}</td></tr>
          <tr><td style="vertical-align: top;">Sifat</td><td style="vertical-align: top;">: Penting</td></tr>
          <tr><td style="vertical-align: top;">Lampiran</td><td style="vertical-align: top;">: ${surat.lampiranText || '-'}</td></tr>
          <tr><td style="vertical-align: top;">Perihal</td><td style="vertical-align: top;">: <b>${surat.perihal}</b></td></tr>
        </table>
      </div>
      <div style="text-align: right; width: 35%;">
        <p style="margin: 0;">${instansi.kodeInstansi ? 'Kota Digital' : ''}, ${formatTanggalIndo(surat.tanggal)}</p>
      </div>
    </div>

    <!-- TUJUAN SURAT -->
    <div style="margin-bottom: 24px; font-size: 12px; line-height: 1.5;">
      <p style="margin: 0;">Kepada Yth.</p>
      <p style="margin: 0; font-weight: bold;">${surat.tujuan}</p>
      <p style="margin: 0;">${surat.alamatTujuan || 'Di Tempat'}</p>
    </div>

    <!-- ISI SURAT -->
    <div style="font-size: 12px; line-height: 1.6; text-align: justify; min-height: 250px; margin-bottom: 30px;" class="pdf-letter-content">
      ${surat.isiSurat}
    </div>

    <!-- PENANDATANGAN & TTD DIGITAL / STAMPEL / QR CODE -->
    <div style="display: flex; justify-content: flex-end; font-size: 12px; page-break-inside: avoid; margin-top: 20px;">
      <div style="width: 300px; text-align: center;">
        <p style="margin: 0; font-weight: bold;">${surat.penandatanganJabatan}</p>
        <p style="margin: 2px 0 8px 0; font-size: 11px;">${instansi.nama}</p>
        
        <!-- TTD DIGITAL BOX -->
        <div style="min-height: 90px; display: flex; align-items: center; justify-content: center; position: relative; margin: 10px 0;">
          ${surat.ttdDigitalApplied ? `
            <div style="display: flex; align-items: center; gap: 10px; border: 1px dashed #cbd5e1; padding: 6px 12px; border-radius: 6px; background-color: #f8fafc;">
              ${qrDataUrl ? `<img src="${qrDataUrl}" style="width: 60px; height: 60px;" />` : ''}
              <div style="text-align: left; font-size: 9px; line-height: 1.2;">
                <p style="margin: 0; font-weight: bold; color: #0369a1;">DITANDATANGANI DIGITAL</p>
                <p style="margin: 2px 0; color: #475569;">BSrE / E-Surat Verified</p>
                <p style="margin: 0; color: #64748b; font-family: monospace;">Ref: ${surat.id}</p>
              </div>
            </div>
          ` : `
            <div style="height: 70px; border: 1px border #cbd5e1; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-style: italic; font-size: 10px;">
              [ Menunggu TTD Digital ]
            </div>
          `}
        </div>

        <p style="margin: 0; font-weight: bold; text-decoration: underline;">${surat.penandatanganNama}</p>
        <p style="margin: 2px 0 0 0; font-size: 11px;">NIP. ${surat.penandatanganNip}</p>
      </div>
    </div>

    <!-- FOOTER SURAT RESMI -->
    <div style="margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #64748b;">
      <div>
        <p style="margin: 0;">${instansi.footerText || 'Dokumen resmi terdaftar di Sistem Persuratan Digital'}</p>
        <p style="margin: 2px 0 0 0;">Cetak / Akses Verifikasi: ${verifyUrl}</p>
      </div>
      <div>
        <p style="margin: 0; font-weight: bold;">Status: ${surat.status.toUpperCase()}</p>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    if (options?.autoDownload) {
      pdf.save(`Surat_${surat.nomorSurat.replace(/[\/\\]/g, '_')}.pdf`);
    }

    if (options?.printWindow) {
      const blobUrl = pdf.output('bloburl');
      window.open(blobUrl as unknown as string, '_blank');
    }

    return pdf;
  } finally {
    document.body.removeChild(container);
  }
}
