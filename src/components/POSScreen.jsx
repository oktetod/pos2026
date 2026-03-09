// src/components/POSScreen.jsx
import React from 'react';
import { Search, ShoppingCart, Trash2, Minus, Plus, Banknote, Edit2, PauseCircle, X } from 'lucide-react';
import { formatRupiah, getCatEmoji } from '../utils';

export default function POSScreen({ props, theme }) {
  const { 
    searchQuery, setSearchQuery, activeCategory, setActiveCategory, displayCategories, 
    filteredProductsSafe, addToCart, cart, updateQty, clearCart, isCartOpen, setIsCartOpen,
    discount, setDiscount, taxEnabled, setTaxEnabled, subtotal, taxAmount, grandTotal,
    setCheckoutModalOpen, editingTransactionId, handleHoldBill
  } = props;

  return (
    <div className="flex-1 flex h-full min-h-0 relative">
      {/* AREA PRODUK */}
      <div className={`flex-1 flex flex-col min-w-0 ${editingTransactionId ? 'pt-10' : ''}`}>
        {/* Header Pencarian & Kategori (Mobile Friendly: Scroll-x) */}
        <div className={`p-4 space-y-4 shrink-0 ${theme.bgPanel} backdrop-blur-sm`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={20} />
            <input type="text" placeholder="Cari barang..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
              className={`w-full bg-transparent border ${theme.border} ${theme.textMain} rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-current transition-all`} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {displayCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all border ${activeCategory === cat ? theme.buttonBg + ' ' + theme.buttonText : 'bg-transparent border-current ' + theme.textMuted}`}>
                <span className="text-lg">{getCatEmoji(cat)}</span> {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Produk Responsive */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-24 md:pb-4 mt-2">
            {filteredProductsSafe.map(product => {
              const isOutOfStock = (product.stock || 0) <= 0;
              return (
                <div key={product.id} onClick={() => !isOutOfStock && addToCart(product)} 
                  className={`${theme.bgPanel} border ${theme.border} rounded-2xl p-3 md:p-4 flex flex-col h-full shadow-md ${isOutOfStock ? 'opacity-50 grayscale' : 'cursor-pointer hover:scale-[1.02]'} transition-transform relative`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase ${theme.accent}`}>{product.category}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20">Stok: {product.stock}</span>
                  </div>
                  <h3 className={`font-semibold text-sm md:text-base leading-tight my-2 flex-1 ${theme.textMain}`}>{product.name}</h3>
                  <div className={`font-bold text-base md:text-lg ${theme.accent}`}>{formatRupiah(product.price)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* PANEL KERANJANG (Slide-in di HP, Fixed di Desktop) */}
      <div className={`fixed lg:static inset-y-0 right-0 z-50 w-full md:w-[380px] ${theme.bgPanel} backdrop-blur-xl border-l ${theme.border} flex flex-col shadow-2xl transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className={`p-4 border-b ${theme.border} flex justify-between items-center shrink-0`}>
          <h2 className={`font-bold ${theme.textMain}`}>Struk Pembelian</h2>
          <div className="flex gap-2">
            <button onClick={handleHoldBill} disabled={cart.length===0} className="p-2 disabled:opacity-30"><PauseCircle size={20} className={theme.textMain}/></button>
            <button onClick={clearCart} disabled={cart.length===0} className="p-2 disabled:opacity-30"><Trash2 size={20} className="text-red-500"/></button>
            <button onClick={() => setIsCartOpen(false)} className="lg:hidden p-2"><X size={20} className={theme.textMain}/></button>
          </div>
        </div>
        
        {/* List Item Keranjang */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.map(item => (
            <div key={item.id} className={`flex gap-3 bg-black/10 p-3 rounded-xl border ${theme.border} items-center`}>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold text-sm truncate ${theme.textMain}`}>{item.name}</h4>
                <div className={`text-xs mt-1 ${theme.accent}`}>{formatRupiah(item.price)}</div>
              </div>
              <div className="flex items-center rounded-lg border border-current shrink-0 h-8">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-full flex items-center justify-center"><Minus size={14} /></button>
                <span className={`w-6 text-center text-sm font-bold ${theme.textMain}`}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-full flex items-center justify-center"><Plus size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Kalkulasi Total */}
        <div className={`p-4 border-t ${theme.border} shrink-0 space-y-3`}>
          <div className="flex justify-between items-center border-t border-current pt-2">
            <span className="text-sm font-bold">Total Pembayaran</span>
            <span className={`text-xl font-black ${theme.accent}`}>{formatRupiah(grandTotal)}</span>
          </div>
          <button onClick={() => setCheckoutModalOpen(true)} disabled={cart.length === 0} 
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all disabled:opacity-50 ${theme.buttonBg} ${theme.buttonText}`}>
            <Banknote size={20} /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
        }
