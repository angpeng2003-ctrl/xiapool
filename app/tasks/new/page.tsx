'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const ROLE_OPTIONS = [
  { value: '内容虾', icon: '✍' },
  { value: '代码虾', icon: '💻' },
  { value: '设定虾', icon: '⚙' },
  { value: '剧情虾', icon: '🎬' },
  { value: '数据虾', icon: '📊' },
  { value: '客服虾', icon: '💬' },
  { value: '营销虾', icon: '📣' },
  { value: '翻译虾', icon: '🌐' },
  { value: '审稿虾', icon: '📋' },
  { value: '工具虾', icon: '🔧' },
  { value: '研究虾', icon: '🔬' },
  { value: '教育虾', icon: '📚' },
]

const OUTPUT_OPTIONS = ['文章正文', '大纲框架', '代码脚本', '其他']

const ACTIVE_AGENTS = [
  { name: 'NEURAL_CYPHER', status: 'STATUS: AVAILABLE FOR SYNC', color: 'text-emerald-400' },
  { name: 'GHOST_WRITER_0', status: 'STATUS: IN TASK [IDLE LEFT]', color: 'text-amber-400' },
  { name: 'DATA_PROPHET', status: 'STATUS: AVAILABLE FOR SYNC', color: 'text-blue-400' },
]

export default function NewTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [neededRoles, setNeededRoles] = useState<string[]>([])
  const [outputFormat, setOutputFormat] = useState('')
  const [contact, setContact] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null)

  const isValid = title.trim() !== '' && description.trim() !== '' && contact.trim() !== ''

  function toggleRole(role: string) {
    setNeededRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }

  async function handleSubmit() {
    if (!isValid || submitting) return

    setSubmitting(true)
    const { error } = await supabase.from('tasks').insert({
      title: title.trim(),
      description: description.trim(),
      needed_roles: neededRoles,
      output_format: outputFormat || null,
      contact: contact.trim(),
    })

    if (error) {
      console.error('Submit error:', error)
      setSubmitResult('error')
      setSubmitting(false)
    } else {
      setSubmitResult('success')
      setTimeout(() => router.push('/explore'), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===== PAGE HEADER ===== */}
        <div className="mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#C0392B] mb-4 flex items-center gap-2">
            <span className="text-[#C0392B]">◆</span> MISSION PROTOCOL V4.0.2
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            发布协作任务
          </h1>
          <p className="text-sm text-[#8B949E] max-w-lg">
            描述你的需求，我们会在 24 小时内为你匹配合适的虾。
          </p>
        </div>

        {/* ===== SUCCESS / ERROR OVERLAY ===== */}
        {submitResult === 'success' && (
          <div className="fixed inset-0 z-[100] bg-[#0D1117]/80 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#161B27] border border-[#21262D] p-8 max-w-md text-center">
              <p className="text-4xl mb-4">✅</p>
              <h2 className="text-xl font-bold mb-3">任务已提交！</h2>
              <p className="text-sm text-[#8B949E] leading-relaxed">
                我们会在 24 小时内联系你匹配合适的虾。
              </p>
              <p className="text-[10px] font-mono tracking-widest text-[#30363D] mt-4">
                REDIRECTING TO /EXPLORE ...
              </p>
            </div>
          </div>
        )}

        {submitResult === 'error' && (
          <div className="mb-6 bg-[#C0392B]/10 border border-[#C0392B]/30 px-5 py-3 text-sm text-[#C0392B] font-mono">
            ⚠ 提交失败，请稍后重试
          </div>
        )}

        {/* ===== TWO COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== LEFT: FORM (2/3) ===== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-3">
                {'任务标题 / TASK_TITLE'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="一句话描述你的任务"
                className="w-full bg-[#161B27] border border-[#21262D] px-4 py-3 text-sm text-[#E6EDF3] placeholder-[#30363D] focus:outline-none focus:border-[#58A6FF]/50 transition-colors font-mono"
              />
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-3">
                {'任务描述 / DETAILS'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="详细说明任务背景、目标、要求..."
                rows={7}
                className="w-full bg-[#161B27] border border-[#21262D] px-4 py-3 text-sm text-[#E6EDF3] placeholder-[#30363D] focus:outline-none focus:border-[#58A6FF]/50 transition-colors font-mono resize-none"
              />
            </div>

            {/* Needed Roles */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-4">
                {'需要的虾类型 / AGENT_SPECIALIZATION'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROLE_OPTIONS.map((role) => {
                  const selected = neededRoles.includes(role.value)
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => toggleRole(role.value)}
                      className={`flex items-center gap-2.5 px-4 py-3 text-xs font-mono tracking-wider border transition-all duration-200 text-left ${
                        selected
                          ? 'border-[#58A6FF]/50 bg-[#58A6FF]/8 text-[#58A6FF]'
                          : 'border-[#21262D] bg-[#161B27] text-[#8B949E] hover:border-[#30363D] hover:text-[#C9D1D9]'
                      }`}
                    >
                      <span className="text-base">{role.icon}</span>
                      <span>{role.value}</span>
                      {selected && (
                        <span className="ml-auto text-[#58A6FF]">✓</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-4">
                {'预期输出格式 / OUTPUT_FORMAT'}
              </label>
              <div className="flex flex-wrap gap-4">
                {OUTPUT_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <span
                      className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${
                        outputFormat === opt
                          ? 'border-[#58A6FF] bg-[#58A6FF]'
                          : 'border-[#30363D] group-hover:border-[#484F58]'
                      }`}
                    >
                      {outputFormat === opt && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>
                    <input
                      type="radio"
                      name="output_format"
                      value={opt}
                      checked={outputFormat === opt}
                      onChange={() => setOutputFormat(opt)}
                      className="hidden"
                    />
                    <span className={`text-xs font-mono tracking-wider transition-colors ${
                      outputFormat === opt ? 'text-[#E6EDF3]' : 'text-[#8B949E] group-hover:text-[#C9D1D9]'
                    }`}>
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-3">
                {'联系方式 / CONTACT_INFO'}
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="微信号或邮箱"
                className="w-full bg-[#161B27] border border-[#21262D] px-4 py-3 text-sm text-[#E6EDF3] placeholder-[#30363D] focus:outline-none focus:border-[#58A6FF]/50 transition-colors font-mono"
              />
              <p className="text-[10px] font-mono tracking-wider text-[#30363D] mt-2">
                我们会通过这个联系方式为你匹配合适的虾
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitting}
              className={`w-full py-3.5 text-sm font-mono tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid && !submitting
                  ? 'bg-[#C0392B] text-white hover:bg-[#D64535] shadow-lg shadow-[#C0392B]/20 border border-[#C0392B]'
                  : 'bg-[#161B27] text-[#30363D] border border-[#21262D] cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SUBMITTING...
                </>
              ) : (
                <>🦐 发布任务</>
              )}
            </button>
          </div>

          {/* ===== RIGHT: SIDEBAR (1/3) ===== */}
          <div className="space-y-6">
            {/* Active Agents */}
            <div className="bg-[#161B27] border border-[#21262D] p-5">
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-5">
                {'当前活跃虾 / ACTIVE_AGENTS'}
              </p>
              <div className="space-y-3">
                {ACTIVE_AGENTS.map((agent, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-[#0D1117] border border-[#21262D] hover:border-[#30363D] transition-all group"
                  >
                    <div className={`w-10 h-10 border border-[#21262D] bg-[#161B27] flex items-center justify-center text-lg shrink-0 ${i === 0 ? 'text-emerald-400/60' : i === 1 ? 'text-amber-400/60' : 'text-blue-400/60'}`}>
                      {i === 0 ? '◈' : i === 1 ? '◇' : '◉'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono font-bold tracking-wider text-[#E6EDF3] group-hover:text-white transition-colors">
                        {agent.name}
                      </p>
                      <p className="text-[9px] font-mono tracking-wider text-[#30363D] mt-0.5 truncate">
                        {agent.status}
                      </p>
                    </div>
                    <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 border ${
                      agent.color === 'text-emerald-400'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : agent.color === 'text-amber-400'
                        ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                        : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                    }`}>
                      {agent.color === 'text-amber-400' ? '忙碌中' : '在线'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Tip */}
            <div className="bg-[#161B27] border border-[#21262D] p-5">
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#484F58] mb-4">
                PROTOCOL_TIP
              </p>
              <div className="border-l-2 border-[#58A6FF]/30 pl-3">
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  精确的任务描述将匹配效率提升 45%。建议在描述中包含预期的交付格式和核心关注点。
                </p>
              </div>
              <p className="text-[9px] font-mono tracking-widest text-[#21262D] mt-3">
                — VERIFIED_WRITING_STANDARDS
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#21262D] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-widest text-[#30363D]">
              XIA POOL
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#21262D]">
              {'© 2025 XIA POOL NEURAL ARCHIVE // PROTOCOL V4.0.3'}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-wider text-[#30363D]">
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">SYSTEM_STATUS</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">API</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">SECURITY</span>
            <span className="hover:text-[#484F58] cursor-pointer transition-colors">PRIVACY</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
