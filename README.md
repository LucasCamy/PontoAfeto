# Ponto Afeto — landing page de ateliê de crochê

Experiência de marca e venda para uma loja de crochê artesanal: vitrine com filtro, detalhe de produto, sacola que
envia o pedido pelo WhatsApp, ficha de encomenda personalizada, processo artesanal, sobre, depoimentos, galeria e FAQ.

> **Conteúdo demonstrativo.** Nome “Ponto Afeto”, produtos, preços, fotos (Unsplash), depoimentos, números e contatos
> são fictícios e estão marcados no código. Veja o checklist antes de publicar.

## Rodar o projeto

Requisitos: Node 20+ (testado com Node 24).

```bash
npm install
```

```bash
npm run dev
```

Abra `http://localhost:5173` (landing) e `http://localhost:5173/styleguide.html` (marca + design system + componentes).

### Com Docker

Requisitos: Docker com Compose. Build em duas etapas (Node 24 compila, Nginx serve os arquivos estáticos com gzip, cache e healthcheck).

```bash
docker compose up -d --build
```

Abra `http://localhost:8080` (e `/styleguide.html`). Para usar outra porta: `PORT=3000 docker compose up -d --build`. Para parar:

```bash
docker compose down
```

Sem Compose: `docker build -t ponto-afeto .` e `docker run -p 8080:80 ponto-afeto`.

### Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | typecheck + build de produção em `dist/` |
| `npm run preview` | serve o `dist/` |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint |
| `npm test` | Vitest (20 testes) |
| `node scripts/screenshots.mjs [url] [larguras]` | capturas de página inteira + checagem de overflow/imagens/console (precisa do dev server; usa o Edge — para Chrome, `BROWSER_CHANNEL=chrome`) |
| `node scripts/interactions.mjs [url]` | roteiro automático das interações principais |

## Editar textos e produtos

| Quero mudar… | Arquivo |
|---|---|
| Nome da loja, WhatsApp, Instagram, e-mail, horário, textos da hero, CTA final | `src/config/site.ts` |
| Produtos (nome, preço, cores, prazo, disponibilidade, destaque) | `src/data/products.ts` |
| Categorias | `src/data/categories.ts` |
| Benefícios, etapas do processo, “Sobre”, depoimentos, galeria, FAQ | `src/data/content.ts` |
| Cores, fontes, sombras | `src/index.css` (`@theme`) **e** `design/tokens.json` |

Disponibilidade aceita `'pronta-entrega'`, `'sob-encomenda'` ou `'esgotado'` — o card muda sozinho (botão +, “Personalizar” ou “Encomendar igual”).

## Substituir imagens

1. Coloque a foto em `public/images/` (ex.: `public/images/gatinho.jpg`). Use 4:5, luz natural, ~1600 px no lado maior.
2. Em `src/data/images.ts`, troque o `src` da chave correspondente por `'/images/gatinho.jpg'` e reescreva o `alt` descrevendo a foto (“Gatinho de crochê cinza sentado sobre linho cru”).
3. Pronto — todos os lugares que usam aquela imagem (card, detalhe, categoria) são atualizados.

Fotos do Unsplash recebem recorte e otimização automáticos pela URL; fotos locais são usadas como estão (comprima antes — ex.: squoosh.app).

## Figma

Arquivo: **[Ponto Afeto — Brand & Landing](https://www.figma.com/design/XcmG1Zq8AZRYC3dMiSmHuF/)**, com as páginas Cover, Brand, Design System,
Desktop Landing Page, Mobile Landing Page, Components e Prototype; variáveis, estilos, componentes com variantes e
protótipo navegável. Estrutura, nomes, como compartilhar com a cliente e como manter o arquivo sincronizado com o código
estão em [FIGMA_GUIDE.md](FIGMA_GUIDE.md); os tokens equivalentes estão em [design/tokens.json](design/tokens.json).

## Documentação

- [DESIGN.md](DESIGN.md) — direção visual, paleta, tipografia, componentes, fotografia, motion, acessibilidade, do's & don'ts
- [FIGMA_GUIDE.md](FIGMA_GUIDE.md) — especificação do arquivo Figma e sincronização
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — arquitetura, dependências, integrações, testes, riscos e pendências

## Checklist antes de publicar

- [ ] `site.isDemo = false` **somente** depois de trocar os itens abaixo
- [ ] Nome, WhatsApp (formato `55DDDNUMERO`), Instagram e e-mail reais em `src/config/site.ts`
- [ ] Fotos reais em `src/data/images.ts`
- [ ] Depoimentos e números reais em `src/data/content.ts` (ou remova a seção)
- [ ] Preços, prazos e frete grátis (`shipping.freeShippingFrom`) revisados
- [ ] Integração real da ficha de encomenda (`src/lib/customOrder.ts › submitCustomOrder`)
- [ ] Política de privacidade revisada
- [ ] `og:image` e domínio configurados

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Phosphor Icons · Vitest · Testing Library.
Skills de design do Claude Code (taste-skill, ui-ux-pro-max, design-motion-principles) registradas em `skills-lock.json`; para reinstalá-las em `.claude/skills`: `npx skills experimental_install`.
