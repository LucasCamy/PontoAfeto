import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'

type Side = 'right' | 'center' | 'top'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const ease = [0.22, 1, 0.36, 1] as const

const panelMotion: Record<Side, object> = {
  right: {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: 0.42, ease } },
    exit: { x: '100%', transition: { duration: 0.28, ease: [0.55, 0, 0.75, 0.2] } },
  },
  center: {
    initial: { opacity: 0, y: 28, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease } },
    exit: { opacity: 0, y: 14, transition: { duration: 0.2 } },
  },
  top: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
  },
}

const panelClass: Record<Side, string> = {
  right: 'ml-auto h-full w-full max-w-md rounded-l-[28px]',
  center:
    'mx-auto mt-auto max-h-[94dvh] w-full max-w-5xl rounded-t-[28px] sm:my-auto sm:max-h-[90dvh] sm:rounded-[28px]',
  top: 'h-full w-full',
}

/**
 * Painel modal acessível (diálogo): prende o foco, fecha com Esc ou clique
 * no fundo, trava a rolagem da página e devolve o foco a quem o abriu.
 */
export function Sheet({
  open,
  onClose,
  side = 'center',
  labelledBy,
  children,
  className = '',
}: {
  open: boolean
  onClose: () => void
  side?: Side
  labelledBy: string
  children: ReactNode
  className?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const scrollbar = window.innerWidth - root.clientWidth
    root.style.overflow = 'hidden'
    root.style.paddingRight = `${scrollbar}px`

    const focusFirst = requestAnimationFrame(() => {
      const panel = panelRef.current
      const target = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE)
      ;(target ?? panel)?.focus()
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(focusFirst)
      document.removeEventListener('keydown', onKey)
      root.style.overflow = ''
      root.style.paddingRight = ''
      previous?.focus?.({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={`relative flex flex-col overflow-hidden bg-ivory shadow-lift outline-none ${panelClass[side]} ${className}`}
            {...panelMotion[side]}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
