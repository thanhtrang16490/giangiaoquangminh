'use client';

import { useState } from 'react';

const footerLinks = {
  'Công Ty':  [{ label: 'Giới Thiệu', href: '#about' }, { label: 'Tuyển Dụng', href: '#' }, { label: 'Tin Tức', href: '#news' }, { label: 'Liên Hệ', href: '#contact' }],
  'Sản Phẩm': [{ label: 'Giàn Giáo Ringlock', href: '#solutions' }, { label: 'Xà Gồ Thép', href: '#solutions' }, { label: 'Giàn Giáo Sự Kiện', href: '#solutions' }, { label: 'Phụ Kiện & Linh Kiện', href: '#solutions' }],
  'Dự Án':    [{ label: 'Xây Dựng', href: '#projects' }, { label: 'Công Nghiệp', href: '#projects' }, { label: 'Hạ Tầng', href: '#projects' }, { label: 'Sự Kiện', href: '#projects' }],
  'Hỗ Trợ':  [{ label: 'Hướng Dẫn An Toàn', href: '#' }, { label: 'Thông Số Kỹ Thuật', href: '#' }, { label: 'Tài Liệu Lắp Dựng', href: '#' }, { label: 'Chứng Nhận Chất Lượng', href: '#' }],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 5000); }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="text-xl font-bold text-red-500 tracking-tight">QUANG MINH</span>
              <p className="text-xs text-gray-400 mt-1">Technology Engineering JSC</p>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
              Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh – chuyên cung cấp giàn giáo ringlock và xà gồ xây dựng chất lượng cao từ năm 2008.
            </p>
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-3">Nhận Tin Tức Mới Nhất</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email của bạn" className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm" required />
                <button type="submit" className="px-5 py-3 bg-red-600 text-white font-semibold rounded-r-lg hover:bg-red-700 transition-colors text-sm">Đăng Ký</button>
              </form>
              {subscribed && <p className="mt-2 text-green-400 text-xs">Đăng ký thành công!</p>}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-base font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh. Bảo lưu mọi quyền.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Chính Sách Bảo Mật</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Điều Khoản Sử Dụng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
