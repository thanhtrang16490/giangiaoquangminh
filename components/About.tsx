'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 16,   suffix: '+',  label: 'Năm Kinh Nghiệm (2008)' },
  { value: 50,   suffix: '+',  label: 'Nhân Viên'               },
  { value: 3000, suffix: 'm²', label: 'Diện Tích Nhà Máy'       },
  { value: 63,   suffix: '',   label: 'Tỉnh Thành Phủ Sóng'     },
];

const certs = [
  { title: 'BS EN ISO 1461:2009', desc: 'Tiêu chuẩn mạ kẽm nhúng nóng quốc tế'    },
  { title: 'ASTM A123 / JIS H8641', desc: 'Tiêu chuẩn Mỹ và Nhật Bản'             },
  { title: 'ISO 9001:2008',       desc: 'Hệ thống quản lý chất lượng – Vinacontrol'},
  { title: 'AGA Member 2016',     desc: 'Thành viên Hiệp hội Mạ Kẽm Hoa Kỳ'       },
];

export default function About() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((stat, index) => {
            const duration = 1800;
            const step = stat.value / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= stat.value) { current = stat.value; clearInterval(timer); }
              setCounts(prev => { const next = [...prev]; next[index] = Math.floor(current); return next; });
            }, 16);
          });
        }
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-red-600 font-semibold uppercase tracking-widest text-sm mb-3">Giới Thiệu</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh</h2>
            <p className="text-gray-500 text-lg mb-5 leading-relaxed">
              Thành lập năm 2008, <strong className="text-gray-800">Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh</strong> (Quang Minh Technology Engineering JSC) chuyên cung cấp giàn giáo ringlock và xà gồ xây dựng chất lượng cao cho các công trình dân dụng, công nghiệp và hạ tầng trên toàn quốc.
            </p>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Với nhà máy rộng <strong className="text-gray-800">3.000 m²</strong> tại Lô CN09 – KCN Nguyên Khê – Đông Anh – Hà Nội và đội ngũ hơn <strong className="text-gray-800">50 nhân viên</strong> giàu kinh nghiệm, Quang Minh cam kết cung cấp sản phẩm đạt tiêu chuẩn kỹ thuật quốc tế, giao hàng nhanh và hỗ trợ kỹ thuật tận nơi.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{counts[index]}{stat.suffix}</div>
                  <div className="text-gray-500 text-xs leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                <div>
                  <span className="font-semibold text-gray-800">Nhà máy & Văn phòng:</span> Lô CN09, KCN Nguyên Khê, Đông Anh, Hà Nội
                  <br />Diện tích: 3.000 m² | 50+ nhân viên
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Chứng Nhận Chất Lượng</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certs.map((cert, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="font-bold text-gray-900 text-sm mb-1">{cert.title}</div>
                    <div className="text-gray-500 text-xs">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Ưu Điểm Sản Phẩm</h3>
              <ul className="space-y-3">
                {[
                  'Tuổi thọ cao nhờ mạ kẽm nhúng nóng',
                  'Module linh hoạt, phù hợp mọi loại công trình',
                  'Lắp ráp nhanh, chịu tải trọng lớn',
                  'An toàn và ổn định tuyệt đối',
                  'Dễ vận chuyển và bảo quản',
                  'Kiểm định bởi Viện KHCN Xây Dựng (VIBST)',
                  'Cho thuê và bán linh hoạt toàn quốc',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
