# IMPLEMENTATION_PLAN.md

## 1. Ordem de execução

| Etapa | O quê | Status |
|---|---|---|
| 1 | Inspeção: pasta vazia, sem stack prévia; Node 24, npm 11 | ✅ |
| 2 | Figma: conector `design:figma` **sem autenticação** → especificação em `FIGMA_GUIDE.md` + `design/tokens.json` + `/styleguide.html` | ✅ (sem escrita no Figma) |
| 3 | Direção de arte: nome, paleta (ajuste AA), tipografia, fotografia, motion | ✅ `DESIGN.md` |
| 4 | Design system em código: tokens no `@theme`, componentes base, styleguide | ✅ |
| 5 | Landing completa: 14 seções + detalhe de produto + sacola + formulário + newsletter | ✅ |
| 6 | Validação: build, typecheck, lint, testes unitários, screenshots em 8 larguras, roteiro de interações | ✅ |
| 7 | Revisão comercial e anti-slop | ✅ (ver relatório final) |
| 8 | Montagem do arquivo Figma | ⏳ depende de autenticar o conector ou de execução manual |

## 2. Arquitetura

```
index.html                 → landing (src/main.tsx → App)
styleguide.html            → espelho das páginas Cover/Brand/Design System/Components (src/styleguide)
design/tokens.json         → tokens DTCG (Figma ⇄ código)
src/
  config/site.ts           → nome, contatos, textos principais, mensagens de WhatsApp
  data/
    images.ts              → TODAS as imagens (src + alt + origem)
    categories.ts          → categorias
    products.ts            → catálogo + cartela de fios
    content.ts             → benefícios, processo, sobre, depoimentos, galeria, FAQ
  lib/
    shop.tsx               → estado: sacola (localStorage), categoria ativa, produto aberto
    whatsapp.ts            → links wa.me e mensagens de pedido
    customOrder.ts         → validação, máscara, envio SIMULADO, pré-preenchimento
    format.ts              → moeda BRL, plural de dias
  components/
    ui/                    → Button, Badge, ColorSwatches, Sheet (diálogo), SmartImage, Logo, Reveal, Icon...
    sections/              → uma seção por arquivo (Navbar, Hero, ProductGrid, ...)
  test/                    → Vitest + Testing Library
scripts/
  screenshots.mjs          → capturas em várias larguras + checagem de overflow/imagens/console
  interactions.mjs         → roteiro E2E das interações principais
```

Decisões:
- **Vite + React 19 + TypeScript** (projeto novo; sem SSR necessário para uma landing). Migrar para Next.js é direto: as seções não dependem de roteamento.
- **Tailwind CSS v4** com tokens no `@theme` (CSS variables) — as mesmas chaves do `tokens.json`.
- **Motion** (`motion/react`) para entrada, layout do filtro, diálogos e efeitos ligados à rolagem; `MotionConfig reducedMotion="user"`.
- **Phosphor Icons** (duotone combina com o tom artesanal).
- Sem biblioteca de componentes: os componentes são poucos e autorais.
- Componentes extraídos só onde há reuso (Button, Badge, Sheet, SmartImage, ColorSwatches, Price, ProductCard).

## 3. Dependências

| Pacote | Uso |
|---|---|
| react, react-dom 19 | UI |
| motion | animações |
| @phosphor-icons/react | ícones |
| vite, @vitejs/plugin-react, typescript | build |
| tailwindcss, @tailwindcss/vite | estilos |
| eslint + typescript-eslint + react-hooks + react-refresh | lint |
| vitest, jsdom, @testing-library/* | testes |
| playwright-core | scripts de screenshot/E2E usando o Edge/Chrome já instalado (sem baixar navegador) |

Fontes via Google Fonts: Fraunces, Figtree, Caveat. Fotos demonstrativas via `images.unsplash.com`.

## 4. Dados

- Um produto = um objeto em `products.ts` (id, nome, slug, categoria + `alsoIn`, descrição, detalhes, preço, preço anterior, “a partir de”, imagem, galeria, cores, medidas, materiais, prazo, disponibilidade, destaque, badge, tags).
- Os formatos foram pensados para mapear 1:1 para APIs de e-commerce (Shopify `Product`/`Variant`, Nuvemshop, Medusa).
- Conteúdo fictício é marcado com `// FICTÍCIO` / `// DEMONSTRATIVO` e `demo: true`; `site.isDemo` controla os avisos visíveis.

## 5. Integrações futuras

| Integração | Onde plugar |
|---|---|
| Envio real da ficha de encomenda | `submitCustomOrder` em `src/lib/customOrder.ts` (Formspree, Resend, API própria). Upload da referência → S3/Cloudinary/Uploadcare |
| Newsletter | `subscribe` em `src/components/sections/NewsletterForm.tsx` (Brevo, Mailchimp, RD Station) |
| Checkout | `addToBag` / `BagDrawer` → carrinho Shopify Storefront API, Nuvemshop, Mercado Pago Checkout Pro |
| Catálogo vindo de CMS | trocar o array de `products.ts` por fetch (Sanity, Contentful, planilha Google) mantendo a interface `Product` |
| Frete | cálculo por CEP (Melhor Envio / Correios) dentro da sacola |
| Analytics | eventos: `add_to_bag`, `open_product`, `whatsapp_click`, `custom_order_submit` (GA4/Plausible) |
| Instagram | substituir `gallery` por feed oficial (Instagram Basic Display/Graph) mantendo o fallback local |

## 6. Testes

| Tipo | Comando | Cobre |
|---|---|---|
| Unitário/componente | `npm test` | integridade do catálogo e conteúdo, alt texts, links de WhatsApp, validação/máscara/resumo da encomenda, accordion, filtro da vitrine, resumo de erros do formulário |
| Tipos | `npm run typecheck` | — |
| Lint | `npm run lint` | — |
| Responsivo | `node scripts/screenshots.mjs` (com o dev server rodando) | 8 larguras, overflow horizontal, imagens quebradas, erros de console |
| Interações | `node scripts/interactions.mjs` | filtro, cards de categoria, diálogo (Esc + retorno de foco), sacola → WhatsApp, FAQ, formulário (erros, máscara, sucesso), âncoras internas, menu mobile, botão flutuante |

## 7. Riscos

| Risco | Mitigação |
|---|---|
| Fotos do Unsplash saírem do ar | `SmartImage` mostra fallback ilustrado sem quebrar o layout; trocar por fotos próprias em `public/images` |
| Dados fictícios publicados por engano | `isDemo` + comentários `FICTÍCIO`; checklist no README |
| Número de WhatsApp fictício em produção | trocar `site.contact.whatsapp` antes do deploy (está no checklist) |
| Bundle JS ~145 KB gzip | aceitável para landing; otimizar com `LazyMotion` + `domAnimation` e code-splitting do detalhe/sacola |
| Fontes do Google bloqueadas por LGPD/consentimento | auto-hospedar com `@fontsource-variable/fraunces` e `@fontsource/figtree` |
| Divergência Figma ⇄ código | regra de sincronização em FIGMA_GUIDE §11; styleguide gerado a partir dos componentes reais |

## 8. Pendências

- [ ] **Criar o arquivo no Figma** (autenticar conector ou montar com FIGMA_GUIDE + html.to.design).
- [ ] Definir nome real, logo final e contatos reais (`src/config/site.ts`).
- [ ] Fotografar os produtos reais (4:5, luz natural) e substituir em `src/data/images.ts`.
- [ ] Trocar depoimentos e números por dados reais (ou remover a seção até ter avaliações).
- [ ] Integrar envio real da ficha, newsletter e (se desejado) checkout.
- [ ] Política de privacidade completa (hoje há um resumo no rodapé).
- [ ] Imagem Open Graph (`og:image`) 1200×630 com produto real.
- [ ] Domínio, deploy (Vercel/Netlify/Cloudflare Pages) e analytics.
