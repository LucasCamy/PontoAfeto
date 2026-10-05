# DESIGN.md — Ponto Afeto · “Cozy Handmade Studio”

> Nome temporário: **Ponto Afeto — ateliê de crochê**. Troque em `src/config/site.ts`.
> Referência visual navegável: `/styleguide.html` (Capa, Marca, Design System, Componentes).
> Tokens: `design/tokens.json` (espelha `src/index.css`).

---

## 1. Direção visual

**Cozy Handmade Studio** = loja-boutique de ateliê com editorial leve. Não é loja infantil nem template de e-commerce.

| Ingrediente | Como aparece na interface |
|---|---|
| Artesanato contemporâneo | Serifada macia (Fraunces SOFT) + sans limpa (Figtree) |
| Boutique | Muito respiro, fotos grandes, preço discreto e claro |
| Editorial leve | Composições assimétricas, citação da artesã, títulos com itálico pontual |
| Fios e pontos | Linha tracejada “costura” (`.stitch-line`), textura de pontinhos (`.stitch-texture`), fio que se desenha na hero |
| Etiquetas e papel | Etiqueta de preço pendurada, bilhetes com “fita adesiva”, grão de papel fixo (3% de opacidade) |
| Imperfeição controlada | Rotações de 0,6° a 4° em notas e selos — nunca em fotos de produto ou textos longos |

**Regra de ouro:** o produto é o protagonista. Decoração só onde há respiro; nunca sobre a foto do produto.

## 2. Personalidade

Carinhosa, próxima, caprichosa, bem-humorada sem ser boba. Fala como a artesã falaria no WhatsApp: frases curtas, verbos concretos (“separar”, “bordar”, “embalar”), sem jargão de marketing (“eleve”, “incrível”, “solução”).

- **É:** acolhedora, honesta com prazos, orgulhosa do processo.
- **Não é:** infantil, fofa demais, genérica, urgente (“últimas unidades!!!”).

## 3. Paleta

| Papel | Token | Hex | Uso |
|---|---|---|---|
| Fundo | `cream` | #FFF8EF | Fundo da página |
| Superfície | `ivory` | #FFFDF9 | Cards, diálogos, seções alternadas |
| Principal (marca) | `terracotta` | #D98268 | Símbolo, fio decorativo, aspas |
| **CTA** | `terracotta-deep` | #B0553D | Botão principal (4,98:1 com branco) |
| CTA hover / eyebrow | `terracotta-ink` | #8F4230 | |
| Secundária | `sage` / `sage-soft` | #A8B89F / #E3EADC | Fundo da seção “Peça da estação” |
| WhatsApp / sucesso | `sage-deep` | #4A6B45 | Todos os CTAs de WhatsApp (6:1) |
| Destaque | `butter` | #F4D06F | Badges, selo “feito à mão”, números das etapas |
| Acento suave | `rose` / `rose-soft` | #E9A6A6 / #F8E1DC | Notas, oferta, erros (fundo) |
| Exclusiva “sob encomenda” | `lavender` | #B9B0D9 | Só nesse estado — evita o “roxo de IA” |
| Títulos / blocos escuros | `cocoa` | #5C4033 | H1–H3, seção Personalizados |
| Texto | `ink` | #3F3029 | Corpo, rodapé |
| Texto secundário | `cocoa-mid` | #765443 | **Ajustado** do #8A6654 pedido (4,09:1 em rosa — reprovava AA) |
| Borda | `sand-line` | #E8D7C3 | Divisórias tracejadas |
| Alerta | `error` | #A63A2B | Erros — sempre com ícone e texto |

**Proporção:** ~70% creme/marfim · ~20% cacau/tinta · ~10% terracota + manteiga. Cada seção usa **no máximo uma** cor de apoio de fundo (rosa, sálvia, areia ou cacau).

Contrastes verificados (WCAG 2.1): todos os pares de texto ≥ 4,5:1. Ver tabela no styleguide.

## 4. Tipografia

| Família | Papel | Pesos | Regras |
|---|---|---|---|
| **Fraunces** (Google Fonts, variável) | Display: H1–H3, nomes de produto, citações | 400–700 | `SOFT 100` sempre; `WONK 1` só em H1/H2 de destaque; itálico para 1–3 palavras de ênfase |
| **Figtree** | Texto, preços, botões, navegação, formulários | 400–700 | Corpo mínimo 16 px; preço em 700 |
| **Caveat** | Notas manuscritas decorativas | 500–600 | Máx. ~6 palavras. **Nunca** em preço, botão, navegação, formulário ou texto longo. Marcar `aria-hidden` quando repete informação |

Escala (mobile → desktop): H1 42→70 · H2 34→48/60 · H3 24→28 · Body L 18 · Body M 16 · Eyebrow 13 (700, +14%, caixa alta).

## 5. Espaçamento e grid

- Base 4 px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 112.
- Container 1320 px; gutters 16 (mobile) · 24 (tablet) · 40 (desktop).
- Seções: 80 px vertical no mobile, 112 px no desktop.
- Grid da vitrine: 2 colunas (<768) · 3 (≥768) · 4 (≥1280).
- Raios: input 12 · card 22–26 · bloco 36 · pill · **arco** (999/999/24/24) para fotos-assinatura · **etiqueta** (6/20/10/22) para bilhetes.
- Sombras tingidas de cacau: `soft`, `lift`, `paper`. Nunca preto puro.

## 6. Componentes

| Componente | Arquivo | Variantes / estados |
|---|---|---|
| Button | `ui/Button.tsx`, `ui/buttonStyles.ts` | primary · secondary · whatsapp · ghost · cream × sm(40) · md(48) · lg(56) × default/hover/focus/active/disabled |
| Badge | `ui/Badge.tsx` | butter · rose · sage · lavender · cocoa · muted |
| Category Chip | `sections/ProductGrid.tsx › CategoryFilter` | default · hover · ativo (pílula cacau animada com `layoutId`) |
| Color Swatch | `ui/ColorSwatches.tsx` | single · multiple · selecionado (anel + check) · foco · erro |
| Product Card | `sections/ProductCard.tsx` | pronta entrega (+ sacola) · sob encomenda (Personalizar) · esgotado (dessaturado + Encomendar igual) · hover (2ª foto + zoom 3,5%) · oferta |
| Product Detail | `sections/ProductDetail.tsx` | diálogo central (desktop) / bottom sheet com barra de ação fixa (mobile) |
| Navbar / Mobile Menu | `sections/Navbar.tsx` | transparente · rolada (creme + blur) · menu tela cheia |
| Bag (sacola) | `sections/BagDrawer.tsx` | vazia · com itens · frete grátis atingido · toast “na sacola” |
| Custom Order Form | `sections/CustomOrderForm.tsx` | vazio · foco · erro (resumo + inline) · enviando · confirmado |
| Process Step | `sections/HandmadeProcess.tsx` | com foto (paisagem/quadrada) · sem foto |
| Testimonial | `sections/Testimonials.tsx` | destaque com foto · bilhete (3 cores) |
| WhatsApp CTA | `sections/WhatsAppButton.tsx` | oculto na hero · visível · hover/foco expande rótulo |
| Newsletter Form | `sections/NewsletterForm.tsx` | default · erro · enviando · sucesso (simulado) |
| Footer | `sections/Footer.tsx` | — |

## 7. Fotografia

- **Luz natural**, lateral, sombras macias. Nada de flash direto.
- Fundos simples: linho, madeira clara, papel, parede clara. Um objeto de apoio no máximo (xícara, livro, planta).
- Produto ocupando 60–80% do quadro, **proporção 4:5** para vitrine; 1:1 e 3:2 para processo/galeria.
- Mesma temperatura de cor em todas (levemente quente). Evitar fotos P&B, neon, texto em outro idioma ou marcas d'água.
- Pessoas: só mãos trabalhando — nunca poses de banco de imagem.
- **Fotos atuais são demonstrativas** (Unsplash, licença gratuita). Trocar em `src/data/images.ts`.

## 8. Ilustração e ícones

- Ilustração = traço de fio: linhas contínuas de 2–2,5 px, pontas arredondadas, terracota a 55% de opacidade.
- Ícones: **Phosphor**; `duotone` em destaques (benefícios, processo), `regular/bold` na interface, 18–26 px. Nunca emoji.

## 9. Motion

Lente principal: polimento de produção (Jakub Krehel) + toques lúdicos pontuais (Jhey Tompkins) — o que o skill *design-motion-principles* indica para e-commerce/landing.

| Interação | Duração | Curva | Observação |
|---|---|---|---|
| Hover de botão/card | 200 ms / 700 ms (zoom foto) | out-soft | só `transform`, `opacity`, cores |
| Troca de foto no hover | 500 ms | out-soft | apenas em dispositivos com hover real |
| Entrada de seção | 650 ms, uma vez | out-soft | sobe 18 px; stagger 70 ms em listas |
| Filtro de categorias | spring 420/34 | — | `layout` + `popLayout`, sem salto |
| Diálogo / gaveta | 420 ms entrada · 200–280 ms saída | out-soft / in-soft | saída mais rápida que entrada |
| Accordion FAQ | 350 ms | out-soft | |
| Fio da hero | 2,4 s, uma vez | in-out | `pathLength` |
| Selo “feito à mão” | ligado à rolagem | — | gira até 110° conforme rola |
| Linha do processo | ligada à rolagem | spring | `scaleY` |

**Proibido:** loops chamando atenção (pulso, brilho), bounce exagerado, parallax pesado, tudo animando junto.
**Acessibilidade:** `MotionConfig reducedMotion="user"` + regra CSS global que zera transições com `prefers-reduced-motion`. Nada essencial depende de animação.

## 10. Responsividade

Testado em 360 · 375 · 390 · 414 · 768 · 1024 · 1280 · 1440 px sem overflow horizontal.

- Hero em coluna no mobile, com a colagem visível já na primeira rolagem.
- Benefícios, categorias e filtros rolam na horizontal com *scroll-snap* (com `scroll-padding` para não colar na borda).
- Vitrine em 2 colunas no mobile; a ação “+” tem 44 px.
- Detalhe do produto vira *bottom sheet* com barra de preço + ação fixa.
- Botão de WhatsApp flutuante respeita `safe-area-inset-bottom`.
- Fio decorativo da hero só aparece ≥1024 px; bullets da hero só ≥640 px.

## 11. Acessibilidade

- HTML semântico: `header/nav/main/section/article/footer`, um único H1, H2 por seção, H3 nos itens.
- Link “Pular para o conteúdo”; foco visível (anel terracota 3 px) em tudo.
- Diálogos com `role="dialog"`, `aria-modal`, foco preso, Esc fecha, foco devolvido.
- Accordion com `aria-expanded`/`aria-controls`; chips com `aria-pressed`; contagem da vitrine em `aria-live`.
- Formulário: labels visíveis, erro abaixo do campo **e** resumo focável no topo, `aria-invalid`, `aria-describedby`; nunca só cor.
- Botões de ícone com `aria-label`; ícones decorativos com `aria-hidden`.
- Alvos de toque ≥ 44 px. Alt texts descritivos em todas as fotos (testado em `src/test/data.test.ts`).

## 12. Do's & Don'ts

| ✅ Faça | ❌ Não faça |
|---|---|
| Uma cor de apoio por seção | Usar as 11 cores da paleta na mesma tela |
| Caveat para 1 nota curta por bloco | Caveat em preço, botão ou parágrafo |
| Fotos com luz natural e fundo simples | Fotos com texto em outro idioma, neon ou P&B misturado |
| Rotacionar levemente notas e selos | Rotacionar fotos de produto ou blocos de texto |
| Variar composições (arco, bilhete, mosaico, timeline) | Repetir 3 cards iguais lado a lado |
| Prazos honestos e visíveis | Urgência falsa, contadores, “últimas unidades” inventadas |
| Marcar conteúdo fictício como demonstrativo | Publicar depoimentos ou números fictícios como reais |
