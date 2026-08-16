import { Bell } from 'lucide-react';

export default function FooterBanner() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-6">
      <div className="bg-zinc-900/90 border-2 border-zinc-700/85 rounded-2xl p-4 md:px-6 shadow-2xl shadow-black/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left Side: Notification Info */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-950/80 border border-purple-700/50 p-2.5 rounded-xl text-purple-400 shadow-inner">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-zinc-200 tracking-wide">
              Browser notifications enabled for drops &gt; 5%
            </p>
            <p className="text-zinc-400 mt-0.5">
              We simulate real market movement every 30s. Drops trigger toasts – native notification.
            </p>
          </div>
        </div>

        {/* Right Side: Sync Active Badge with High-Intensity Blinking Dot */}
        <div className="flex items-center gap-2.5 bg-zinc-950 border-2 border-zinc-800 px-4 py-2 rounded-xl shadow-inner text-zinc-300 font-semibold">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90 duration-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
          </span>
          <span>Sync active • AllOrigins proxy for custom URLs</span>
        </div>

      </div>
    </footer>
  );
}