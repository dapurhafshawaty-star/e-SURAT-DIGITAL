import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { MasterInstansi, SuratKeluar } from '../types';
import { formatTanggalIndo } from './formatter';

export async function generateSuratMasukPdf(
  surat: any,
  instansi: MasterInstansi,
  options?: { autoDownload?: boolean; printWindow?: boolean }
): Promise<jsPDF> {
  const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(surat.nomorSurat || surat.nomorAgenda)}`;
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 });
  } catch (err) {
    console.error('Failed to generate QR code', err);
  }

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '794px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.padding = '35px 45px';
  container.style.boxSizing = 'border-box';

  const fontFamily = instansi.fontFamilyHeader || 'Arial';
  const kopAlign = instansi.kopAlign || 'center';
  const logoSize = instansi.logoSize || 70;

  const logoLeftHtml = instansi.logo
    ? `<img src="${instansi.logo}" style="width: ${logoSize}px; height: ${logoSize}px; object-fit: contain;" />`
    : `<div style="width: ${logoSize}px; height: ${logoSize}px; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 10px;">LOGO</div>`;

  const logoRightHtml = instansi.logoKanan
    ? `<img src="${instansi.logoKanan}" style="width: ${logoSize}px; height: ${logoSize}px; object-fit: contain;" />`
    : '';

  const baris1Html = instansi.barisAtasHeader
    ? `<h5 style="margin: 0; font-size: ${instansi.barisAtasSize || 13}px; font-weight: ${instansi.barisAtasBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.barisAtasUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.barisAtasHeader}</h5>`
    : '';

  const baris2Html = `<h4 style="margin: 0; font-size: ${instansi.namaInstansiSize || 16}px; font-weight: ${instansi.namaInstansiBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.namaInstansiUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.nama}</h4>`;

  const baris3Html = instansi.namaYayasan
    ? `<h3 style="margin: 0; font-size: ${instansi.subHeaderSize || 13}px; font-weight: ${instansi.subHeaderBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.subHeaderUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.namaYayasan}</h3>`
    : '';

  container.innerHTML = `
    <div style="display: flex; align-items: center; gap: 15px; text-align: ${kopAlign}; justify-content: ${kopAlign === 'left' ? 'flex-start' : kopAlign === 'right' ? 'flex-end' : 'center'}; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; font-family: '${fontFamily}', sans-serif;">
      <div style="flex-shrink: 0;">${logoLeftHtml}</div>
      <div style="flex-grow: 1;">
        ${baris1Html}
        ${baris2Html}
        ${baris3Html}
        <p style="margin: 2px 0; font-size: ${instansi.alamatSize || 11}px; color: #475569; font-style: ${instansi.alamatItalic ? 'italic' : 'normal'};">${instansi.alamat} - Telp: ${instansi.telepon}</p>
        <p style="margin: 0; font-size: 12px; font-weight: bold; color: #0284c7; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">LEMBAR DISPOSISI & DETAIL SURAT MASUK</p>
      </div>
      ${logoRightHtml ? `<div style="flex-shrink: 0;">${logoRightHtml}</div>` : ''}
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
      <tr style="background-color: #f8fafc;">
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; width: 20%;">Nomor Agenda</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; width: 30%; color: #0284c7; font-weight: bold;">${surat.nomorAgenda || '-'}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; width: 20%;">Tgl. Diterima</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; width: 30%;">${formatTanggalIndo(surat.tanggalTerima || new Date().toISOString())}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Nomor Surat</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">${surat.nomorSurat}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Tgl. Surat</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">${formatTanggalIndo(surat.tanggalSurat || new Date().toISOString())}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Asal / Pengirim</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;" colspan="3"><b>${surat.asalSurat || surat.pengirimInstansi}</b></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Sifat Surat</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">${surat.sifatSurat || 'Biasa'}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Klasifikasi</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">${surat.klasifikasiKode || '-'}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Perihal</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;" colspan="3"><b>${surat.perihal}</b></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Ringkasan Isi</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; line-height: 1.5;" colspan="3">${surat.ringkasanIsi || surat.perihal}</td>
      </tr>
    </table>

    <div style="margin-top: 25px; border: 1px solid #0f172a; border-radius: 6px; padding: 15px; background-color: #ffffff;">
      <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">INTRUKSI / CATATAN DISPOSISI PIMPIMAN</h4>
      <div style="min-height: 120px; font-size: 12px; color: #334155;">
        ${surat.disposisiLog && surat.disposisiLog.length > 0
          ? surat.disposisiLog.map((d: any) => `
              <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                <p style="margin: 0; font-weight: bold; color: #0284c7;">Dari: ${d.pengirimNama} ➔ Kepada: ${d.penerimaNama} (${d.unitTujuan})</p>
                <p style="margin: 2px 0; font-style: italic;">"${d.instruksi}"</p>
                <p style="margin: 0; font-size: 10px; color: #94a3b8;">Status: ${d.status} | Tanggal: ${formatTanggalIndo(d.tanggalDisposisi)}</p>
              </div>
            `).join('')
          : '<p style="color: #94a3b8; font-style: italic;">[ Belum ada disposisi dicatat ]</p>'
        }
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; font-size: 11px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        ${qrDataUrl ? `<img src="${qrDataUrl}" style="width: 60px; height: 60px;" />` : ''}
        <div>
          <p style="margin: 0; font-weight: bold; color: #0f172a;">E-SURAT DISPOSISI VERIFIED</p>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 9px;">Petugas Input: ${surat.petugasInput || 'Operator'}</p>
        </div>
      </div>
      <div style="text-align: center; width: 220px;">
        <p style="margin: 0; font-weight: bold;">Pimpinan / Kepala Instansi</p>
        <div style="height: 60px;"></div>
        <p style="margin: 0; font-weight: bold; text-decoration: underline;">( ..................................... )</p>
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
      pdf.save(`Detail_Surat_Masuk_${(surat.nomorAgenda || 'surat').replace(/[\/\\]/g, '_')}.pdf`);
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

  const fontFamily = instansi.fontFamilyHeader || 'Times New Roman';
  const kopAlign = instansi.kopAlign || 'center';
  const logoSize = instansi.logoSize || 70;

  const logoLeftHtml = instansi.logo
    ? `<img src="${instansi.logo}" style="width: ${logoSize}px; height: ${logoSize}px; object-fit: contain;" />`
    : `<div style="width: ${logoSize}px; height: ${logoSize}px; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 10px;">LOGO</div>`;

  const logoRightHtml = instansi.logoKanan
    ? `<img src="${instansi.logoKanan}" style="width: ${logoSize}px; height: ${logoSize}px; object-fit: contain;" />`
    : '';

  let kopGarisHtml = '';
  if (instansi.kopGarisStyle === 'double' || (!instansi.kopGarisStyle && instansi.kopGarisGanda)) {
    kopGarisHtml = `<div style="margin-top: 8px; margin-bottom: 20px;"><div style="border-top: 2px solid #000;"></div><div style="border-top: 1px solid #000; margin-top: 2px;"></div></div>`;
  } else if (instansi.kopGarisStyle === 'single_thick') {
    kopGarisHtml = `<div style="border-top: 2px solid #000; margin-top: 8px; margin-bottom: 20px;"></div>`;
  } else if (instansi.kopGarisStyle === 'dashed') {
    kopGarisHtml = `<div style="border-top: 2px dashed #000; margin-top: 8px; margin-bottom: 20px;"></div>`;
  } else {
    kopGarisHtml = `<div style="margin-bottom: 20px;"></div>`;
  }

  const baris1Html = instansi.barisAtasHeader
    ? `<h5 style="margin: 0; font-size: ${instansi.barisAtasSize || 13}px; font-weight: ${instansi.barisAtasBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.barisAtasUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.barisAtasHeader}</h5>`
    : '';

  const baris2Html = `<h4 style="margin: 0; font-size: ${instansi.namaInstansiSize || 16}px; font-weight: ${instansi.namaInstansiBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.namaInstansiUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.nama}</h4>`;

  const baris3Html = instansi.namaYayasan
    ? `<h3 style="margin: 0; font-size: ${instansi.subHeaderSize || 13}px; font-weight: ${instansi.subHeaderBold ?? true ? 'bold' : 'normal'}; text-transform: ${instansi.subHeaderUppercase ?? true ? 'uppercase' : 'none'}; line-height: 1.2;">${instansi.namaYayasan}</h3>`
    : '';

  const alamatHtml = `<p style="margin: 2px 0 0 0; font-size: ${instansi.alamatSize || 11}px; font-style: ${instansi.alamatItalic ? 'italic' : 'normal'}; line-height: 1.25;">${instansi.alamat} - Kode Pos ${instansi.kodePos}</p>`;

  const kontakHtml = `<p style="margin: 0; font-size: ${instansi.kontakSize || 10}px; font-style: ${instansi.kontakItalic ?? true ? 'italic' : 'normal'}; line-height: 1.2;">Telp: ${instansi.telepon} | Email: ${instansi.email} | Web: ${instansi.website}</p>`;

  container.innerHTML = `
    <!-- KOP SURAT RESMI -->
    <div style="display: flex; align-items: center; gap: 15px; text-align: ${kopAlign}; justify-content: ${kopAlign === 'left' ? 'flex-start' : kopAlign === 'right' ? 'flex-end' : 'center'}; font-family: '${fontFamily}', serif;">
      <div style="flex-shrink: 0;">${logoLeftHtml}</div>
      <div style="flex-grow: 1;">
        ${baris1Html}
        ${baris2Html}
        ${baris3Html}
        ${alamatHtml}
        ${kontakHtml}
      </div>
      ${logoRightHtml ? `<div style="flex-shrink: 0;">${logoRightHtml}</div>` : ''}
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
