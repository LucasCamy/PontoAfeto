import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { InstagramLogo, List, ShoppingBagOpen, WhatsappLogo, X } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { useShop } from '../../lib/shop'
import { whatsappLink } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { Sheet } from '../ui/Sheet'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { bagCount, dispatch } = useShop()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-cream/90 shadow-[0_1px_0_var(--color-sand-line)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
      >
        Pular para o conteúdo
      </a>
      <nav aria-label="Principal" className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <a href="#inicio" aria-label={`${site.name} — voltar ao início`} className="shrink-0 rounded-lg">
          <Logo />
        </a>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-cocoa transition-colors hover:bg-sand/70 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <button
            type="button"
            onClick={() => dispatch({ type: 'bag', open: true })}
            className="relative grid size-11 place-items-center rounded-full text-cocoa transition-colors hover:bg-sand/70"
            aria-label={`Abrir sacola${bagCount ? `, ${bagCount} ${bagCount === 1 ? 'item' : 'itens'}` : ', vazia'}`}
          >
            <ShoppingBagOpen size={24} weight="duotone" aria-hidden="true" />
            {bagCount > 0 && (
              <motion.span
                key={bagCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-terracotta-deep px-1 text-[0.7rem] font-bold leading-5 text-white"
                aria-hidden="true"
              >
                {bagCount}
              </motion.span>
            )}
          </button>

          <div className="hidden sm:block">
            <ButtonLink href={whatsappLink()} variant="primary" size="sm" icon={<WhatsappLogo size={18} weight="fill" aria-hidden="true" />}>
              Fale conosco
            </ButtonLink>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand/70 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen(true)}
          >
            <List size={26} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="top" labelledBy="menu-mobile-titulo" className="bg-cream">
        <div id="menu-mobile" className="flex h-full flex-col overflow-y-auto px-5 pb-8">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Logo />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={26} aria-hidden="true" />
            </button>
          </div>
          <h2 id="menu-mobile-titulo" className="sr-only">
            Menu
          </h2>
          <ul className="mt-6 flex flex-col">
            {site.nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    // fecha o menu primeiro e só depois rola, para a trava de rolagem não interferir
                    e.preventDefault()
                    setMenuOpen(false)
                    setTimeout(() => {
                      const target = document.getElementById(item.href.slice(1))
                      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      target?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
                      history.replaceState(null, '', item.href)
                    }, 60)
                  }}
                  className="flex items-baseline justify-between border-b border-dashed border-sand-line py-4 font-display text-[2rem] font-semibold text-cocoa"
                  style={{ fontVariationSettings: "'SOFT' 100" }}
                >
                  {item.label}
                  <span className="font-sans text-sm font-semibold text-cocoa-mid" aria-hidden="true">
                    0{i + 1}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <p className="hand-note text-2xl text-terracotta-deep">{site.tagline.toLowerCase()}</p>
            <ButtonLink
              href={whatsappLink()}
              variant="whatsapp"
              size="lg"
              icon={<WhatsappLogo size={22} weight="fill" aria-hidden="true" />}
            >
              Falar pelo WhatsApp
            </ButtonLink>
            <ButtonLink
              href={site.contact.instagramUrl}
              variant="secondary"
              size="lg"
              icon={<InstagramLogo size={22} aria-hidden="true" />}
            >
              {site.contact.instagramHandle}
            </ButtonLink>
          </div>
        </div>
      </Sheet>
    </header>
  )
}
