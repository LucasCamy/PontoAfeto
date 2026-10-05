import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, WhatsappLogo } from '@phosphor-icons/react'
import { faq } from '../../data/content'
import { whatsappLink } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="duvidas" aria-labelledby="faq-titulo" className="bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-titulo" eyebrow="Dúvidas frequentes" title="Antes de encomendar" note="e se ficar alguma dúvida, chama!">
            Prazos, envio, cuidados com as peças e como funciona uma encomenda.
          </SectionHeading>
          <ButtonLink
            href={whatsappLink('Olá! Tenho uma dúvida sobre as peças.')}
            variant="whatsapp"
            className="mt-8"
            icon={<WhatsappLogo size={20} weight="fill" aria-hidden="true" />}
          >
            Perguntar no WhatsApp
          </ButtonLink>
        </div>

        <div className="divide-y divide-dashed divide-cocoa/20 border-y border-dashed border-cocoa/20">
          {faq.map((item, i) => {
            const isOpen = open === i
            const btnId = `faq-pergunta-${i}`
            const panelId = `faq-resposta-${i}`
            return (
              <div key={item.question}>
                <h3 className="font-sans text-base font-semibold tracking-normal text-ink">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-[1.05rem] transition-colors hover:text-terracotta-ink sm:text-lg"
                  >
                    {item.question}
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ease-[var(--ease-out-soft)] ${
                        isOpen ? 'rotate-45 bg-terracotta-deep text-white' : 'bg-ivory text-cocoa'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={18} weight="bold" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25, delay: 0.05 } } }}
                      exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.25, ease: [0.55, 0, 0.75, 0.2] }, opacity: { duration: 0.12 } } }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-6 pr-12 leading-relaxed text-cocoa-mid">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
