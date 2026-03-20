'use client';

import { useState, useEffect, useRef } from 'react';

const PRODUCTS = [
  { code: 'ZV-25',    name: 'Thanh đứng 2500mm',      price: 285000 },
  { code: 'ZV-20',    name: 'Thanh đứng 2000mm',      price: 235000 },
  { code: 'ZV-15',    name: 'Thanh đứng 1500mm',      price: 185000 },
  { code: 'ZV-10',    name: 'Thanh đứng 1000mm',      price: 135000 },
  { code: 'ZH-12',    name: 'Giằng ngang 1200mm',     price: 98000  },
  { code: 'ZH-09',    name: 'Giằng ngang 900mm',      price: 78000  },
  { code: 'ZH-06',    name: 'Giằng ngang 600mm',      price: 58000  },
  { code: 'ZB-1215',  name: 'Giằng chéo 1200×1500',  price: 115000 },
  { code: 'ZB-0915',  name: 'Giằng chéo 900×1500',   price: 105000 },
  { code: 'ZX-18B',   name: 'Giằng chéo bao che 1800', price: 175000 },
  { code: 'ZAKXG50',  name: 'Thép hộp xà gồ 50mm',   price: 48000  },
  { code: 'ZAKXG100', name: 'Thép hộp xà gồ 100mm',  price: 52000  },
  { code: 'BASE-J',   name: 'Kích chân Base Jack',    price: 65000  },
  { code: 'UHEAD-J',  name: 'Kích đầu U-Head Jack',  price: 72000  },
];

interface Tick { price: number; change: number; pct: number; }

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

function TickItem({ code }: { code: string }) {
  const base = PRODUCTS.find(p => p.code === code)!.price;
  const [tick, setTick] = useState<Tick>({ price: base, change: 0, pct: 0 });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ code: string; tick: Tick }>).detail;
      if (detail.code === code) setTick(detail.tick);
    };
    window.addEventListener('price-update', handler);
    return () => window.removeEventListener('price-update', handler);
  }, [code]);

  const up   = tick.change > 0;
  const down = tick.change < 0;

  return (
    <span className="inline-flex items-center gap-2 px-6 border-r border-gray-800 select-none">
      <span className="text-gray-400 text-xs font-mono">{code}</span>
      <span className="text-white text-xs font-semibold tabular-nums">{fmt(tick.price)}</span>
      <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? 'text-green-400' : down ? 'text-red-400' : 'text-gray-500'}`}>
        {up && <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" /></svg>}
        {down && <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" /></svg>}
        {tick.pct === 0 ? '0.00%' : `${tick.pct > 0 ? '+' : ''}${tick.pct.toFixed(2)}%`}
      </span>
    </span>
  );
}

export default function MarqueeBar() {
  const tickRef = useRef<Record<string, Tick>>(
    Object.fromEntries(PRODUCTS.map(p => [p.code, { price: p.price, change: 0, pct: 0 }]))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const count = 2 + Math.floor(Math.random() * 3);
      const picks = [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, count);
      picks.forEach(p => {
        const prev  = tickRef.current[p.code].price;
        const delta = Math.round((Math.random() - 0.48) * p.price * 0.015 / 500) * 500;
        const newPrice = Math.max(p.price * 0.85, prev + delta);
        const tick: Tick = { price: newPrice, change: newPrice - p.price, pct: ((newPrice - p.price) / p.price) * 100 };
        tickRef.current[p.code] = tick;
        window.dispatchEvent(new CustomEvent('price-update', { detail: { code: p.code, tick } }));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const track = [...PRODUCTS, ...PRODUCTS];

  return (
    <div className="bg-gray-950 border-b border-gray-800 h-9 flex items-center overflow-hidden relative z-40">
      <div className="flex-shrink-0 bg-red-600 h-full flex items-center px-4 z-10">
        <span className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">Giá Hôm Nay</span>
      </div>
      <div className="overflow-hidden flex-1 relative">
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          {track.map((p, i) => <TickItem key={i} code={p.code} />)}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none z-10" />
    </div>
  );
}
