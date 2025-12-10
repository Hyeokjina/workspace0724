'use client';

const footerLinks = {
  product: [
    { name: '기능 소개', href: '#features' },
    { name: '가격 정책', href: '#pricing' },
    { name: '로드맵', href: '#roadmap' },
    { name: '업데이트', href: '#updates' }
  ],
  company: [
    { name: '소개', href: '#about' },
    { name: '블로그', href: '#blog' },
    { name: '고객 지원', href: '#support' },
    { name: '문의하기', href: '#contact' }
  ],
  resources: [
    { name: '문서', href: '#docs' },
    { name: 'API', href: '#api' },
    { name: '커뮤니티', href: '#community' },
    { name: '가이드', href: '#guides' }
  ]
};

export function FooterSection() {
  return (
    <footer className="relative bg-[#0a0e27] border-t-2 border-cyan-500/20">
      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-['Bebas_Neue'] text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                GYMHUB
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              헬스장 운영에 필요한 모든 기능을 통합 관리할 수 있는 웹 기반 종합 관리 플랫폼
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border-2 border-cyan-500/50 hover:border-cyan-400 flex items-center justify-center transition-colors group">
                <span className="text-cyan-500 group-hover:text-cyan-400">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 border-2 border-purple-500/50 hover:border-purple-400 flex items-center justify-center transition-colors group">
                <span className="text-purple-500 group-hover:text-purple-400">ⓘ</span>
              </a>
              <a href="#" className="w-10 h-10 border-2 border-pink-500/50 hover:border-pink-400 flex items-center justify-center transition-colors group">
                <span className="text-pink-500 group-hover:text-pink-400">▶</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl text-cyan-400 mb-4 tracking-wider">제품</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl text-purple-400 mb-4 tracking-wider">회사</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-xl text-pink-400 mb-4 tracking-wider">리소스</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 <span className="text-cyan-400 font-semibold">GymHub</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">이용약관</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">쿠키 정책</a>
            </div>
          </div>

          {/* Tech Badge */}
          <div className="mt-6 text-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <p className="text-xs text-gray-400">
                <span className="text-cyan-400 font-semibold">Version 1.0.0</span> |
                Built with <span className="text-purple-400">Spring Boot</span> + <span className="text-pink-400">MyBatis</span> + <span className="text-cyan-400">Oracle</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50" />
    </footer>
  );
}
