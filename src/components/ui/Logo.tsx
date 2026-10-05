import { site } from '../../config/site'

type Tone = 'color' | 'light' | 'mono-dark' | 'mono-light'

const tones: Record<Tone, { ball: string; thread: string; heart: string; word: string; sub: string }> = {
  color: { ball: '#D98268', thread: '#FFF8EF', heart: '#B0553D', word: '#5C4033', sub: '#8F4230' },
  light: { ball: '#E9A6A6', thread: '#5C4033', heart: '#F4D06F', word: '#FFF8EF', sub: '#F4D06F' },
  'mono-dark': { ball: '#3F3029', thread: '#FFFFFF', heart: '#3F3029', word: '#3F3029', sub: '#3F3029' },
  'mono-light': { ball: '#FFFFFF', thread: '#3F3029', heart: '#FFFFFF', word: '#FFFFFF', sub: '#FFFFFF' },
}

/**
 * Símbolo "novelo-coração": um novelo com três voltas de fio cuja ponta
 * solta termina em um laço de coração. Funciona sozinho como avatar,
 * selo de etiqueta e marca d'água.
 */
export function LogoMark({ size = 40, tone = 'color', className }: { size?: number; tone?: Tone; className?: string }) {
  const t = tones[tone]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="21" cy="25" r="16" fill={t.ball} />
      <g stroke={t.thread} strokeWidth="2.2" strokeLinecap="round">
        <path d="M9.5 18.5c6 3.5 17 4 23-3" />
        <path d="M7 27c8 4.5 21 4 28-5" />
        <path d="M11 35.5c6 2 15 1 21-6" />
      </g>
      {/* ponta do fio terminando em coração */}
      <path
        d="M35 15.5c3-4 5.5-7 9-6.5"
        stroke={t.heart}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M42.6 5.6c-1-1.5-3.4-1.3-3.7.8-.3 1.8 1.8 3.3 3.6 4.4 1.8-1.1 3.9-2.6 3.6-4.4-.3-2.1-2.7-2.3-3.5-.8Z"
        fill={t.heart}
      />
    </svg>
  )
}

export function Logo({
  tone = 'color',
  showDescriptor = true,
  className = '',
}: {
  tone?: Tone
  showDescriptor?: boolean
  className?: string
}) {
  const t = tones[tone]
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} size={38} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.45rem] font-semibold tracking-[-0.02em]"
          style={{ color: t.word, fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
        >
          {site.name}
        </span>
        {showDescriptor && (
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em]" style={{ color: t.sub }}>
            {site.descriptor}
          </span>
        )}
      </span>
    </span>
  )
}
