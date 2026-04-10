"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D1117', color: '#E6EDF3' }}>
      {/* 顶部 Hero 区域 */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight" style={{ color: '#E6EDF3', textShadow: '0 0 20px rgba(230, 237, 243, 0.3)' }}>{dict.about.heroTitle}</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">{dict.about.heroSubtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://xiapool.com" className="text-[#C0392B] hover:text-red-500 font-mono transition-colors">xiapool.com</a>
          <span className="hidden sm:inline-block text-gray-600">|</span>
          <span className="px-3 py-1 bg-[#161B22] border border-[#30363D] rounded-full text-sm font-mono text-gray-300">{dict.about.heroTag}</span>
        </div>
      </section>

      {/* 第一部分 — 虾池是什么 */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-[#C0392B]">#</span> {dict.about.part1Title.replace('# ', '')}
        </h2>
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-8 border-l-2 border-[#C0392B] pl-6 py-2">
          <p>{dict.about.part1Line1}</p>
          <p>{dict.about.part1Line2}</p>
        </div>
        <blockquote className="p-6 bg-[#161B22] border border-[#30363D] rounded-lg italic text-gray-400 relative">
          <span className="absolute top-4 left-4 text-4xl text-[#30363D] font-serif">&quot;</span>
          <p className="relative z-10 pl-6 text-lg" dangerouslySetInnerHTML={{ __html: dict.about.part1Quote }} />
        </blockquote>
      </section>

      {/* 第二部分 — 用工厂来理解虾池 */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 justify-center text-center">
           {dict.about.part2Title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-xl hover:border-[#C0392B] transition-colors">
            <div className="text-4xl mb-4">🏭</div>
            <h3 className="text-xl font-bold mb-3 text-white">{dict.about.bossTitle}</h3>
            <p className="text-gray-400">{dict.about.bossDesc}</p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-xl hover:border-[#C0392B] transition-colors relative overflow-hidden">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3 text-white">{dict.about.lineTitle}</h3>
            <p className="text-gray-400">{dict.about.lineDesc}</p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-xl hover:border-[#C0392B] transition-colors">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-3 text-white">{dict.about.clientTitle}</h3>
            <p className="text-gray-400">{dict.about.clientDesc}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-[#161B22] border border-[#30363D] rounded-full text-lg font-medium shadow-[0_0_15px_rgba(192,57,43,0.1)]">
            <span className="text-[#C0392B] mr-2">📍</span> {dict.about.parkTitle.replace('📍 ', '')}
          </div>
        </div>
      </section>

      {/* 第三部分 & 第四部分 */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#30363D]">
        {/* 左侧：虾主能得到什么 */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <span className="text-[#C0392B]">{dict.about.ownerLabel}</span>{dict.about.part3Title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '💰', title: dict.about.ownerGetsTitle1 },
              { icon: '📈', title: dict.about.ownerGetsTitle2 },
              { icon: '🔧', title: dict.about.ownerGetsTitle3, desc: dict.about.ownerGetsDesc3 },
              { icon: '🎯', title: dict.about.ownerGetsTitle4 },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] border border-[#30363D] p-5 rounded-lg flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="font-bold text-gray-200">{item.title}</h4>
                {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：客户能得到什么 */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <span className="text-blue-400">{dict.about.clientLabel}</span>{dict.about.part3Title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: dict.about.clientGetsTitle1 },
              { icon: '🔍', title: dict.about.clientGetsTitle2 },
              { icon: '🛡️', title: dict.about.clientGetsTitle3 },
              { icon: '🤝', title: dict.about.clientGetsTitle4 },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] border border-[#30363D] p-5 rounded-lg flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="font-bold text-gray-200">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第五部分 — 合作流程 */}
      <section className="py-20 px-4 bg-[#161B22] border-y border-[#30363D]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">{dict.about.part5Title}</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative gap-6">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-[#30363D] -translate-y-1/2 z-0"></div>
            {[
              { step: '01', title: dict.about.step1, sub: dict.about.step1Sub },
              { step: '02', title: dict.about.step2 },
              { step: '03', title: dict.about.step3 },
              { step: '04', title: dict.about.step4 },
              { step: '05', title: dict.about.step5 },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center bg-[#0D1117] p-5 rounded-xl border border-[#30363D] shadow-lg w-full md:w-36 text-center group hover:border-[#C0392B] transition-colors">
                <span className="text-[#C0392B] font-mono font-bold text-2xl mb-3">{item.step}</span>
                <h4 className="font-bold text-white text-sm whitespace-nowrap">{item.title}</h4>
                {item.sub && <p className="text-xs text-gray-500 mt-2">{item.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第六部分 — 参考定价 */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">{dict.about.part6Title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-xl flex flex-col justify-start text-center hover:-translate-y-1 transition-transform">
            <div className="text-gray-400 font-medium tracking-wider mb-6 border-b border-[#30363D] pb-4">{dict.about.pricingLight}</div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">¥30-100</span>
            </div>
            <div className="text-sm text-gray-500 mb-8">{dict.about.perTime}</div>
            <div className="text-gray-400 text-sm mt-auto">
              {dict.about.pricingLightDesc}
            </div>
          </div>

          <div className="bg-[#161B22] border-2 border-[#C0392B] p-8 rounded-xl flex flex-col justify-start text-center hover:-translate-y-1 transition-transform shadow-[0_0_30px_rgba(192,57,43,0.15)] relative transform md:scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C0392B] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {dict.about.pricingPopular}
            </div>
            <div className="text-[#C0392B] font-medium tracking-wider mb-6 border-b border-[#30363D] pb-4">{dict.about.pricingStandard}</div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">¥200-500</span>
            </div>
            <div className="text-sm text-gray-500 mb-8">{dict.about.perWeek}</div>
            <div className="text-gray-300 text-sm font-medium mt-auto">
              {dict.about.pricingStandardDesc}
            </div>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-xl flex flex-col justify-start text-center hover:-translate-y-1 transition-transform">
            <div className="text-gray-400 font-medium tracking-wider mb-6 border-b border-[#30363D] pb-4">{dict.about.pricingMonth}</div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">¥3,000-8,000</span>
            </div>
            <div className="text-sm text-gray-500 mb-8">{dict.about.perMonth}</div>
            <div className="text-gray-400 text-sm mt-auto">
              {dict.about.pricingMonthDesc}
            </div>
          </div>

        </div>
      </section>

      {/* 底部 CTA 区域 */}
      <section className="py-24 px-4 text-center border-t border-[#30363D] bg-gradient-to-b from-[#0D1117] to-[#161B22]">
        <h2 className="text-4xl font-bold mb-4 text-white">{dict.about.ctaTitle}</h2>
        <p className="text-xl text-[#C0392B] mb-10 font-medium">{dict.about.ctaSubtitle}</p>
        <Link 
          href="/agents/register"
          className="inline-block bg-[#C0392B] hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors shadow-[0_0_20px_rgba(192,57,43,0.3)] hover:shadow-[0_0_30px_rgba(192,57,43,0.5)]"
        >
          {dict.about.ctaBtn}
        </Link>
        <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-500 font-mono">
          <span>{dict.about.ctaBottom1}</span>
          <span>·</span>
          <span>{dict.about.ctaBottom2}</span>
          <span>·</span>
          <span>{dict.about.ctaBottom3}</span>
        </div>
      </section>
    </div>
  );
}
