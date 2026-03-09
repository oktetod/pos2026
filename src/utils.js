// === KUMPULAN FUNGSI ALAT BANTU (UTILITIES) ===
// Memisahkan fungsi logika ke sini membuat file App.jsx jauh lebih ringan dan mudah dibaca.

export const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
};
  
export const generateInvoiceID = () => {
    const date = new Date();
    const dtm = `${date.getFullYear().toString().slice(-2)}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${dtm}-${random}`;
};

export const getCatEmoji = (cat) => {
    const lower = cat.toLowerCase();
    if(lower.includes('makan')) return '🍛';
    if(lower.includes('minum')) return '🍹';
    if(lower.includes('cemil') || lower.includes('snack')) return '🍟';
    if(lower === 'semua') return '🛒';
    return '📦';
};

export const generateRawTextReceipt = (trx) => {
    let text = "       GG PASORYAN       \n";
    text += "   Jl. Enterprise No.1   \n";
    text += "--------------------------------\n";
    text += `No   : ${trx.id}\n`;
    text += `Tgl  : ${new Date(trx.timestamp).toLocaleString('id-ID')}\n`;
    text += `Kasir: ${trx.kasirName}\n`;
    text += "--------------------------------\n";
    (trx.items || []).forEach(item => {
      text += `${item.name}\n`;
      text += `${item.qty} x ${item.price}      ${item.qty * item.price}\n`;
    });
    text += "--------------------------------\n";
    text += `Subtotal : ${trx.subtotal}\n`;
    if (trx.discount > 0) text += `Diskon   : -${trx.discount}\n`;
    if (trx.tax > 0) text += `PPN 10%  : +${trx.tax}\n`;
    text += `TOTAL    : Rp ${trx.total}\n`;
    text += `Bayar    : ${trx.paymentMethod}\n`;
    text += "--------------------------------\n";
    text += "   Terima kasih atas kunjungan  \n";
    text += "            Anda!               \n\n\n";
    return text;
};

export const downloadCSV = (data, filename, setAlertMsg) => {
    if (!data || data.length === 0) { 
        if(setAlertMsg) setAlertMsg("Tidak ada data untuk diekspor."); 
        return; 
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\n');
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
