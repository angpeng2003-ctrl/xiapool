'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface Agent {
  id: string
  name: string
  role_type: string
  framework: string
  skills: string[]
  token_level: string
  owner_name: string
  is_online: boolean
  description: string
  input_pref: string[] | string | null
  output_style: string | null
  recommended_collab: string[] | string | null
}

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

const TOKEN_LEVEL_MAP: Record<string, { level: number; label: string }> = {
  '极低': { level: 1, label: 'MINIMAL' },
  '低': { level: 2, label: 'LOW' },
  '中等': { level: 3, label: 'BALANCED' },
  '较高': { level: 4, label: 'ELEVATED' },
  '高': { level: 5, label: 'HIGH' },
  '极高': { level: 6, label: 'CRITICAL' },
}

export default function AgentDetailPage() {
  const params = useParams()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const { dict } = useLanguage()

  useEffect(() => {
    async function fetchAgent() {
      setLoading(true)
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setAgent(data as Agent)
      }
      setLoading(false)
    }

    if (params.id) fetchAgent()
  }, [params.id])

  function handleFavorite() {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  function parseArrayField(field: string[] | string | null): string[] {
    if (!field) return []
    if (Array.isArray(field)) return field
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : [field]
    } catch {
      return field.split(',').map(s => s.trim()).filter(Boolean)
    }
  }

  const tokenInfo = agent?.token_level ? TOKEN_LEVEL_MAP[agent.token_level] || { level: 3, label: agent.token_level } : { level: 0, label: '—' }
  const agentCode = agent ? `XP-AGENT-${String(agent.id).slice(0, 4).toUpperCase()}-${agent.name?.slice(0, 3).toUpperCase()}` : ''

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] flex items-center justify-center">
        <div className="text-center font-mono">
          <div className="inline-block w-6 h-6 border-2 border-[#30363D] border-t-[#58A6FF] rounded-full animate-spin mb-4" />
          <p className="text-xs tracking-[0.3em] text-[#484F58]">{dict.agentDetail.loading}</p>
        </div>
      </div>
    )
  }

  /* ===== NOT FOUND ===== */
  if (notFound || !agent) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-6xl mb-4">🦐</p>
          <h1 className="text-2xl font-black mb-2">{dict.agentDetail.notFoundTitle}</h1>
          <p className="text-sm text-[#484F58] tracking-wider mb-8">{dict.agentDetail.notFoundDesc}</p>
          <Link href="/explore" className="text-xs tracking-widest border border-[#30363D] px-6 py-2 text-[#58A6FF] hover:bg-[#58A6FF]/10 hover:border-[#58A6FF]/40 transition-all">
            {dict.agentDetail.backToExplore}
          </Link>
        </div>
      </div>
    )
  }

  const skills = agent.skills || []
  const inputPrefs = parseArrayField(agent.input_pref)
  const collabs = parseArrayField(agent.recommended_collab)

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      {/* ===== TOAST ===== */}
      {showToast && (
        <div className="fixed top-6 right-6 z-[100] bg-[#161B27] border border-[#30363D] px-5 py-3 text-xs font-mono tracking-wider text-[#8B949E] shadow-2xl shadow-black/40 animate-slide-in">
          <span className="text-amber-400 mr-2">⚠</span> {dict.agentDetail.devToast}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== BACK LINK ===== */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#58A6FF] hover:text-[#79C0FF] transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>{dict.agentDetail.backToExploreHeader}</span>
        </Link>

        {/* ===== HEADER ===== */}
        <section className="mb-10">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 ${ROLE_BADGE_COLORS[agent.role_type] || 'bg-[#21262D] text-[#8B949E] border border-[#30363D]'}`}>
              {dict.explore.roleMapping[agent.role_type as keyof typeof dict.explore.roleMapping] || agent.role_type}
            </span>
            {agent.framework && (
              <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-[#0D1117] text-[#8B949E] border border-[#21262D]">
                {agent.framework}
              </span>
            )}
            <span className={`flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2.5 py-1 ${agent.is_online ? 'text-emerald-400' : 'text-[#484F58]'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${agent.is_online ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'bg-[#484F58]'}`} />
              {agent.is_online ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          {/* Name + Code */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#E6EDF3] italic">
              {agent.name}
            </h1>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#30363D] pb-2">
              {agentCode}
            </span>
          </div>
        </section>

        {/* ===== DESCRIPTION + SKILLS ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Description — Left */}
          <div className="lg:col-span-3 bg-[#161B27] border border-[#21262D] p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#58A6FF]/30 via-transparent to-transparent" />
            <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-4">
              {dict.agentDetail.abstract}
            </p>
            {/* Decorative icon */}
            <div className="absolute top-5 right-5 w-10 h-10 border border-[#21262D] flex items-center justify-center text-[#30363D] text-lg group-hover:border-[#30363D] transition-colors">
              ◎
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#C9D1D9] max-w-xl">
              {agent.description || dict.agentDetail.noDescription}
            </p>
          </div>

          {/* Skills — Right */}
          <div className="lg:col-span-2 bg-[#161B27] border border-[#21262D] p-6">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#58A6FF]/20 to-transparent" />
            <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-4">
              {dict.agentDetail.capabilities}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono tracking-wider px-3 py-1.5 bg-[#58A6FF]/8 text-[#58A6FF] border border-[#58A6FF]/20 hover:bg-[#58A6FF]/15 hover:border-[#58A6FF]/40 transition-all cursor-default"
                >
                  {skill}
                </span>
              )) : (
                <span className="text-xs text-[#30363D] font-mono">{dict.agentDetail.noCapabilities}</span>
              )}
            </div>
          </div>
        </section>

        {/* ===== INPUT PREF + OUTPUT STYLE ===== */}
        {(inputPrefs.length > 0 || agent.output_style) && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Input Preferences */}
            {inputPrefs.length > 0 && (
              <div className="bg-[#161B27] border border-[#21262D] p-6">
                <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-5">
                  {dict.agentDetail.inputPref}
                </p>
                <div className="space-y-4">
                  {inputPrefs.map((pref, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[10px] font-mono text-[#30363D] mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm text-[#C9D1D9] font-medium leading-relaxed border-l-2 border-[#58A6FF]/30 pl-3">
                          {pref}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Output Style */}
            {agent.output_style && (
              <div className="bg-[#161B27] border border-[#21262D] p-6">
                <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-5">
                  {dict.agentDetail.outputStyle}
                </p>
                <div className="border-l-2 border-[#C0392B]/40 pl-4">
                  <p className="text-sm leading-relaxed text-[#8B949E] italic">
                    {`"${agent.output_style}"`}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ===== TOKEN LEVEL + RECOMMENDED COLLAB ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Token Level — Left (3 cols) */}
          <div className="lg:col-span-3 bg-[#161B27] border border-[#21262D] p-6">
            <div className="flex items-start justify-between mb-6">
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58]">
                {dict.agentDetail.resourceLoad}
              </p>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#E6EDF3]">
                LV. {String(tokenInfo.level).padStart(2, '0')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full h-1.5 bg-[#0D1117] border border-[#21262D] overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(tokenInfo.level / 6) * 100}%`,
                    background: `linear-gradient(90deg, #58A6FF, ${tokenInfo.level >= 4 ? '#C0392B' : '#58A6FF'})`,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[9px] font-mono tracking-widest text-[#30363D]">
              <span>MIN</span>
              <span>{tokenInfo.label}</span>
              <span>OVERLOADED</span>
            </div>
          </div>

          {/* Recommended Collab — Right (2 cols) */}
          {collabs.length > 0 && (
            <div className="lg:col-span-2 bg-[#161B27] border border-[#21262D] p-6">
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-5">
                {dict.agentDetail.recommendedNodes}
              </p>
              <div className="space-y-3">
                {collabs.map((collab, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 bg-[#0D1117] border border-[#21262D] hover:border-[#30363D] transition-all group cursor-default"
                  >
                    <span className={`w-7 h-7 flex items-center justify-center text-xs font-mono border ${i === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-purple-500/30 text-purple-400 bg-purple-500/10'}`}>
                      {i === 0 ? '◈' : '◉'}
                    </span>
                    <span className="text-sm text-[#C9D1D9] group-hover:text-white transition-colors">
                      {collab}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ===== OWNER ===== */}
        <section className="bg-[#161B27] border border-[#21262D] p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-[#21262D] bg-[#0D1117] flex items-center justify-center text-[#484F58] text-xl">
              👤
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#30363D] mb-1">
                {dict.agentDetail.owner}
              </p>
              <p className="text-lg font-bold tracking-tight text-[#E6EDF3]">
                {agent.owner_name || dict.agentDetail.unknown}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleFavorite}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-mono tracking-wider border border-[#C0392B] bg-[#C0392B]/10 text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-all duration-200"
            >
              {dict.agentDetail.favorite}
            </button>
            <Link
              href="/tasks/new"
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-mono tracking-wider text-center border border-[#58A6FF] bg-[#58A6FF]/10 text-[#58A6FF] hover:bg-[#58A6FF] hover:text-white transition-all duration-200"
            >
              {dict.agentDetail.inviteCollab}
            </Link>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#21262D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#30363D]">
            XIA POOL
          </p>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-wider text-[#30363D]">
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">PROTOCOL</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">SECURITY</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">API</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">TERMINAL</span>
          </div>
          <p className="text-[10px] font-mono tracking-wider text-[#21262D]">
            {'© 2025 XIA POOL NEURAL ARCHIVE. ALL RIGHTS RESERVED.'}
          </p>
        </div>
      </footer>

      {/* Toast animation style */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
