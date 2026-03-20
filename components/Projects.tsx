'use client';

import { useState } from 'react';

const projects = [
  { id: 1, title: 'Sunshine City',       location: 'Hà Nội',              category: 'Nhà Ở',      image: 'https://images.unsplash.com/photo-1541888946425-d63b588b44ab?w=800&auto=format&fit=crop', description: 'Cung cấp giàn giáo ringlock cho dự án khu đô thị Sunshine City, Hà Nội' },
  { id: 2, title: 'Sunshine Saigon',     location: 'TP. Hồ Chí Minh',     category: 'Nhà Ở',      image: 'https://images.unsplash.com/photo-1545235617-946d1d1e3ab1?w=800&auto=format&fit=crop', description: 'Hệ thống giàn giáo bao che và chống cho dự án Sunshine Saigon tại TP.HCM' },
  { id: 3, title: 'VinFast',             location: 'Hải Phòng',           category: 'Công Nghiệp', image: 'https://images.unsplash.com/photo-1581094794321-3c5d4f5326b6?w=800&auto=format&fit=crop', description: 'Giàn giáo ringlock phục vụ thi công nhà máy sản xuất ô tô VinFast tại Hải Phòng' },
  { id: 4, title: 'Hòa Phát',            location: 'Hải Dương',           category: 'Công Nghiệp', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop', description: 'Cung cấp giàn giáo cho dự án mở rộng nhà máy thép Hòa Phát' },
  { id: 5, title: 'Vinhomes Imperia',    location: 'Hải Phòng',           category: 'Nhà Ở',      image: 'https://images.unsplash.com/photo-1542744173-8e7e5340d51a?w=800&auto=format&fit=crop', description: 'Hệ giàn giáo ringlock cho khu đô thị cao cấp Vinhomes Imperia, Hải Phòng' },
  { id: 6, title: 'Marriott Hotel',      location: 'Đà Nẵng',             category: 'Khách Sạn',  image: 'https://images.unsplash.com/photo-1511578314323-4ebdeea3b9a1?w=800&auto=format&fit=crop', description: 'Giàn giáo bao che và chống cho dự án khách sạn Marriott 5 sao tại Đà Nẵng' },
  { id: 7, title: 'Celadon City',        location: 'Tân Phú, TP.HCM',     category: 'Nhà Ở',      image: 'https://images.unsplash.com/photo-1541888942495-4db05b2d4e9b?w=800&auto=format&fit=crop', description: 'Cung cấp giàn giáo ringlock cho dự án Celadon City, Tân Phú' },
  { id: 8, title: 'Midtown – Phú Mỹ Hưng', location: 'TP. Hồ Chí Minh', category: 'Nhà Ở',      image: 'https://images.unsplash.com/photo-1581094794321-3c5d4f5326b6?w=800&auto=format&fit=crop', description: 'Hệ thống giàn giáo cho khu đô thị Midtown tại Phú Mỹ Hưng, TP.HCM' },
];

const categoryMap: Record<string, string> = { all: 'Tất Cả', 'Nhà Ở': 'Nhà Ở', 'Công Nghiệp': 'Công Nghiệp', 'Khách Sạn': 'Khách Sạn' };

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold uppercase tracking-widest text-sm mb-3">Dự Án</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Công Trình Tiêu Biểu</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Giàn giáo Quang Minh đã được tin dùng tại hàng trăm công trình lớn trên toàn quốc
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(categoryMap).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded-full mb-2">{project.category}</span>
                <h3 className="text-white font-bold text-base leading-tight">{project.title}</h3>
                <p className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                  {project.location}
                </p>
                <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300 inline-block">
            Liên Hệ Tư Vấn
          </a>
        </div>
      </div>
    </section>
  );
}
