import { useState } from 'react';
import { TrendingDown, TrendingUp, Minus, ExternalLink, Trash2, RefreshCw } from 'lucide-react';

export default function ProductCard({ 
  product, 
  currency = 'USD', 
  onDelete, 
  onRefresh 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Fallback / default values if props aren't fully populated yet
  const {
    id = '1',
    title = 'Sample Tracked Product',
    store = 'DummyJSON',
    price = 299.99,
    originalPrice = 349.99,
    currencySymbol = '$',
    category = 'Electronics',
    url = '#',
    image = 'public/product-card/smart-product.PNG',
    lastChecked = 'Just now',
    priceChange = -14.2 // negative means drop
  } = product || {};

  const isDrop = priceChange < 0;
  const isGain = priceChange > 0;
  
  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete?.(id);
    }, 300); // matches transition time
  };

  // Currency conversion simulation helper if KES is selected
  const displayPrice = currency === 'KES' ? (price * 130).toFixed(2) : price;
  const displayOriginal = currency === 'KES' ? (originalPrice * 130).toFixed(2) : originalPrice;
  const currSym = currency === 'KES' ? 'KES ' : currencySymbol;

  return (
    <div className={`bg-zinc-900 border-2 border-zinc-700/80 rounded-2xl p-5 shadow-2xl shadow-black/80 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-950/30 group ${
      isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      
      {/* Top Section: Store badge, Category, and Action Buttons */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-inner">
              {store}
            </span>
            <span className="text-zinc-500 text-xs font-medium">
              {category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onRefresh?.(id)}
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Refresh Price Now"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Open External Link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button 
              onClick={handleDeleteClick}
              className="p-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-400 rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Delete Product"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Image and Title Row */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-zinc-950 border-2 border-zinc-700 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug tracking-wide group-hover:text-purple-300 transition-colors">
              {title}
            </h3>
            <span className="inline-block mt-1.5 text-[11px] text-zinc-400 font-medium bg-zinc-950/60 border border-zinc-800 px-2 py-0.5 rounded-md">
              Checked {lastChecked}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Price Details & Trend Status */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-end justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block mb-0.5">
            Current Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white tracking-tight">
              {currSym}{displayPrice}
            </span>
            {originalPrice && (
              <span className="text-xs text-zinc-500 line-through font-semibold">
                {currSym}{displayOriginal}
              </span>
            )}
          </div>
        </div>

        {/* Trend Indicator Pill */}
        <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-bold text-xs shadow-inner ${
          isDrop 
            ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-400' 
            : isGain 
            ? 'bg-red-950/80 border-red-700/80 text-red-400' 
            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
        }`}>
          {isDrop ? (
            <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : isGain ? (
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          )}
          <span>{Math.abs(priceChange)}%</span>
        </div>
      </div>

    </div>
  );
}