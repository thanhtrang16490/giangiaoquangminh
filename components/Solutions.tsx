'use client';

import { useState } from 'react';

const categories = [
  { id: 'all',     label: 'Tất Cả'    },
  { id: 'chong',   label: 'Hệ Chống'  },
  { id: 'baoche',  label: 'Hệ Bao Che'},
  { id: 'phukien', label: 'Phụ Kiện'  },
];

const products = [
  {
    id: 1, category: 'chong',
    name: 'Thanh Chống Đứng – Hệ Chống', code: 'ZV-25 / ZV-20 / ZV-15 / ZV-10', spec: 'Ø48.3 × 3.2 mm',
    details: [
      { code: 'ZV-25', length: '2500 mm', weight: '13.08 kg' },
      { code: 'ZV-20', length: '2000 mm', weight: '10.58 kg' },
      { code: 'ZV-15', length: '1500 mm', weight: '~8.0 kg'  },
      { code: 'ZV-10', length: '1000 mm', weight: '5.62 kg'  },
    ],
    note: 'Mặt bích Ø59.9 mm. Mạ kẽm nhúng nóng tiêu chuẩn BS EN ISO 1461:2009',
  },
  {
    id: 2, category: 'chong',
    name: 'Giằng Ngang – Hệ Chống', code: 'ZH-12 / ZH-09 / ZH-06', spec: 'Ø48.3 × 2.5 mm',
    details: [
      { code: 'ZH-12', length: '1200 mm', weight: '4.22 kg' },
      { code: 'ZH-09', length: '900 mm',  weight: '3.31 kg' },
      { code: 'ZH-06', length: '600 mm',  weight: '2.04 kg' },
    ],
    note: 'Kèm lỗ cữ và chốt giằng ngang',
  },
  {
    id: 3, category: 'chong',
    name: 'Giằng Chéo – Hệ Chống', code: 'ZB-1215 / ZB-0915 / ZB-0615', spec: 'Ø33 × 2.3–2.5 mm',
    details: [
      { code: 'ZB-1215', length: '1200×1500 mm', weight: '5.07 kg' },
      { code: 'ZB-0915', length: '900×1500 mm',  weight: '4.77 kg' },
      { code: 'ZB-0615', length: '600×1500 mm',  weight: '4.18 kg' },
    ],
    note: 'Kèm lỗ cữ và chốt giằng chéo',
  },
  {
    id: 4, category: 'baoche',
    name: 'Thanh Chống Đứng – Hệ Bao Che', code: 'ZV-18B / ZV-15B / ZV-12B / ZV-09B', spec: 'Ø42.2 × 2.5 mm',
    details: [
      { code: 'ZV-18B', length: '1800 mm', weight: '7.12 kg' },
      { code: 'ZV-15B', length: '1500 mm', weight: '7.9 kg'  },
      { code: 'ZV-12B', length: '1200 mm', weight: '6.5 kg'  },
      { code: 'ZV-09B', length: '900 mm',  weight: '4.9 kg'  },
    ],
    note: 'Mặt bích 125 mm. Phù hợp hệ giàn giáo bao che công trình',
  },
  {
    id: 5, category: 'baoche',
    name: 'Giằng Ngang – Hệ Bao Che', code: 'ZH-18B đến ZH-06B', spec: 'Ø42.2 × 2.5 mm',
    details: [
      { code: 'ZH-18B', length: '1800 mm', weight: '5.02 kg' },
      { code: 'ZH-15B', length: '1500 mm', weight: '4.30 kg' },
      { code: 'ZH-12B', length: '1200 mm', weight: '3.60 kg' },
      { code: 'ZH-09B', length: '900 mm',  weight: '2.82 kg' },
      { code: 'ZH-06B', length: '600 mm',  weight: '~2.0 kg' },
    ],
    note: 'Kèm lỗ cữ và chốt giằng ngang',
  },
  {
    id: 6, category: 'baoche',
    name: 'Giằng Chéo – Hệ Bao Che', code: 'ZX-18 / ZX-15 / ZX-12 / ZX-09 / ZX-06', spec: 'Ø21.2×2 / Ø27×2 mm',
    details: [
      { code: 'ZX-18', length: '1800×1200 mm', weight: '8.18 kg' },
      { code: 'ZX-15', length: '1500×1200 mm', weight: '4.20 kg' },
      { code: 'ZX-12', length: '1200×1200 mm', weight: '6.22 kg' },
      { code: 'ZX-09', length: '900×1200 mm',  weight: '5.24 kg' },
      { code: 'ZX-06', length: '600×1200 mm',  weight: '4.27 kg' },
    ],
    note: 'Kèm lỗ cữ và chốt giằng chéo',
  },
  {
    id: 7, category: 'phukien',
    name: 'Thép Hộp (Xà Gồ)', code: 'ZAKXG50 / ZAKXG100', spec: 'Tiết diện 50 mm & 100 mm',
    details: [
      { code: 'ZAKXG50*1.5m',  length: '1500 mm', weight: '4.52 kg'  },
      { code: 'ZAKXG50*3.0m',  length: '3000 mm', weight: '9.03 kg'  },
      { code: 'ZAKXG100*1.5m', length: '1500 mm', weight: '6.87 kg'  },
      { code: 'ZAKXG100*3.0',  length: '3000 mm', weight: '13.74 kg' },
    ],
    note: 'Thép hộp mạ kẽm nhúng nóng, dùng làm xà gồ đỡ sàn thao tác',
  },
  {
    id: 8, category: 'phukien',
    name: 'Kích Chân (Base Jack)', code: 'Base Jack', spec: 'Ren Ø38 mm, đế 150 mm',
    details: [{ code: 'Base Jack', length: 'Điều chỉnh được', weight: '—' }],
    note: 'Dùng ở chân cột đứng để cân bằng mặt sàn không phẳng',
  },
  {
    id: 9, category: 'phukien',
    name: 'Kích Đầu (U-Head Jack)', code: 'U-Head Jack', spec: 'Đầu U 140 mm, ren Ø60 mm',
    details: [{ code: 'U-Head Jack', length: 'Điều chỉnh được', weight: '—' }],
    note: 'Dùng ở đỉnh cột đứng để đỡ dầm/ván khuôn',
  },
];

export default function Solutions() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold uppercase tracking-widest text-sm mb-3">Sản Phẩm</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Danh Mục Sản Phẩm Quang Minh</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Giàn giáo ringlock và xà gồ xây dựng – tiêu chuẩn BS EN ISO 1461:2009, ASTM A123, JIS H8641:2007
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {categories.find(c => c.id === product.category)?.label}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{product.spec}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 font-mono mb-4">{product.code}</p>

                <div className="bg-gray-50 rounded-xl overflow-hidden mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-3 py-2 text-gray-600 font-semibold">Mã SP</th>
                        <th className="text-left px-3 py-2 text-gray-600 font-semibold">Kích thước</th>
                        <th className="text-right px-3 py-2 text-gray-600 font-semibold">Trọng lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(expandedProduct === product.id ? product.details : product.details.slice(0, 3)).map((row, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-3 py-2 font-mono text-gray-800">{row.code}</td>
                          <td className="px-3 py-2 text-gray-600">{row.length}</td>
                          <td className="px-3 py-2 text-right text-gray-600">{row.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {product.details.length > 3 && (
                    <button
                      onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                      className="w-full text-xs text-red-600 py-2 hover:bg-red-50 transition-colors"
                    >
                      {expandedProduct === product.id ? '▲ Thu gọn' : `▼ Xem thêm ${product.details.length - 3} mã`}
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{product.note}</p>
              </div>
              <div className="px-6 pb-5">
                <a href="#contact" className="block text-center py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300">
                  Yêu Cầu Báo Giá
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
