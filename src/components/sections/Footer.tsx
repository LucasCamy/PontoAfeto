import { Clock, EnvelopeSimple, InstagramLogo, MapPin, Truck, WhatsappLogo } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { whatsappLink } from '../../lib/whatsapp'
import { Logo } from '../ui/Logo'
import { NewsletterForm } from './NewsletterForm'

/** Rodapé. Contatos vêm de config/site.ts e são FICTÍCIOS até serem trocados. */
export function Footer() {
  const year = new Date().getFullYear()
  const links = [...site.nav.filter((n) => n.href !== '#contato'), { label: 'Dúvidas frequentes', href: '#duvidas' }]

  return (
    <footer id="contato" aria-labelledby="rodape-titulo" className="bg-ink text-cream">
      <h2 id="rodape-titulo" className="sr-only">
        Contato e informações
      </h2>
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:px-10">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs leading-relaxed text-cream/75">{site.description}</p>
          <p className="hand-note mt-4 text-2xl text-rose">{site.tagline.toLowerCase()}</p>
          <NewsletterForm />
        </div>

        <nav aria-label="Rodapé">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-butter">Navegue</p>
          <ul className="mt-4 space-y-1">
            {links.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-10 items-center text-cream/80 transition-colors hover:text-white hover:underline">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-butter">Fale com a gente</p>
          <ul className="mt-4 space-y-3 text-cream/80">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 hover:text-white">
                <WhatsappLogo size={20} aria-hidden="true" /> {site.contact.whatsappDisplay}
                <span className="sr-only">(WhatsApp, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 hover:text-white">
                <InstagramLogo size={20} aria-hidden="true" /> {site.contact.instagramHandle}
                <span className="sr-only">(Instagram, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={'mailto:' + site.contact.email} className="inline-flex min-h-10 items-center gap-2.5 break-all hover:text-white">
                <EnvelopeSimple size={20} aria-hidden="true" /> {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> {site.contact.hours}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-butter">Envio</p>
          <ul className="mt-4 space-y-3 text-cream/80">
            <li className="flex items-start gap-2.5">
              <Truck size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> {site.shipping.summary}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> Ateliê em {site.contact.city} · retirada com hora marcada
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="stitch-line text-cream/20" aria-hidden="true" />
        <div className="flex flex-col gap-3 py-6 text-sm text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Feito à mão, ponto a ponto.
          </p>
          <div className="flex gap-5">
            <a href={site.legal.privacyUrl} className="inline-flex min-h-10 items-center hover:text-white hover:underline">
              Política de privacidade
            </a>
            <a href="#duvidas" className="inline-flex min-h-10 items-center hover:text-white hover:underline">
              Trocas e cuidados
            </a>
          </div>
        </div>

        {/* Resumo de privacidade — TODO: revisar com a política oficial da loja */}
        <details id="privacidade" className="group border-t border-dashed border-cream/15 py-5 text-sm text-cream/70">
          <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 font-semibold text-cream/85 hover:text-white">
            <span className="transition-transform duration-200 group-open:rotate-90" aria-hidden="true">›</span>
            Política de privacidade (resumo)
          </summary>
          <div className="mt-2 max-w-3xl space-y-2 leading-relaxed">
            <p>
              Usamos os dados que você envia (nome, WhatsApp e detalhes da encomenda) apenas para responder ao seu pedido,
              combinar pagamento e entrega. Não vendemos nem compartilhamos seus dados com terceiros para publicidade.
            </p>
            <p>
              A sacola fica salva só no seu navegador. Para pedir a exclusão dos seus dados, escreva para {site.contact.email}.
            </p>
          </div>
        </details>
      </div>
    </footer>
  )
}
