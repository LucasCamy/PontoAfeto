import type { ReactNode } from 'react'

export function SectionHeading({
  id,
  eyebrow,
  title,
  note,
  children,
  align = 'left',
  tone = 'default',
}: {
  id?: string
  eyebrow: string
  title: ReactNode
  note?: string
  children?: ReactNode
  align?: 'left' | 'center'
  tone?: 'default' | 'inverse'
}) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className={`eyebrow ${tone === 'inverse' ? '!text-butter' : ''}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 text-[2.1rem] sm:text-5xl ${tone === 'inverse' ? '!text-cream' : ''}`}
      >
        {title}
      </h2>
      {note && (
        <p className={`hand-note mt-2 text-2xl ${tone === 'inverse' ? 'text-rose' : 'text-terracotta-deep'}`} aria-hidden="true">
          {note}
        </p>
      )}
      {children && (
        <div className={`mt-4 text-lg leading-relaxed ${tone === 'inverse' ? 'text-cream/85' : 'text-cocoa-mid'}`}>
          {children}
        </div>
      )}
    </div>
  )
}
