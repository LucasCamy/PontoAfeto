import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowCounterClockwise, CheckCircle, CircleNotch, ImageSquare, PaperPlaneTilt, Trash, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { yarnPalette } from '../../data/products'
import {
  emptyOrder,
  maskPhone,
  MAX_REFERENCE_MB,
  minDesiredDate,
  orderSummaryMessage,
  pieceTypes,
  PREFILL_EVENT,
  submitCustomOrder,
  validateOrder,
  type CustomOrder,
  type CustomOrderErrors,
} from '../../lib/customOrder'
import { whatsappLink } from '../../lib/whatsapp'
import { Button, ButtonLink } from '../ui/Button'
import { ColorSwatches } from '../ui/ColorSwatches'

const fieldOrder: (keyof CustomOrder)[] = [
  'pieceType',
  'colors',
  'size',
  'personalization',
  'desiredDate',
  'reference',
  'name',
  'whatsapp',
]

const fieldLabel: Partial<Record<keyof CustomOrder, string>> = {
  pieceType: 'Tipo de peça',
  colors: 'Cores',
  size: 'Tamanho',
  personalization: 'Nome ou inicial',
  desiredDate: 'Data desejada',
  reference: 'Referência visual',
  name: 'Seu nome',
  whatsapp: 'WhatsApp',
}

const sizes = [
  { value: 'P', label: 'Pequeno', hint: 'até 12 cm' },
  { value: 'M', label: 'Médio', hint: '13 a 25 cm' },
  { value: 'G', label: 'Grande', hint: 'acima de 25 cm' },
] as const

const inputClass =
  'mt-1.5 block w-full rounded-xl bg-white px-4 text-[1rem] text-ink ring-1 ring-inset ring-sand-line placeholder:text-cocoa-mid/70 transition-shadow focus:outline-none focus:ring-2 focus:ring-terracotta-deep aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error'

function FieldError({ id, children }: { id: string; children?: string }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-error"
        >
          <WarningCircle size={18} weight="fill" className="mt-px shrink-0" aria-hidden="true" />
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  hint,
  hintId,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  hint?: ReactNode
  hintId?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-cocoa-mid">(opcional)</span>}
      </label>
      {children}
      {hint && (
        <p id={hintId} className="mt-1.5 text-sm text-cocoa-mid">
          {hint}
        </p>
      )}
    </div>
  )
}

export function CustomOrderForm() {
  const uid = 'encomenda'
  const id = (name: string) => `${uid}-${name}`
  const [order, setOrder] = useState<CustomOrder>(emptyOrder)
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [protocol, setProtocol] = useState('')
  const [dragging, setDragging] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const minDate = useMemo(() => minDesiredDate(), [])

  const errors: CustomOrderErrors = attempted ? validateOrder(order) : {}
  const errorList = fieldOrder.filter((k) => errors[k])

  const previewUrl = useMemo(() => (order.reference ? URL.createObjectURL(order.reference) : null), [order.reference])
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus()
  }, [status])

  // Pré-preenchimento vindo do detalhe do produto
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<Partial<CustomOrder>>).detail
      setStatus('idle')
      setOrder((o) => ({ ...o, ...detail }))
    }
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [])

  const set = <K extends keyof CustomOrder>(key: K, value: CustomOrder[K]) => setOrder((o) => ({ ...o, [key]: value }))

  const toggleColor = (name: string) =>
    setOrder((o) => {
      if (o.colors.includes(name)) return { ...o, colors: o.colors.filter((c) => c !== name) }
      if (o.colors.length >= 4) return o
      return { ...o, colors: [...o.colors, name] }
    })

  const describe = (key: keyof CustomOrder, extra?: string) =>
    [errors[key] ? id(`${key}-erro`) : null, extra].filter(Boolean).join(' ') || undefined

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAttempted(true)
    const found = validateOrder(order)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    const res = await submitCustomOrder(order)
    setProtocol(res.protocol)
    setStatus('done')
  }

  function reset() {
    setOrder(emptyOrder)
    setAttempted(false)
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <motion.div
        ref={doneRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start p-6 outline-none sm:p-9"
        role="status"
      >
        <span className="grid size-14 place-items-center rounded-full bg-sage-soft text-sage-deep">
          <CheckCircle size={34} weight="duotone" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-3xl">Ficha recebida, {order.name.trim().split(' ')[0]}!</h3>
        <p className="mt-3 leading-relaxed text-cocoa-mid">
          Seu protocolo é <strong className="font-semibold text-ink">{protocol}</strong>. Para agilizar, envie o resumo pelo
          WhatsApp{order.reference ? ' junto com a sua imagem de referência' : ''}. Respondemos com orçamento e prévia das cores
          em até 1 dia útil.
        </p>
        <dl className="mt-6 grid w-full gap-x-6 gap-y-3 rounded-2xl bg-cream p-5 text-sm xs:grid-cols-2">
          <div>
            <dt className="font-semibold text-cocoa-mid">Peça</dt>
            <dd className="text-ink">{order.pieceType}</dd>
          </div>
          <div>
            <dt className="font-semibold text-cocoa-mid">Tamanho</dt>
            <dd className="text-ink">{sizes.find((s) => s.value === order.size)?.label}</dd>
          </div>
          <div className="xs:col-span-2">
            <dt className="font-semibold text-cocoa-mid">Cores</dt>
            <dd className="text-ink">{order.colors.join(', ')}</dd>
          </div>
        </dl>
        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappLink(orderSummaryMessage(order, protocol))}
            variant="whatsapp"
            size="lg"
            icon={<WhatsappLogo size={22} weight="fill" aria-hidden="true" />}
          >
            Enviar resumo pelo WhatsApp
          </ButtonLink>
          <Button variant="ghost" size="lg" onClick={reset} icon={<ArrowCounterClockwise size={20} aria-hidden="true" />}>
            Nova encomenda
          </Button>
        </div>
        {site.isDemo && (
          <p className="mt-5 text-xs text-cocoa-mid">
            Ambiente de demonstração: a ficha não foi enviada a nenhum servidor. O resumo segue apenas pelo WhatsApp.
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="p-5 sm:p-8" aria-labelledby={id('titulo')}>
      <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-sand-line pb-4">
        <h3 id={id('titulo')} className="text-2xl sm:text-[1.7rem]">
          Ficha de encomenda
        </h3>
        <span className="hand-note text-xl text-terracotta-deep" aria-hidden="true">
          nº {new Date().getFullYear()}
        </span>
      </div>

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-2xl bg-rose-soft p-4 text-sm text-terracotta-ink outline-none focus-visible:ring-2 focus-visible:ring-error"
        >
          <p className="font-semibold">Faltam alguns detalhes para a gente começar:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline underline-offset-2">
                  {fieldLabel[k]}
                </a>
                : {errors[k]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-6">
        {/* Tipo de peça */}
        <fieldset aria-describedby={describe('pieceType')} aria-invalid={!!errors.pieceType || undefined}>
          <legend id={id('pieceType')} tabIndex={-1} className="text-sm font-semibold text-ink">
            O que você imaginou?
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {pieceTypes.map((t) => (
              <label key={t} className="relative">
                <input
                  type="radio"
                  name="pieceType"
                  value={t}
                  checked={order.pieceType === t}
                  onChange={() => set('pieceType', t)}
                  className="peer sr-only"
                />
                <span className="inline-flex h-11 items-center rounded-full bg-white px-4 text-[0.95rem] font-medium text-cocoa ring-1 ring-inset ring-sand-line transition-colors hover:bg-sand/60 peer-checked:bg-cocoa peer-checked:text-cream peer-checked:ring-cocoa peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta-deep">
                  {t}
                </span>
              </label>
            ))}
          </div>
          <FieldError id={id('pieceType-erro')}>{errors.pieceType}</FieldError>
        </fieldset>

        {/* Cores */}
        <div id={id('colors')} tabIndex={-1} className="outline-none">
          <ColorSwatches
            legend="Cores (até 4)"
            name="colors"
            multiple
            colors={yarnPalette}
            selected={order.colors}
            onToggle={toggleColor}
            describedBy={describe('colors')}
            invalid={!!errors.colors}
          />
          <FieldError id={id('colors-erro')}>{errors.colors}</FieldError>
        </div>

        {/* Tamanho */}
        <fieldset aria-describedby={describe('size')} aria-invalid={!!errors.size || undefined}>
          <legend id={id('size')} tabIndex={-1} className="text-sm font-semibold text-ink">
            Tamanho aproximado
          </legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <label key={s.value} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={s.value}
                  checked={order.size === s.value}
                  onChange={() => set('size', s.value)}
                  className="peer sr-only"
                />
                <span className="flex min-h-14 flex-col items-center justify-center rounded-2xl bg-white px-2 py-2 text-center ring-1 ring-inset ring-sand-line transition-colors hover:bg-sand/60 peer-checked:bg-cocoa peer-checked:text-cream peer-checked:ring-cocoa peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta-deep [&>small]:peer-checked:text-cream/80">
                  <span className="font-semibold">{s.label}</span>
                  <small className="text-xs text-cocoa-mid">{s.hint}</small>
                </span>
              </label>
            ))}
          </div>
          <FieldError id={id('size-erro')}>{errors.size}</FieldError>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Nome ou inicial" htmlFor={id('personalization')} optional hint={`${order.personalization.length}/20 caracteres`} hintId={id('personalization-dica')}>
            <input
              id={id('personalization')}
              type="text"
              maxLength={20}
              value={order.personalization}
              onChange={(e) => set('personalization', e.target.value)}
              aria-invalid={!!errors.personalization}
              aria-describedby={describe('personalization', id('personalization-dica'))}
              className={`${inputClass} h-12`}
              placeholder="Ex.: Helena ou H"
            />
            <FieldError id={id('personalization-erro')}>{errors.personalization}</FieldError>
          </Field>
          <Field label="Tema" htmlFor={id('theme')} optional>
            <input
              id={id('theme')}
              type="text"
              value={order.theme}
              onChange={(e) => set('theme', e.target.value)}
              className={`${inputClass} h-12`}
              placeholder="Ex.: jardim, fundo do mar"
            />
          </Field>
        </div>

        <Field
          label="Para quando você precisa?"
          htmlFor={id('desiredDate')}
          optional
          hint="Prazo mínimo de 7 dias. Datas especiais? Avise com antecedência."
          hintId={id('desiredDate-dica')}
        >
          <input
            id={id('desiredDate')}
            type="date"
            min={minDate}
            value={order.desiredDate}
            onChange={(e) => set('desiredDate', e.target.value)}
            aria-invalid={!!errors.desiredDate}
            aria-describedby={describe('desiredDate', id('desiredDate-dica'))}
            className={`${inputClass} h-12 sm:max-w-xs`}
          />
          <FieldError id={id('desiredDate-erro')}>{errors.desiredDate}</FieldError>
        </Field>

        <Field label="Conte os detalhes" htmlFor={id('notes')} optional>
          <textarea
            id={id('notes')}
            rows={3}
            value={order.notes}
            onChange={(e) => set('notes', e.target.value)}
            className={`${inputClass} resize-y py-3`}
            placeholder="Para quem é, ocasião, algum detalhe que não pode faltar…"
          />
        </Field>

        {/* Referência visual */}
        <div>
          <p className="text-sm font-semibold text-ink">
            Referência visual <span className="font-normal text-cocoa-mid">(opcional)</span>
          </p>
          {order.reference && previewUrl ? (
            <div className="mt-2 flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-inset ring-sand-line">
              <img src={previewUrl} alt="Prévia da imagem de referência enviada" className="size-16 rounded-xl object-cover" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate font-semibold text-ink">{order.reference.name}</p>
                <p className="text-cocoa-mid">{(order.reference.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => set('reference', null)}
                className="grid size-11 place-items-center rounded-full text-cocoa-mid hover:bg-rose-soft hover:text-error"
                aria-label="Remover imagem de referência"
              >
                <Trash size={20} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label
              htmlFor={id('reference')}
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                const file = e.dataTransfer.files?.[0]
                if (file) set('reference', file)
              }}
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
                dragging ? 'border-terracotta-deep bg-rose-soft' : 'border-sand-line bg-white hover:bg-cream'
              } has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta-deep`}
            >
              <ImageSquare size={30} weight="duotone" className="text-terracotta-deep" aria-hidden="true" />
              <span className="font-semibold text-cocoa">Arraste uma imagem ou toque para escolher</span>
              <span className="text-sm text-cocoa-mid">JPG, PNG ou WEBP até {MAX_REFERENCE_MB} MB</span>
              <input
                id={id('reference')}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-invalid={!!errors.reference}
                aria-describedby={describe('reference')}
                onChange={(e) => set('reference', e.target.files?.[0] ?? null)}
              />
            </label>
          )}
          <FieldError id={id('reference-erro')}>{errors.reference}</FieldError>
        </div>

        <div className="grid gap-6 border-t border-dashed border-sand-line pt-6 sm:grid-cols-2">
          <Field label="Seu nome" htmlFor={id('name')}>
            <input
              id={id('name')}
              type="text"
              autoComplete="name"
              value={order.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={describe('name')}
              aria-required="true"
              className={`${inputClass} h-12`}
            />
            <FieldError id={id('name-erro')}>{errors.name}</FieldError>
          </Field>
          <Field label="WhatsApp com DDD" htmlFor={id('whatsapp')}>
            <input
              id={id('whatsapp')}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={order.whatsapp}
              onChange={(e) => set('whatsapp', maskPhone(e.target.value))}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={describe('whatsapp')}
              aria-required="true"
              placeholder="(11) 91234-5678"
              className={`${inputClass} h-12`}
            />
            <FieldError id={id('whatsapp-erro')}>{errors.whatsapp}</FieldError>
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'sending'}
          icon={
            status === 'sending' ? (
              <CircleNotch size={20} className="animate-spin" aria-hidden="true" />
            ) : (
              <PaperPlaneTilt size={20} weight="fill" aria-hidden="true" />
            )
          }
        >
          {status === 'sending' ? 'Enviando ficha…' : 'Enviar ficha de encomenda'}
        </Button>
        <p className="text-sm text-cocoa-mid">Sem compromisso: o orçamento vem antes de tudo.</p>
      </div>
    </form>
  )
}
