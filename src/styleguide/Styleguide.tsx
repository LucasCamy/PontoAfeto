/**
 * STYLEGUIDE — espelho navegável das páginas do Figma (Cover, Brand,
 * Design System, Components). Usa os mesmos componentes do site, então
 * nunca fica desatualizado em relação ao código.
 * Abra em /styleguide.html. Pode ser importado no Figma com o plugin
 * html.to.design para virar camadas editáveis (veja FIGMA_GUIDE.md).
 */
import type { ReactNode } from 'react'
import { Check, Prohibit, ShoppingBagOpen, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { site } from '../config/site'
import { benefits, processSteps, testimonials } from '../data/content'
import { getProduct, palette } from '../data/products'
import { ShopProvider } from '../lib/shop'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { buttonClass, type ButtonVariant } from '../components/ui/buttonStyles'
import { ColorSwatches } from '../components/ui/ColorSwatches'
import { Icon } from '../components/ui/Icon'
import { Logo, LogoMark } from '../components/ui/Logo'
import { ProductCard } from '../components/sections/ProductCard'

const colors = [
  { token: 'cream', hex: '#FFF8EF', name: 'Creme', role: 'Fundo da página', text: 'ink' },
  { token: 'ivory', hex: '#FFFDF9', name: 'Marfim', role: 'Superfícies, cards, diálogos', text: 'ink' },
  { token: 'sand', hex: '#F3E6D6', name: 'Areia', role: 'Placeholder de imagem, hovers', text: 'ink' },
  { token: 'sand-line', hex: '#E8D7C3', name: 'Linha', role: 'Bordas e divisórias tracejadas', text: 'ink' },
  { token: 'terracotta', hex: '#D98268', name: 'Terracota suave', role: 'Marca, ilustração, fio decorativo', text: 'ink' },
  { token: 'terracotta-deep', hex: '#B0553D', name: 'Terracota profunda', role: 'CTA principal (AA com branco)', text: 'white' },
  { token: 'terracotta-ink', hex: '#8F4230', name: 'Terracota tinta', role: 'Eyebrows, hover do CTA', text: 'white' },
  { token: 'rose', hex: '#E9A6A6', name: 'Rosa antigo', role: 'Acentos, notas', text: 'ink' },
  { token: 'butter', hex: '#F4D06F', name: 'Amarelo manteiga', role: 'Destaque: badges, selos', text: 'ink' },
  { token: 'sage', hex: '#A8B89F', name: 'Verde sálvia', role: 'Fundos de seção (soft)', text: 'ink' },
  { token: 'sage-deep', hex: '#4A6B45', name: 'Sálvia profunda', role: 'WhatsApp e sucesso', text: 'white' },
  { token: 'lavender', hex: '#B9B0D9', name: 'Azul lavanda', role: 'Somente “sob encomenda”', text: 'ink' },
  { token: 'cocoa', hex: '#5C4033', name: 'Marrom cacau', role: 'Títulos, seções escuras', text: 'white' },
  { token: 'cocoa-mid', hex: '#765443', name: 'Marrom médio (AA)', role: 'Texto secundário', text: 'white' },
  { token: 'ink', hex: '#3F3029', name: 'Texto principal', role: 'Corpo de texto, rodapé', text: 'white' },
  { token: 'error', hex: '#A63A2B', name: 'Alerta', role: 'Erros (sempre com ícone + texto)', text: 'white' },
]

function Page({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-dashed border-sand-line py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="eyebrow">Página {n}</p>
        <h2 className="mt-2 text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function Frame({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-1 items-center justify-center rounded-3xl p-6 ring-1 ring-sand-line">{children}</div>
      <figcaption className="text-sm text-cocoa-mid">{label}</figcaption>
    </figure>
  )
}

function Do({ ok, children, label }: { ok: boolean; children: ReactNode; label: string }) {
  return (
    <figure>
      <div className={`grid h-36 place-items-center overflow-hidden rounded-2xl ring-2 ${ok ? 'ring-sage-deep' : 'ring-error'}`}>{children}</div>
      <figcaption className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${ok ? 'text-sage-ink' : 'text-error'}`}>
        {ok ? <Check weight="bold" aria-hidden="true" /> : <Prohibit weight="bold" aria-hidden="true" />}
        {label}
      </figcaption>
    </figure>
  )
}

const variants: ButtonVariant[] = ['primary', 'secondary', 'whatsapp', 'ghost', 'cream']
const hoverClass: Record<ButtonVariant, string> = {
  primary: '!bg-terracotta-ink',
  secondary: '!bg-cocoa !text-cream',
  whatsapp: '!bg-sage-ink',
  ghost: '!bg-sand',
  cream: '!bg-white',
}

const inputBase =
  'mt-1.5 block h-12 w-full rounded-xl bg-white px-4 text-ink ring-1 ring-inset ring-sand-line placeholder:text-cocoa-mid/70'

export function Styleguide() {
  const card = getProduct('gatinho-amigurumi')!
  const sold = getProduct('familia-pinguim')!
  const custom = getProduct('coelho-jardineiro-personalizado')!

  return (
    <ShopProvider>
      <div className="paper-grain min-h-screen">
        <nav aria-label="Páginas do styleguide" className="sticky top-0 z-40 border-b border-sand-line bg-cream/90 backdrop-blur">
          <ul className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-6 py-3 text-sm font-semibold">
            {[
              ['cover', '1 · Cover'],
              ['brand', '2 · Brand'],
              ['design-system', '3 · Design System'],
              ['components', '6 · Components'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="block whitespace-nowrap rounded-full px-3 py-2 text-cocoa hover:bg-sand">
                  {label}
                </a>
              </li>
            ))}
            <li className="ml-auto">
              <a href="/" className="block whitespace-nowrap rounded-full px-3 py-2 text-terracotta-ink hover:bg-sand">
                Ver landing page →
              </a>
            </li>
          </ul>
        </nav>

        {/* 1 · COVER */}
        <header id="cover" className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Logo />
            <h1 className="mt-10 text-6xl" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
              {site.name} — Brand & Landing
            </h1>
            <p className="mt-4 max-w-xl text-lg text-cocoa-mid">{site.description}</p>
            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold">Direção visual</dt>
                <dd className="text-cocoa-mid">Cozy Handmade Studio</dd>
              </div>
              <div>
                <dt className="font-semibold">Data</dt>
                <dd className="text-cocoa-mid">05/10/2026</dd>
              </div>
              <div>
                <dt className="font-semibold">Status</dt>
                <dd>
                  <Badge tone="butter">Em revisão · v0.1</Badge>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Fonte da verdade</dt>
                <dd className="text-cocoa-mid">Figma + design/tokens.json</dd>
              </div>
            </dl>
            <p className="mt-8 max-w-xl rounded-2xl bg-butter-soft p-4 text-sm text-ink">
              Nome “{site.name}”, produtos, preços, fotos, depoimentos e contatos são <strong>demonstrativos</strong> e podem ser
              substituídos sem alterar o layout.
            </p>
          </div>
          <div className="stitch-texture grid aspect-square place-items-center rounded-[48px] bg-rose-soft">
            <LogoMark size={220} />
          </div>
        </header>

        {/* 2 · BRAND */}
        <Page id="brand" n="2" title="Marca">
          <div className="grid gap-6 md:grid-cols-2">
            <Frame label="Logotipo principal — sobre creme" className="md:col-span-2">
              <div className="scale-150 py-6">
                <Logo />
              </div>
            </Frame>
            <Frame label="Versão escura — sobre cacau">
              <div className="-m-6 grid h-40 w-[calc(100%+3rem)] place-items-center rounded-3xl bg-cocoa">
                <Logo tone="light" />
              </div>
            </Frame>
            <Frame label="Versão clara — sobre terracota profunda">
              <div className="-m-6 grid h-40 w-[calc(100%+3rem)] place-items-center rounded-3xl bg-terracotta-deep">
                <Logo tone="light" />
              </div>
            </Frame>
            <Frame label="Monocromática — preto (impressão, carimbo)">
              <div className="grid h-28 place-items-center bg-white px-6">
                <Logo tone="mono-dark" />
              </div>
            </Frame>
            <Frame label="Monocromática — branco (gravação, marca d'água)">
              <div className="-m-6 grid h-40 w-[calc(100%+3rem)] place-items-center rounded-3xl bg-ink">
                <Logo tone="mono-light" />
              </div>
            </Frame>
          </div>

          <h3 className="mt-14 text-2xl">Símbolo e aplicações</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Frame label="Avatar de rede social">
              <div className="grid size-32 place-items-center rounded-full bg-rose-soft">
                <LogoMark size={84} />
              </div>
            </Frame>
            <Frame label="Etiqueta de produto (tag)">
              <div className="relative w-36 rounded-[10px_10px_16px_16px] bg-ivory px-4 pb-4 pt-8 text-center shadow-paper ring-1 ring-sand-line">
                <span className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-cream ring-1 ring-cocoa/40" />
                <LogoMark size={36} className="mx-auto" />
                <p className="mt-2 font-display text-sm font-semibold">feito à mão</p>
                <p className="hand-note text-lg text-terracotta-deep">com carinho</p>
              </div>
            </Frame>
            <Frame label="Adesivo de embalagem">
              <div className="grid size-32 place-items-center rounded-full bg-butter text-center">
                <div>
                  <LogoMark size={40} className="mx-auto" tone="mono-dark" />
                  <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">obrigada!</p>
                </div>
              </div>
            </Frame>
            <Frame label="Marca d'água (8% de opacidade)">
              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-sage-soft">
                <LogoMark size={140} tone="mono-dark" className="absolute -bottom-6 -right-6 opacity-[0.08]" />
              </div>
            </Frame>
          </div>

          <h3 className="mt-14 text-2xl">Área de proteção</h3>
          <div className="mt-6 flex flex-wrap items-center gap-10">
            <div className="relative p-[38px] outline-2 outline-dashed outline-rose" style={{ outlineOffset: 0 }}>
              <Logo />
              <span className="absolute left-0 top-0 grid h-[38px] w-[38px] place-items-center text-xs font-bold text-terracotta-ink">x</span>
            </div>
            <p className="max-w-md text-cocoa-mid">
              Espaço livre mínimo = <strong>x</strong>, a altura do símbolo (novelo). Tamanho mínimo: 24 px de símbolo em telas,
              12 mm em impressos. Abaixo disso, use só o símbolo.
            </p>
          </div>

          <h3 className="mt-14 text-2xl">Uso correto e incorreto</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Do ok label="Sobre fundos lisos da paleta">
              <div className="grid size-full place-items-center bg-sage-soft">
                <Logo />
              </div>
            </Do>
            <Do ok={false} label="Não distorcer ou esticar">
              <div className="scale-x-150">
                <Logo showDescriptor={false} />
              </div>
            </Do>
            <Do ok={false} label="Não trocar as cores do símbolo">
              <span className="hue-rotate-[160deg]">
                <Logo />
              </span>
            </Do>
            <Do ok={false} label="Não aplicar sombra, brilho ou contorno">
              <span className="drop-shadow-[0_0_8px_#B9B0D9]">
                <Logo />
              </span>
            </Do>
          </div>
        </Page>

        {/* 3 · DESIGN SYSTEM */}
        <Page id="design-system" n="3" title="Design System">
          <h3 className="text-2xl">Cores</h3>
          <p className="mt-2 max-w-2xl text-cocoa-mid">
            Hierarquia: creme/marfim dominam (≈70%), cacau e tinta no texto (≈20%), terracota profunda nos CTAs e amarelo
            manteiga nos destaques (≈10%). Lavanda é exclusiva do estado “sob encomenda”.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <li key={c.token} className="overflow-hidden rounded-2xl bg-ivory ring-1 ring-sand-line">
                <div className="flex h-20 items-end p-3 text-xs font-bold" style={{ background: c.hex, color: c.text === 'white' ? '#fff' : '#3F3029' }}>
                  Aa {c.text === 'white' ? 'branco' : 'tinta'}
                </div>
                <div className="p-3 text-sm">
                  <p className="font-semibold">{c.name}</p>
                  <p className="font-mono text-xs text-cocoa-mid">
                    --color-{c.token} · {c.hex}
                  </p>
                  <p className="mt-1 text-cocoa-mid">{c.role}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 text-2xl">Tipografia</h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-ivory p-6 ring-1 ring-sand-line">
              <p className="eyebrow">Display · Fraunces</p>
              <p className="mt-3 font-display text-5xl font-semibold" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
                Ponto a ponto
              </p>
              <p className="mt-3 text-sm text-cocoa-mid">Títulos e nomes de produto. Eixo SOFT 100 (cantos macios), WONK 1 só em H1/H2.</p>
            </div>
            <div className="rounded-3xl bg-ivory p-6 ring-1 ring-sand-line">
              <p className="eyebrow">Texto · Figtree</p>
              <p className="mt-3 text-2xl font-semibold">R$ 139,00 · Adicionar</p>
              <p className="mt-2">Corpo, preços, botões, navegação e formulários.</p>
              <p className="mt-3 text-sm text-cocoa-mid">400 · 500 · 600 · 700. Corpo mínimo 16 px no mobile.</p>
            </div>
            <div className="rounded-3xl bg-ivory p-6 ring-1 ring-sand-line">
              <p className="eyebrow">Detalhe · Caveat</p>
              <p className="hand-note mt-3 text-4xl text-terracotta-deep">feito com carinho</p>
              <p className="mt-3 text-sm text-cocoa-mid">Só notas curtas e decorativas. Nunca em preços, botões, navegação ou formulários.</p>
            </div>
          </div>
          <table className="mt-6 w-full text-left text-sm">
            <caption className="sr-only">Escala tipográfica</caption>
            <thead className="text-cocoa-mid">
              <tr>
                <th className="py-2 font-semibold">Estilo</th>
                <th className="font-semibold">Mobile</th>
                <th className="font-semibold">Desktop</th>
                <th className="font-semibold">Exemplo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-sand-line">
              {[
                ['Display/H1', '42/43', '70/71', 'text-[2.6rem]'],
                ['Display/H2', '34/37', '48–60/52', 'text-[2.1rem]'],
                ['Display/H3', '24/28', '28/32', 'text-2xl'],
                ['Body/L', '18/29', '18/29', 'text-lg'],
                ['Body/M', '16/26', '16/26', 'text-base'],
                ['Label/Eyebrow', '13 · 700 · +14%', '13 · 700 · +14%', 'eyebrow'],
              ].map(([name, m, d, cls]) => (
                <tr key={name}>
                  <td className="py-3 font-semibold">{name}</td>
                  <td>{m}</td>
                  <td>{d}</td>
                  <td className={cls === 'eyebrow' ? 'eyebrow' : `${cls} font-display`}>Crochê</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="mt-14 text-2xl">Espaçamento, raios e sombras</h3>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div>
              <p className="font-semibold">Escala de espaço (base 4)</p>
              <ul className="mt-3 space-y-2">
                {[4, 8, 12, 16, 24, 32, 48, 64, 80, 112].map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span className="w-10 font-mono text-cocoa-mid">{s}</span>
                    <span className="h-3 rounded-full bg-terracotta" style={{ width: s * 2 }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Raios</p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs text-cocoa-mid">
                {[
                  ['12', 'rounded-xl', 'Inputs'],
                  ['22–26', 'rounded-[24px]', 'Cards'],
                  ['36', 'rounded-[36px]', 'Blocos'],
                  ['pill', 'rounded-full', 'Botões/chips'],
                  ['arco', 'rounded-[999px_999px_20px_20px]', 'Fotos-arco'],
                  ['etiqueta', 'rounded-[6px_20px_10px_22px]', 'Bilhetes'],
                ].map(([v, cls, use]) => (
                  <div key={v}>
                    <div className={`mx-auto h-16 w-full bg-rose-soft ring-1 ring-rose ${cls}`} />
                    <p className="mt-1 font-semibold text-ink">{v}</p>
                    <p>{use}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold">Sombras (tingidas de cacau)</p>
              <div className="mt-3 grid grid-cols-3 gap-4 text-center text-xs text-cocoa-mid">
                {[
                  ['soft', 'shadow-soft'],
                  ['lift', 'shadow-lift'],
                  ['paper', 'shadow-paper'],
                ].map(([n, cls]) => (
                  <div key={n}>
                    <div className={`h-20 rounded-2xl bg-ivory ${cls}`} />
                    <p className="mt-2 font-semibold text-ink">{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="mt-14 text-2xl">Ícones</h3>
          <p className="mt-2 text-cocoa-mid">Phosphor, peso “duotone” em destaques e “regular” na interface. 20–24 px. Sem emoji.</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {(['hand', 'truck', 'palette', 'gift', 'chat', 'leaf', 'yarn', 'needle', 'sparkle', 'package'] as const).map((n) => (
              <li key={n} className="grid size-14 place-items-center rounded-2xl bg-ivory text-terracotta-deep ring-1 ring-sand-line">
                <Icon name={n} size={26} weight="duotone" />
              </li>
            ))}
          </ul>
        </Page>

        {/* 6 · COMPONENTS */}
        <Page id="components" n="6" title="Componentes e estados">
          <h3 className="text-2xl">Button</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="text-left text-sm">
              <thead className="text-cocoa-mid">
                <tr>
                  <th className="pb-3 pr-6 font-semibold">Variante</th>
                  <th className="pb-3 pr-6 font-semibold">Default</th>
                  <th className="pb-3 pr-6 font-semibold">Hover</th>
                  <th className="pb-3 pr-6 font-semibold">Focus</th>
                  <th className="pb-3 font-semibold">Disabled</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v} className={v === 'cream' ? 'bg-terracotta-deep' : ''}>
                    <td className={`py-3 pr-6 font-mono ${v === 'cream' ? 'pl-3 text-white' : ''}`}>{v}</td>
                    <td className="py-3 pr-6">
                      <span className={buttonClass(v, 'md')}>Ver produtos</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={buttonClass(v, 'md', hoverClass[v])}>Ver produtos</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={buttonClass(v, 'md', 'outline-3 outline-offset-3 outline-terracotta-deep')}>Ver produtos</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className={buttonClass(v, 'md', 'opacity-55')}>Ver produtos</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small · 40</Button>
            <Button size="md">Medium · 48</Button>
            <Button size="lg" icon={<ShoppingBagOpen size={20} weight="duotone" aria-hidden="true" />}>
              Large · 56
            </Button>
            <Button variant="whatsapp" icon={<WhatsappLogo size={20} weight="fill" aria-hidden="true" />}>
              WhatsApp CTA
            </Button>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl">Input</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Default
                  <input className={inputBase} placeholder="Ex.: Helena" readOnly />
                </label>
                <label className="text-sm font-semibold">
                  Focus
                  <input className={`${inputBase} ring-2 ring-terracotta-deep`} defaultValue="Hele" readOnly />
                </label>
                <label className="text-sm font-semibold">
                  Preenchido
                  <input className={inputBase} defaultValue="Helena" readOnly />
                </label>
                <div className="text-sm font-semibold">
                  Erro
                  <input aria-label="Exemplo de erro" className={`${inputBase} ring-2 ring-error`} defaultValue="1199" readOnly />
                  <p className="mt-1.5 flex items-center gap-1.5 font-medium text-error">
                    <WarningCircle size={18} weight="fill" aria-hidden="true" /> Informe o WhatsApp com DDD.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Badge · Chip · Swatch</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="butter">Mais amado</Badge>
                <Badge tone="rose">Oferta</Badge>
                <Badge tone="lavender">Sob encomenda</Badge>
                <Badge tone="sage">Pronta entrega</Badge>
                <Badge tone="muted">Esgotado</Badge>
                <Badge tone="cocoa">Novo</Badge>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex h-11 items-center gap-2 rounded-full bg-cocoa px-4 font-semibold text-cream">
                  Todos <span className="rounded-full bg-cream/20 px-1.5 text-xs">15</span>
                </span>
                <span className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-semibold text-cocoa ring-1 ring-inset ring-sand-line">
                  Bolsas <span className="rounded-full bg-sand px-1.5 text-xs text-cocoa-mid">2</span>
                </span>
                <span className="inline-flex h-11 items-center gap-2 rounded-full bg-sand/70 px-4 font-semibold text-cocoa ring-1 ring-inset ring-sand-line">
                  Hover
                </span>
              </div>
              <div className="mt-5">
                <ColorSwatches legend="Cor" name="sg-cor" colors={Object.values(palette).slice(0, 6)} selected={['Terracota']} onToggle={() => {}} />
              </div>
            </div>
          </div>

          <h3 className="mt-14 text-2xl">Product Card — variantes</h3>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            <ProductCard product={card} />
            <ProductCard product={custom} />
            <ProductCard product={sold} />
          </div>
          <p className="mt-3 text-sm text-cocoa-mid">
            Pronta entrega (botão +) · Sob encomenda (Personalizar) · Esgotado (imagem dessaturada + Encomendar igual). Hover:
            troca para a 2ª foto e zoom de 3,5%.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="text-2xl">Benefit item</h3>
              <ul className="mt-4 space-y-4 rounded-3xl bg-cocoa p-5 text-cream">
                {benefits.slice(0, 3).map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream/10 text-butter">
                      <Icon name={b.icon} size={22} weight="duotone" />
                    </span>
                    <span>
                      <span className="block font-semibold">{b.title}</span>
                      <span className="text-sm text-cream/70">{b.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl">Process Step</h3>
              <div className="relative mt-4 pl-16">
                <span className="absolute left-0 top-0 grid size-11 place-items-center rounded-full bg-ivory text-terracotta-deep shadow-soft">
                  <Icon name={processSteps[2].icon} size={22} weight="duotone" />
                </span>
                <p className="text-sm font-bold text-cocoa-mid">Etapa 3</p>
                <p className="font-display text-2xl font-semibold text-cocoa">{processSteps[2].title}</p>
                <p className="mt-1 text-cocoa-mid">{processSteps[2].text}</p>
                <p className="hand-note mt-1 text-xl text-sage-deep">— {processSteps[2].note}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Testimonial (bilhete)</h3>
              <figure className="relative mt-4 rotate-[1deg] rounded-[6px_20px_10px_22px] bg-rose-soft p-6 shadow-paper">
                <blockquote>“{testimonials[2].quote}”</blockquote>
                <figcaption className="hand-note mt-3 text-2xl text-terracotta-ink">{testimonials[2].author}</figcaption>
              </figure>
            </div>
          </div>
        </Page>
      </div>
    </ShopProvider>
  )
}
