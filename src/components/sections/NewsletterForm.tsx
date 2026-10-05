import { useState } from 'react'
import { CheckCircle, EnvelopeSimple, WarningCircle } from '@phosphor-icons/react'
import { site } from '../../config/site'

/**
 * Inscrição em novidades. SIMULAÇÃO: não envia para nenhum serviço.
 * Integração futura: troque `subscribe` por Mailchimp, Brevo, RD Station etc.
 */
async function subscribe(email: string) {
  await new Promise((r) => setTimeout(r, 600))
  if (site.isDemo) console.info('[demo] Inscrição simulada:', email.replace(/(.).+@/, '$1***@'))
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'sending' | 'done'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('sending')
    await subscribe(email.trim())
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <p role="status" className="mt-6 flex items-center gap-2 text-sm text-cream">
        <CheckCircle size={20} weight="fill" className="text-sage" aria-hidden="true" />
        Prontinho! Você vai receber as novas coleções em primeira mão.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 max-w-sm">
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-cream">
        Novidades do ateliê por e-mail
      </label>
      <div className="mt-2 flex gap-2">
        <div className="relative flex-1">
          <EnvelopeSimple size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/60" aria-hidden="true" />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'newsletter-erro' : 'newsletter-dica'}
            placeholder="seu@email.com"
            className="h-11 w-full rounded-full bg-cream/10 pl-10 pr-4 text-cream ring-1 ring-inset ring-cream/25 placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-butter aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-rose"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="h-11 shrink-0 rounded-full bg-butter px-4 text-sm font-semibold text-ink transition-colors hover:bg-[#f7dc8e] disabled:opacity-60"
        >
          {status === 'sending' ? 'Enviando…' : 'Quero'}
        </button>
      </div>
      {status === 'error' ? (
        <p id="newsletter-erro" className="mt-2 flex items-center gap-1.5 text-sm text-rose">
          <WarningCircle size={16} weight="fill" aria-hidden="true" /> Confira o e-mail — parece que falta algo.
        </p>
      ) : (
        <p id="newsletter-dica" className="mt-2 text-xs text-cream/60">
          Uma mensagem por coleção. Sem spam.
        </p>
      )}
    </form>
  )
}
