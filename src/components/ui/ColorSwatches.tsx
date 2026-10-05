import { Check } from '@phosphor-icons/react'
import type { ColorOption } from '../../data/products'

/**
 * Seleção de cores acessível. O nome da cor sempre aparece em texto
 * (não dependemos só da cor) e cada amostra tem área de toque de 44px.
 */
export function ColorSwatches({
  legend,
  colors,
  selected,
  onToggle,
  multiple = false,
  name,
  describedBy,
  invalid,
}: {
  legend: string
  colors: ColorOption[]
  selected: string[]
  onToggle: (color: string) => void
  multiple?: boolean
  name: string
  describedBy?: string
  invalid?: boolean
}) {
  const current = selected.length ? selected.join(', ') : 'nenhuma'
  return (
    <fieldset aria-describedby={describedBy} aria-invalid={invalid || undefined}>
      <legend className="text-sm font-semibold text-ink">
        {legend} <span className="font-normal text-cocoa-mid">— {current}</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-1">
        {colors.map((c) => {
          const checked = selected.includes(c.name)
          return (
            <label key={c.name} className="group relative grid size-11 place-items-center rounded-full" title={c.name}>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={c.name}
                checked={checked}
                onChange={() => onToggle(c.name)}
                className="peer sr-only"
              />
              <span
                className="grid size-8 place-items-center rounded-full ring-1 ring-ink/15 transition-[box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] group-hover:scale-105 peer-checked:ring-2 peer-checked:ring-cocoa peer-checked:ring-offset-2 peer-checked:ring-offset-ivory peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta-deep"
                style={{ backgroundColor: c.hex }}
              >
                {checked && <Check size={14} weight="bold" className={isDark(c.hex) ? 'text-white' : 'text-ink'} aria-hidden="true" />}
              </span>
              <span className="sr-only">{c.name}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return r * 0.299 + g * 0.587 + b * 0.114 < 140
}
