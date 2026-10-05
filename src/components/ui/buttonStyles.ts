/** Classes dos botões — espelham o componente Button do Figma (variantes × tamanhos) */
export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'cream'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold leading-none whitespace-nowrap ' +
  'transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] ' +
  'active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta-deep text-white shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_8px_20px_-10px_rgb(143_66_48/0.8)] hover:bg-terracotta-ink',
  secondary:
    'bg-transparent text-cocoa ring-[1.5px] ring-inset ring-cocoa/70 hover:bg-cocoa hover:text-cream hover:ring-cocoa',
  whatsapp:
    'bg-sage-deep text-white shadow-[0_8px_20px_-10px_rgb(58_86_54/0.9)] hover:bg-sage-ink',
  ghost: 'bg-transparent text-cocoa hover:bg-sand',
  cream: 'bg-cream text-cocoa hover:bg-white shadow-soft',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

