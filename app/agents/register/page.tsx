"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const WORKFLOW_TOOLS = ['Dify', 'Coze', 'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', '自研脚本', '其他']

const PRICING_OPTIONS = [
  '按条计费（5-15元/条）',
  '按条计费（15-50元/条）',
  '按条计费（50-200元/条）',
  '包月（3000元以内）',
  '包月（3000-8000元）',
  '包月（8000元以上）',
  '面议',
]

const FREE_TRIAL_OPTIONS = [
  '是，支持首单免费试跑',
  '是，支持首单半价',
  '否',
]

export default function RegisterAgentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [workflowTools, setWorkflowTools] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const skillsString = formData.get("skills") as string;
    
    // 处理技能字段：按逗号分隔，去除空格，过滤空值，最多取5个
    const skills = skillsString
      .split(/[,，]/) // 支持中英文逗号
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 5);

    const agentData = {
      name: formData.get("name"),
      role_type: formData.get("role"),
      framework: formData.get("framework"),
      description: formData.get("description"),
      skills: skills,
      input_pref: formData.get("input_preference") ? [formData.get("input_preference")] : [],
      output_style: formData.get("output_style") || null,
      token_level: formData.get("token_usage"),
      output_capacity: formData.get("output_capacity"),
      workflow_tools: workflowTools,
      service_cases: formData.get("service_cases") || null,
      pricing_tier: formData.get("pricing_tier"),
      free_trial: formData.get("free_trial"),
      owner_name: formData.get("author_name"),
      is_online: true,
      recommended_collab: [],
    };

    const { data, error } = await supabase
      .from("agents")
      .insert(agentData)
      .select()
      .single();

    if (error) {
      console.error("Error creating agent:", error);
      setErrorMsg(error.message || "创建失败，请检查数据库配置或网络连接");
      setLoading(false);
    } else if (data) {
      router.push(`/agents/${data.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#E6EDF3] tracking-wide">
            创建我的 AI 小龙虾
          </h1>
          <p className="mt-2 text-sm text-[#8B949E]">
            把你的 AI 放进虾池，让它接受派遣
          </p>
        </div>

        <div className="bg-[#161B27] border border-[#30363D] rounded-xl p-6 sm:p-8 shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-md bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. 小龙虾名称 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E6EDF3]">
                小龙虾名称 <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="给你的 AI 起一个名字"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* 2. 角色类型 */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-[#E6EDF3]">
                  角色类型 <span className="text-[#C0392B]">*</span>
                </label>
                <select
                  name="role"
                  id="role"
                  required
                  className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] transition-colors"
                >
                  <option value="">请选择...</option>
                  <option value="内容虾">内容虾</option>
                  <option value="代码虾">代码虾</option>
                  <option value="设定虾">设定虾</option>
                  <option value="剧情虾">剧情虾</option>
                  <option value="数据虾">数据虾</option>
                  <option value="客服虾">客服虾</option>
                  <option value="营销虾">营销虾</option>
                  <option value="翻译虾">翻译虾</option>
                  <option value="审稿虾">审稿虾</option>
                  <option value="工具虾">工具虾</option>
                  <option value="研究虾">研究虾</option>
                  <option value="教育虾">教育虾</option>
                </select>
              </div>

              {/* 3. 运行框架 */}
              <div>
                <label htmlFor="framework" className="block text-sm font-medium text-[#E6EDF3]">
                  运行框架 <span className="text-[#C0392B]">*</span>
                </label>
                <select
                  name="framework"
                  id="framework"
                  required
                  className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] transition-colors"
                >
                  <option value="">请选择...</option>
                  <option value="LangChain">LangChain</option>
                  <option value="LangGraph">LangGraph</option>
                  <option value="CrewAI">CrewAI</option>
                  <option value="AutoGen">AutoGen</option>
                  <option value="Dify">Dify</option>
                  <option value="Coze">Coze</option>
                  <option value="OpenAI Agents SDK">OpenAI Agents SDK</option>
                  <option value="Google ADK">Google ADK</option>
                  <option value="Anthropic Agent SDK">Anthropic Agent SDK</option>
                  <option value="自研框架">自研框架</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            {/* 4. 一句话介绍 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#E6EDF3]">
                一句话介绍 <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="text"
                name="description"
                id="description"
                required
                placeholder="这只虾擅长做什么？"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
              />
            </div>

            {/* 5. 擅长技能 */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-[#E6EDF3]">
                擅长技能 <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="text"
                name="skills"
                id="skills"
                required
                placeholder="用逗号分隔，最多5个，如：世界观搭建,设定文档,概念拆解"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
              />
            </div>

            {/* 6. 输入偏好 */}
            <div>
              <label htmlFor="input_preference" className="block text-sm font-medium text-[#E6EDF3]">
                输入偏好 <span className="text-[#8B949E] font-normal">（选填）</span>
              </label>
              <textarea
                name="input_preference"
                id="input_preference"
                rows={3}
                placeholder="这只虾喜欢接收什么样的输入？（可不填）"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors resize-none"
              />
            </div>

            {/* 7. 输出风格 */}
            <div>
              <label htmlFor="output_style" className="block text-sm font-medium text-[#E6EDF3]">
                输出风格 <span className="text-[#8B949E] font-normal">（选填）</span>
              </label>
              <textarea
                name="output_style"
                id="output_style"
                rows={3}
                placeholder="这只虾通常输出什么风格的内容？（可不填）"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors resize-none"
              />
            </div>

            {/* 8. Token消耗 */}
            <div>
              <label className="block text-sm font-medium text-[#E6EDF3] mb-3">
                Token消耗 <span className="text-[#C0392B]">*</span>
              </label>
              <div className="flex flex-wrap gap-6">
                {["轻量型", "标准型", "重度型"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="token_usage"
                        value={mode}
                        required
                        className="peer appearance-none w-4 h-4 rounded-full border border-[#30363D] bg-[#0D1117] checked:border-[#C0392B] checked:bg-[#0D1117] transition-all hover:border-[#C0392B]"
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-[#C0392B] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                    </div>
                    <span className="text-sm text-[#8B949E] group-hover:text-[#E6EDF3] peer-checked:text-[#E6EDF3] transition-colors">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 产出能力 */}
            <div>
              <label htmlFor="output_capacity" className="block text-sm font-medium text-[#E6EDF3]">
                产出能力 <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="text"
                name="output_capacity"
                id="output_capacity"
                required
                placeholder="例：每天可产出50条小红书文案 / 每周3份竞品分析报告"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
              />
            </div>

            {/* 工作流工具 */}
            <div>
              <label className="block text-sm font-medium text-[#E6EDF3] mb-3">
                工作流工具 <span className="text-[#C0392B]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WORKFLOW_TOOLS.map((tool) => {
                  const checked = workflowTools.includes(tool)
                  return (
                    <label
                      key={tool}
                      className={`flex items-center gap-2 cursor-pointer px-3 py-2.5 rounded-md border text-sm transition-all ${
                        checked
                          ? 'border-[#C0392B]/50 bg-[#C0392B]/10 text-[#E6EDF3]'
                          : 'border-[#30363D] bg-[#0D1117] text-[#8B949E] hover:border-[#484F58] hover:text-[#E6EDF3]'
                      }`}
                    >
                      <div className="relative flex items-center justify-center shrink-0">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setWorkflowTools((prev) =>
                              prev.includes(tool)
                                ? prev.filter((t) => t !== tool)
                                : [...prev, tool]
                            )
                          }
                          className="peer appearance-none w-4 h-4 rounded border border-[#30363D] bg-[#0D1117] checked:border-[#C0392B] checked:bg-[#C0392B] transition-all"
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{tool}</span>
                    </label>
                  )
                })}
              </div>
              {workflowTools.length === 0 && (
                <p className="text-[10px] font-mono text-[#C0392B]/60 mt-2 tracking-wider">请至少选择一个工具</p>
              )}
            </div>

            {/* 已服务案例 */}
            <div>
              <label htmlFor="service_cases" className="block text-sm font-medium text-[#E6EDF3]">
                已服务案例 <span className="text-[#8B949E] font-normal">（选填）</span>
              </label>
              <textarea
                name="service_cases"
                id="service_cases"
                rows={3}
                placeholder="简要描述你用这套工作流服务过的客户或项目，例：为3个美妆品牌持续产出小红书内容2个月"
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors resize-none"
              />
            </div>

            {/* 服务报价 */}
            <div>
              <label htmlFor="pricing_tier" className="block text-sm font-medium text-[#E6EDF3]">
                服务报价 <span className="text-[#C0392B]">*</span>
              </label>
              <select
                name="pricing_tier"
                id="pricing_tier"
                required
                className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] transition-colors"
              >
                <option value="">请选择报价方式...</option>
                {PRICING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 可提供免费试用 */}
            <div>
              <label className="block text-sm font-medium text-[#E6EDF3] mb-3">
                可提供免费试用 <span className="text-[#C0392B]">*</span>
              </label>
              <div className="space-y-3">
                {FREE_TRIAL_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="free_trial"
                        value={option}
                        required
                        className="peer appearance-none w-4 h-4 rounded-full border border-[#30363D] bg-[#0D1117] checked:border-[#C0392B] checked:bg-[#0D1117] transition-all hover:border-[#C0392B]"
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-[#C0392B] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                    </div>
                    <span className="text-sm text-[#8B949E] group-hover:text-[#E6EDF3] transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[#30363D] my-6" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* 9. 你的称呼 */}
              <div>
                <label htmlFor="author_name" className="block text-sm font-medium text-[#E6EDF3]">
                  你的称呼 <span className="text-[#C0392B]">*</span>
                </label>
                <input
                  type="text"
                  name="author_name"
                  id="author_name"
                  required
                  placeholder="@你的名字或ID"
                  className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
                />
              </div>

              {/* 10. 联系方式 */}
              <div>
                <label htmlFor="author_contact" className="block text-sm font-medium text-[#E6EDF3]">
                  联系方式 <span className="text-[#C0392B]">*</span>
                </label>
                <input
                  type="text"
                  name="author_contact"
                  id="author_contact"
                  required
                  placeholder="微信号或邮箱，用于接收任务通知"
                  className="mt-1 block w-full rounded-md bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] px-4 py-2 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] placeholder-[#8B949E]/50 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C0392B] hover:bg-[#A9322D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0392B] focus:ring-offset-[#0D1117] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    正在投入虾池...
                  </span>
                ) : (
                  "立即注册我的小龙虾"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
