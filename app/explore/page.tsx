'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Agent {
  id: string
  name: string
  role_type: string
  framework: string
  skills: string[]
  token_level: string
  owner_name: string
  is_online: boolean
  output_capacity?: string
  pricing_tier?: string
}

const ROLE_FILTERS = ['全部', '内容虾', '代码虾', '设定虾', '剧情虾', '数据虾', '客服虾', '营销虾', '翻译虾', '审稿虾', '工具虾', '研究虾', '教育虾']

const ROLE_BADGE_COLORS: Record<string, string> = {
  '内容虾': 'bg-sky-600/20 text-sky-400 border border-sky-500/30',
  '代码虾': 'bg-green-600/20 text-green-400 border border-green-500/30',
  '设定虾': 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
  '剧情虾': 'bg-purple-600/20 text-purple-400 border border-purple-500/30',
  '数据虾': 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30',
  '客服虾': 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30',
  '营销虾': 'bg-rose-600/20 text-rose-400 border border-rose-500/30',
  '翻译虾': 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30',
  '审稿虾': 'bg-amber-600/20 text-amber-400 border border-amber-500/30',
  '工具虾': 'bg-teal-600/20 text-teal-400 border border-teal-500/30',
  '研究虾': 'bg-violet-600/20 text-violet-400 border border-violet-500/30',
  '教育虾': 'bg-orange-600/20 text-orange-400 border border-orange-500/30',
}

export default function ExplorePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [activeFilter, setActiveFilter] = useState('全部')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true)
      const { data, error } = await supabase
        .from('agents')
        .select('*')

      if (error) {
        console.error('Error fetching agents:', error)
      } else {
        setAgents(data as Agent[])
      }
      setLoading(false)
    }

    fetchAgents()
  }, [])

  const filteredAgents =
    activeFilter === '全部'
      ? agents
      : agents.filter((a) => a.role_type === activeFilter)

  const totalPages = Math.max(1, Math.ceil(filteredAgents.length / pageSize))
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  function handleFilterChange(filter: string) {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden border-b border-[#21262D]">
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#58A6FF 1px, transparent 1px), linear-gradient(90deg, #58A6FF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#0D1117] to-[#161B27]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[#58A6FF] text-xs tracking-[0.3em] font-mono mb-6 opacity-70">
              {'// AI_AGENT_MARKETPLACE'}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              养虾的人赚钱，
              <br />
              用虾的人省钱。
            </h1>
            <p className="text-[#8B949E] text-sm sm:text-base leading-relaxed max-w-lg">
              一个让 AI Agent 开发者和企业客户直接对接的产能交易平台。
            </p>

            {/* Decorative stats on the right side (desktop) */}
            <div className="hidden lg:block absolute right-8 top-16 text-right font-mono text-[10px] tracking-wider text-[#30363D] leading-6 select-none">
              <p>STATUS: ARCHIVE_ACTIVE</p>
              <p>ENCRYPTION: AES_256_GCM</p>
              <p>LOCATION: DIGITAL_CN_EAST</p>
              <p>LATENCY: &lt;6MS</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section className="border-b border-[#21262D] bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {ROLE_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-200 border ${
                    activeFilter === filter
                      ? 'bg-[#C0392B] border-[#C0392B] text-white shadow-lg shadow-[#C0392B]/20'
                      : 'border-[#30363D] text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#58A6FF]/50 bg-[#161B27]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="text-[10px] tracking-widest text-[#484F58] font-mono">
              SORT_BY: <span className="text-[#8B949E]">EFFICIENCY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARD GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#161B27] border border-[#21262D] p-5 animate-pulse h-72">
                <div className="h-3 bg-[#21262D] rounded w-1/3 mb-4" />
                <div className="h-6 bg-[#21262D] rounded w-2/3 mb-3" />
                <div className="h-3 bg-[#21262D] rounded w-1/2 mb-6" />
                <div className="flex gap-2 mb-6">
                  <div className="h-5 bg-[#21262D] rounded w-20" />
                  <div className="h-5 bg-[#21262D] rounded w-16" />
                </div>
                <div className="h-3 bg-[#21262D] rounded w-full mb-2" />
                <div className="h-3 bg-[#21262D] rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : paginatedAgents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#484F58] font-mono text-sm tracking-wider">{'// NO_AGENTS_FOUND'}</p>
            <p className="text-[#30363D] text-xs mt-2 font-mono">尝试切换筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedAgents.map((agent, index) => (
              <div
                key={agent.id}
                className="group bg-[#161B27] border border-[#21262D] hover:border-[#30363D] transition-all duration-300 flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#58A6FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 flex-1 flex flex-col">
                  {/* Header: Type Code + Role Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#484F58] uppercase">
                      TYPE_{agent.role_type?.replace('虾', '')}_{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[10px] font-mono tracking-wider px-2 py-0.5 ${
                        ROLE_BADGE_COLORS[agent.role_type] || 'bg-[#21262D] text-[#8B949E] border border-[#30363D]'
                      }`}
                    >
                      {agent.role_type}
                    </span>
                  </div>

                  {/* Agent Name */}
                  <h3 className="text-xl font-black tracking-tight mb-1 text-[#E6EDF3] group-hover:text-white transition-colors">
                    {agent.name}
                  </h3>

                  {/* Framework Badge */}
                  {agent.framework && (
                    <span className="inline-block text-[10px] font-mono tracking-wider text-[#484F58] bg-[#0D1117] border border-[#21262D] px-2 py-0.5 w-fit mb-4">
                      {agent.framework}
                    </span>
                  )}

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(agent.skills || []).slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-wider text-[#8B949E] bg-[#0D1117] border border-[#21262D] px-2 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Output Capacity & Pricing */}
                  <div className="flex flex-col gap-2 mb-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#30363D] mb-0.5 tracking-wider">产出能力 / CAPACITY</span>
                      <span className="text-xs text-[#C9D1D9] truncate" title={agent.output_capacity || ''}>
                        {agent.output_capacity || '未注明'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#30363D] mb-0.5 tracking-wider">服务报价 / PRICING</span>
                      <span className="text-xs font-bold text-[#E6EDF3]">
                        {agent.pricing_tier || '未注明'}
                      </span>
                    </div>
                  </div>

                  {/* Token Level & Owner */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#484F58] mb-4">
                    <div>
                      <span className="text-[#30363D]">TOKEN_LEVEL</span>
                      <br />
                      <span className="text-[#8B949E]">{agent.token_level || '—'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#30363D]">OWNER</span>
                      <br />
                      <span className="text-[#8B949E]">@{agent.owner_name || 'UNKNOWN'}</span>
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="flex items-center gap-1.5 mb-5 text-[10px] font-mono tracking-wider">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        agent.is_online
                          ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]'
                          : 'bg-[#484F58]'
                      }`}
                    />
                    <span className={agent.is_online ? 'text-emerald-400' : 'text-[#484F58]'}>
                      {agent.is_online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                    <span className="text-[#30363D] ml-1">/</span>
                    <span className="text-[#30363D]">
                      {agent.is_online ? '共同联系' : '暂不可用'}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* CTA Button */}
                  <Link
                    href={`/agents/${agent.id}`}
                    className="block w-full text-center text-xs font-mono tracking-wider py-2.5 border border-[#21262D] bg-[#0D1117] text-[#58A6FF] hover:bg-[#58A6FF]/10 hover:border-[#58A6FF]/40 transition-all duration-200 group-hover:border-[#58A6FF]/30"
                  >
                    查看详情 <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10 font-mono">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs tracking-wider border transition-all ${
                    currentPage === page
                      ? 'bg-[#C0392B] border-[#C0392B] text-white'
                      : 'border-[#21262D] text-[#484F58] hover:text-[#8B949E] hover:border-[#30363D] bg-[#161B27]'
                  }`}
                >
                  {String(page).padStart(2, '0')}
                </button>
              ))}
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  className="w-8 h-8 text-xs border border-[#21262D] text-[#484F58] hover:text-[#8B949E] hover:border-[#30363D] bg-[#161B27] transition-all"
                >
                  &gt;
                </button>
              )}
            </div>
            <div className="text-[10px] tracking-widest text-[#30363D]">
              PAGE {String(currentPage).padStart(2, '0')} OF {String(totalPages).padStart(3, '0')} {'// RECORD_COUNT:'} {filteredAgents.length}
            </div>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#21262D] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#30363D]">
            {'XIA_POOL // OBSIDIAN_ARCHIVE_PROTOCOL'}
          </p>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-wider text-[#30363D]">
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">NODE_STATUS</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">ENCRYPTION_POLICY</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">TERMINAL_ACCESS</span>
          </div>
          <p className="text-[10px] font-mono tracking-wider text-[#21262D]">
            © 2025 XIA_POOL. ALL_RIGHTS_RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
