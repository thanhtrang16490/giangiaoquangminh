'use client';

import { useState } from 'react';

const newsItems = [
  { id: 1, title: 'Tiêu Chuẩn An Toàn Mới Cho Giàn Giáo Ringlock 2026',          date: '15 tháng 3, 2026', category: 'An Toàn',   image: 'https://images.unsplash.com/photo-1581094794321-3c5d4f5326b6?w=800&auto=format&fit=crop', excerpt: 'Cập nhật các tiêu chuẩn an toàn mới nhất cho hệ thống giàn giáo ringlock theo quy định của Bộ Xây Dựng.' },
  { id: 2, title: 'Ưu Điểm Của Giàn Giáo Ringlock So Với Giàn Giáo Truyền Thống', date: '10 tháng 3, 2026', category: 'Kỹ Thuật', image: 'https://images.unsplash.com/photo-1541888946425-d63b588b44ab?w=800&auto=format&fit=crop', excerpt: 'Phân tích chi tiết ưu điểm vượt trội của hệ thống ringlock: lắp nhanh, chịu tải cao, tái sử dụng nhiều lần.' },
  { id: 3, title: 'Dự Án: Giàn Giáo Cho Nhà Máy Lọc Dầu Nghi Sơn',               date: '5 tháng 3, 2026',  category: 'Dự Án',    image: 'https://images.unsplash.com/photo-1542744173-8e7e5340d51a?w=800&auto=format&fit=crop', excerpt: 'Cung cấp và lắp dựng hơn 5.000 tấn giàn giáo ringlock cho dự án nhà máy lọc dầu Nghi Sơn, Thanh Hóa.' },
  { id: 4, title: 'Hướng Dẫn Chọn Xà Gồ Thép Phù Hợp Cho Nhà Xưởng',             date: '28 tháng 2, 2026', category: 'Xà Gồ',    image: 'https://images.unsplash.com/photo-1545235617-946d1d1e3ab1?w=800&auto=format&fit=crop', excerpt: 'Hướng dẫn kỹ thuật lựa chọn xà gồ C, Z phù hợp với tải trọng và khẩu độ nhà xưởng công nghiệp.' },
  { id: 5, title: 'Khai Trương Kho Hàng Mới Tại Hà Nội',                           date: '20 tháng 2, 2026', category: 'Công Ty',  image: 'https://images.unsplash.com/photo-1511578314323-4ebdeea3b9a1?w=800&auto=format&fit=crop', excerpt: 'Mở rộng hệ thống phân phối với kho hàng mới tại Hà Nội, rút ngắn thời gian giao hàng cho khu vực miền Bắc.' },
  { id: 6, title: 'Giải Pháp Giàn Giáo Xanh – Tiết Kiệm Chi Phí Công Trình',      date: '15 tháng 2, 2026', category: 'Giải Pháp', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop', excerpt: 'Mô hình thuê giàn giáo ringlock giúp tiết kiệm 40% chi phí so với mua mới, phù hợp cho công trình ngắn hạn.' },
];

const categoryMap: Record<string, string> = { all: 'Tất Cả', 'an toàn': 'An Toàn', 'kỹ thuật': 'Kỹ Thuật', 'dự án': 'Dự Án', 'xà gồ': 'Xà Gồ', 'công ty': 'Công Ty', 'giải pháp': 'Giải Pháp' };

export default function News() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="news" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold uppercase tracking-widest text-sm mb-3">Tin Tức</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tin Tức & Kiến Thức</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Cập nhật thông tin mới nhất về giàn giáo ringlock, xà gồ và các dự án tiêu biểu
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(categoryMap).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {categoryMap[category]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">{item.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg>
                  {item.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.excerpt}</p>
                <button className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center text-sm">
                  Đọc thêm
                  <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300 shadow-sm">
            Xem Tất Cả Tin Tức
          </button>
        </div>
      </div>
    </section>
  );
}
