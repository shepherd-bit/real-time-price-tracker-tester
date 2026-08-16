import { Activity, TrendingDown, Clock, Download, Plus, Zap } from 'lucide-react';

export default function Navbar({ 
  stats = { tracked: 0, drops: 0, checks: 0 }, 
  currency = 'USD', 
  onCurrencyChange, 
  onExportCsv, 
  onOpenModal 
}) {
  return (
    <header className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-700/85 shadow-2xl shadow-black/60 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section: Brand & Live Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-700 px-4 py-2 rounded-xl shadow-inner">
            <div className="bg-purple-600 p-2 rounded-lg shadow-lg shadow-purple-600/40 text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-wider text-white text-lg flex items-center gap-1.5">
                PULSE REAL
              </h1>
              <span className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase">
                V3 • LIVE TRACKER
              </span>
            </div>
          </div>

          {/* Restored Pulsing Live Status Pill */}
          <div className="flex items-center gap-2 bg-zinc-950/80 border border-emerald-500/40 px-3.5 py-2 rounded-full shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Right Section: Stats, Currency, Export, & Add Action */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="hidden lg:flex items-center gap-4 bg-zinc-950/70 border border-zinc-800/80 px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 shadow-inner">
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" />
              <span><strong className="text-white">{stats.tracked}</strong> Tracked</span>
            </div>
            <div className="h-3 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white">{stats.drops}</strong> Drops</span>
            </div>
            <div className="h-3 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span><strong className="text-white">{stats.checks}</strong> Checks</span>
            </div>
          </div>

          <button 
            onClick={onExportCsv}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>

          <div className="flex items-center bg-zinc-950 border border-zinc-800 p-1 rounded-xl shadow-inner">
            <button 
              onClick={() => onCurrencyChange?.('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              USD
            </button>
            <button 
              onClick={() => onCurrencyChange?.('KES')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'KES' 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              KES
            </button>
          </div>

          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-purple-600/40 border border-purple-400/30 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Product</span>
          </button>

        </div>

      </div>
    </header>
  );
}