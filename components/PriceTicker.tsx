'use client';

import { useState, useEffect, useRef } from 'react';

interface Product { code: string; name: string; price: number; unit: string; }

const BASE_PRODUCTS: Product[] = [
  { code: 'ZV-25',    name: 'Thanh đứng 2500mm',        price: 285000, unit: 'cây' },
  { code: 'ZV-20',    name: 'Thanh đứng 2000mm',        price: 235000, unit: 'cây' },
  { code: 'ZV-15',    name: 'Thanh đứng 1500mm',        price: 185000, unit: 'cây' },
  { code: 'ZV-10',    name: 'Thanh đứng 1000mm',        price: 135000, unit: 'cây' },
  { code: 'ZH-12',    name: 'Giằng ngang 1200mm',       price: 98000,  unit: 'cây' },
  { code: 'ZH-09',    name: 'Giằng ngang 900mm',        price: 78000,  unit: 'cây' },
  { code: 'ZH-06',    name: 'Giằng ngang 600mm',        price: 58000,  unit: 'cây' },
  { code: 'ZB-1215',  name: 'Giằng chéo 1200×1500',    price: 115000, unit: 'cây' },
  { code: 'ZB-0915',  name: 'Giằng chéo 900×1500',     price: 105000, unit: 'cây' },
  { code: 'ZX-18B',   name: 'Giằng chéo bao che 1800', price: 175000, unit: 'cây' },
  { code: 'ZAKXG50',  name: 'Thép hộp xà gồ 50mm',     price: 48000,  unit: 'kg'  },
  { code: 'ZAKXG100', name: 'Thép hộp xà gồ 100mm',    price: 52000,  unit: 'kg'  },
  { code: 'BASE-J',   name: 'Kích chân Base Jack',      price: 65000,  unit: 'cái' },
  { code: 'UHEAD-J',  name: 'Kích đầu U-Head Jack',    price: 72000,  unit: 'cái' },
];

interface Tick { price: number; change: number; changePct: number; direction: 'up' | 'down' | 'flat'; flash: boolean; }

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

export default function PriceTicker() {
  const [ticks, setTicks] = useState<Record<string, Tick>>(() =>
    Object.fromEntries(BASE_PRODUCTS.map(p => [p.code, { price: p.price, change: 0, changePct: 0, direction: 'flat' as const, flash: false }]))
  );
  const prevPrices = useRef<Record<string, number>>(Object.fromEntries(BASE_PRODUCTS.map(p => [p.code, p.price])));

  useEffect(() => {
    const interval = setInterval(() => {
      const count = 2 + Math.floor(Math.random() * 3);
      const shuffled = [...BASE_PRODUCTS].sort(() => Math.random() - 0.5).slice(0, count);

      setTicks(prev => {
        const next = { ...prev };
        shuffled.forEach(p => {
          const delta = Math.round((Math.random() - 0.48) * prevPrices.current[p.code] * 0.016 / 500) * 500;
          const newPrice = Math.max(p.price * 0.85, prevPrices.current[p.code] + delta);
          prevPrices.current[p.code] = newPrice;
          next[p.code] = {
            price: newPrice,
            change: newPrice - p.price,
            changePct: ((newPrice - p.price) / p.price) * 100,
            direction: delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat',
            flash: true,
          };
        });
        return next;
      });

      setTimeout(() => {
        setTicks(prev => {
          const next = { ...prev };
          shuffled.forEach(p => { if (next[p.code]) next[p.code] = { ...next[p.code], flash: false }; });
          return next;
        });
      }, 600);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-950 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-red-500 font-semibold uppercase tracking-widest text-xs mb-1">Bảng Giá Thời Gian Thực</p>
            <h2 className="text-2xl font-bold text-white">Giá Sản Phẩm Hôm Nay</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Cập nhật liên tục
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {BASE_PRODUCTS.map(p => {
            const tick = ticks[p.code];
            const isUp   = tick.direction === 'up';
            const isDown = tick.direction === 'down';
            return (
              <div
                key={p.code}
                className={`relative rounded-xl p-4 border transition-all duration-300 ${
                  tick.flash && isUp   ? 'bg-green-950 border-green-700' :
                  tick.flash && isDown ? 'bg-red-950 border-red-800' :
                  'bg-gray-900 border-gray-800'
                }`}
              >
                <div className="text-xs font-mono text-gray-400 mb-1">{p.code}</div>
                <div className="text-xs text-gray-300 mb-3 leading-tight min-h-[2.5rem]">{p.name}</div>
                <div className={`text-lg font-bold tabular-nums transition-colors duration-300 ${isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-white'}`}>
                  {fmt(tick.price)}
                </div>
                <div className="text-xs text-gray-500 mb-2">/{p.unit}</div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${tick.change > 0 ? 'text-green-400' : tick.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                  {tick.change > 0 && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" /></svg>}
                  {tick.change < 0 && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" /></svg>}
                  {tick.change === 0 ? '—' : `${tick.change > 0 ? '+' : ''}${fmt(Math.abs(tick.change))} (${tick.changePct > 0 ? '+' : ''}${tick.changePct.toFixed(2)}%)`}
                </div>
                <div className="mt-3 h-1 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isUp ? 'bg-green-500' : isDown ? 'bg-red-500' : 'bg-gray-600'}`}
                    style={{ width: `${Math.min(100, Math.max(10, 50 + tick.changePct * 20))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          * Giá tham khảo, chưa bao gồm VAT. Liên hệ để nhận báo giá chính thức.
        </p>
      </div>
    </section>
  );
}
