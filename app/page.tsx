'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

  useEffect(() => {
    // 获取当前等待列表人数
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setWaitlistCount(data.count)
        }
      })
      .catch(() => {
        // 静默失败
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('请输入邮箱地址')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || '成功加入等待列表！')
        setEmail('')
        if (waitlistCount !== null) {
          setWaitlistCount(waitlistCount + 1)
        }
      } else {
        setStatus('error')
        setMessage(data.error || '提交失败，请重试')
      }
    } catch {
      setStatus('error')
      setMessage('网络错误，请检查连接后重试')
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* 背景效果 */}
      <div className="grid-bg" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      {/* 主要内容 */}
      <main className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Logo / 品牌 */}
        <div className="opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-sm font-mono text-[#6b6b7b]">COMING SOON</span>
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="opacity-0 animate-fade-in-up delay-100 text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-[#e8e8ed]">AI</span>
          <span className="text-[#00ff88]">Maker</span>
        </h1>

        {/* 副标题 */}
        <p className="opacity-0 animate-fade-in-up delay-200 text-xl sm:text-2xl text-[#6b6b7b] mb-4 font-light">
          让 AI 成为你的<span className="text-[#e8e8ed]">创造力引擎</span>
        </p>

        <p className="opacity-0 animate-fade-in-up delay-300 text-[#6b6b7b] mb-12 max-w-md mx-auto leading-relaxed">
          我们正在构建下一代 AI 创作平台，帮助创作者突破想象力的边界。
          加入等待列表，第一时间体验未来。
        </p>

        {/* 邮箱表单 */}
        <form onSubmit={handleSubmit} className="opacity-0 animate-fade-in-up delay-400">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <div className="input-glow flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') {
                    setStatus('idle')
                    setMessage('')
                  }
                }}
                placeholder="your@email.com"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-5 py-4 rounded-xl bg-[#14141a] border border-[#2a2a35] text-[#e8e8ed] placeholder-[#4a4a5a] focus:outline-none focus:border-[#00ff88] transition-colors font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn-primary px-8 py-4 rounded-xl bg-[#00ff88] text-[#0a0a0f] font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <>
                  <svg className="w-5 h-5 spinner" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>加入中...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <svg className="w-5 h-5 checkmark-animate" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>已加入!</span>
                </>
              ) : (
                <>
                  <span>Join Waitlist</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* 状态消息 */}
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-[#00ff88]'}`}>
              {message}
            </p>
          )}
        </form>

        {/* 等待列表人数 */}
        {waitlistCount !== null && waitlistCount > 0 && (
          <div className="opacity-0 animate-fade-in-up delay-500 mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
              <div className="flex -space-x-2">
                {[...Array(Math.min(waitlistCount, 4))].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold"
                    style={{
                      background: ['#00ff88', '#00ccff', '#ff0088', '#ffcc00'][i % 4],
                      color: '#0a0a0f'
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {waitlistCount > 4 && (
                  <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-[#2a2a35] flex items-center justify-center text-xs font-mono text-[#6b6b7b]">
                    +{waitlistCount - 4}
                  </div>
                )}
              </div>
              <span className="text-sm text-[#6b6b7b]">
                <span className="text-[#e8e8ed] font-semibold font-mono">{waitlistCount}</span> 人已加入
              </span>
            </div>
          </div>
        )}

        {/* 底部特性预览 */}
        <div className="opacity-0 animate-fade-in-up delay-500 mt-20 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '⚡', label: 'AI 驱动' },
            { icon: '🎨', label: '无限创意' },
            { icon: '🚀', label: '极速生成' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl glass-card hover:border-[#00ff88]/30 transition-colors cursor-default">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-[#6b6b7b] font-mono">{item.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center z-10">
        <p className="text-xs text-[#4a4a5a] font-mono">
          © 2024 AIMaker. Building the future of AI creativity.
        </p>
      </footer>
    </div>
  )
}
