import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { whatsappLink } from '../../lib/whatsapp'

/**
 * Botão flutuante do WhatsApp. Aparece depois da hero para não competir
 * com os CTAs principais. No hover/foco revela o rótulo.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar pelo WhatsApp (abre em nova aba)"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.18 } }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center rounded-full bg-sage-deep px-4 text-white shadow-[0_14px_30px_-12px_rgb(58_86_54/0.9)] transition-colors duration-300 hover:bg-sage-ink sm:right-6"
        >
          <WhatsappLogo size={26} weight="fill" aria-hidden="true" className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-rotate-12" />
          <span
            className="grid grid-cols-[0fr] transition-[grid-template-columns,margin] duration-300 ease-[var(--ease-out-soft)] group-hover:ml-2.5 group-hover:grid-cols-[1fr] group-focus-visible:ml-2.5 group-focus-visible:grid-cols-[1fr]"
            aria-hidden="true"
          >
            <span className="overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold">Fale com a gente</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
