import type { ReactNode } from 'react'

export type BadgeTone = 'butter' | 'rose' | 'sage' | 'lavender' | 'cocoa' | 'muted'

const tones: Record<BadgeTone, string> = {
  butter: 'bg-butter text-ink',
  rose: 'bg-rose-soft text-terracotta-ink',
  sage: 'bg-sage-soft text-sage-ink',
  lavender: 'bg-lavender-soft text-[#4b4270]',
  cocoa: 'bg-cocoa text-cream',
  muted: 'bg-ink/75 text-cream',
}

export function Badge({ tone = 'butter', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
