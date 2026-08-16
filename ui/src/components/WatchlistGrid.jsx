import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

export default function WatchlistGrid({ 
  products = [], 
  currency = 'USD', 
  onDeleteProduct, 
  onRefreshProduct, 
  onOpenModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.store?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-6 flex-grow">
      
      {/* Section Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            Your watchlist
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Auto-updates every 30s • Live market synchronization
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Filter tracked or catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border-2 border-zinc-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 shadow-inner transition-all"
          />
        </div>
      </div>

      {/* Grid Content or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-700/80 rounded-2xl p-12 text-center shadow-2xl shadow-black/80 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-zinc-950 border border-zinc-700 rounded-2xl flex items-center justify-center text-purple-400 mb-4 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-base mb-1">No products tracked yet</h3>
          <p className="text-zinc-400 text-xs max-w-md mb-6 leading-relaxed">
            Add products from our live catalog (DummyJSON + FakeStore) or paste any URL to start tracking price movements.
          </p>
          <button 
            onClick={onOpenModal}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-purple-600/40 border border-purple-400/30 transition-all active:scale-95 cursor-pointer"
          >
            Add first product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              currency={currency} 
              onDelete={onDeleteProduct}
              onRefresh={onRefreshProduct}
            />
          ))}
        </div>
      )}

    </main>
  );
}