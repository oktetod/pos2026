// src/components/DashboardPanels.jsx
import React from 'react';
import { formatRupiah } from '../utils';
import { History, Package, BarChart3 } from 'lucide-react';

export default function DashboardPanels({ activeTab, props, theme }) {
  const { transactions, products, currentUser, handleReprintReceipt } = props;

  // Render berdasarkan activeTab
  return (
    <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${theme.bgBase} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TAB RIWAYAT */}
        {activeTab === 'history' && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <History className={theme.accent} size={28} />
              <h2 className={`text-xl md:text-2xl font-bold ${theme.textMain}`}>Riwayat Transaksi</h2>
            </div>
            <div className={`${theme.bgPanel} border ${theme.border} rounded-2xl overflow-hidden shadow-xl overflow-x-auto`}>
              <table className={`w-full text-left text-sm ${theme.textMain}`}>
                <thead className={`border-b ${theme.border} ${theme.textMuted}`}>
                  <tr><th className="p-4">Waktu</th><th className="p-4">Invoice</th><th className="p-4 text-right">Total</th></tr>
                </thead>
                <tbody className={`divide-y ${theme.border}`}>
                  {transactions.slice(0, 50).map(trx => (
                    <tr key={trx.id} className="hover:bg-black/10 transition-colors">
                      <td className="p-4 text-xs">{new Date(trx.timestamp).toLocaleString('id-ID')}</td>
                      <td className="p-4 font-mono font-bold">{trx.id}</td>
                      <td className={`p-4 text-right font-bold ${theme.accent}`}>{formatRupiah(trx.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TAB INVENTARIS */}
        {activeTab === 'inventory' && (
           <>
            <div className="flex items-center gap-3 mb-6">
              <Package className={theme.accent} size={28} />
              <h2 className={`text-xl md:text-2xl font-bold ${theme.textMain}`}>Master Inventaris</h2>
            </div>
            {/* Lanjutkan dengan kode tabel inventaris persis seperti sebelumnya, gunakan variabel theme untuk class CSS-nya */}
           </>
        )}

      </div>
    </div>
  );
      }
