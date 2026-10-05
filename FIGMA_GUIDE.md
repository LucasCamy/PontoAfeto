# FIGMA_GUIDE.md — especificação para montar o arquivo no Figma

> **Status da integração:** o conector Figma (plugin `design`) estava **sem autenticação** nesta sessão.
> Por isso **nenhum elemento foi criado diretamente no Figma**. Este guia + `design/tokens.json` +
> a página `/styleguide.html` formam a especificação completa para montar o arquivo — manualmente,
> por importação, ou por um agente com o Figma MCP autenticado (veja §11).

---

## 1. Arquivo e páginas

Nome do arquivo: **`Ponto Afeto — Brand & Landing`**

| # | Página | Conteúdo |
|---|---|---|
| 1 | `🧶 Cover` | Frame `Cover` 1440×960: logo, título, descrição, “Cozy Handmade Studio”, data, status, aviso de conteúdo substituível (cópia exata da seção Cover do `/styleguide.html`) |
| 2 | `Brand` | Logotipo e variações, símbolo, área de proteção, aplicações, usos corretos/incorretos |
| 3 | `Design System` | Variáveis, estilos de cor/texto/efeito, grids, ícones |
| 4 | `Desktop Landing Page` | Frame `Landing / Desktop 1440` |
| 5 | `Mobile Landing Page` | Frame `Landing / Mobile 390` (+ `360` para checagem) |
| 6 | `Components` | Todos os componentes com variantes e documentação |
| 7 | `Prototype` | Fluxos conectados (ver §9) |

Emojis no nome das páginas são opcionais.

## 2. Variáveis (Local variables)

Importe `design/tokens.json` com o plugin **Tokens Studio for Figma** (gratuito) ou um plugin de importação DTCG
(“Variables Import”, “Design Tokens”). Se preferir criar à mão, use estas coleções:

### Coleção `Color` — modo `Light`
| Grupo | Variáveis |
|---|---|
| `base/` | cream, ivory, white, sand, sand-line, terracotta, terracotta-deep, terracotta-ink, rose, rose-soft, butter, butter-soft, sage, sage-soft, sage-deep, sage-ink, lavender, lavender-soft, lavender-ink, cocoa, cocoa-mid, cocoa-soft, ink, error |
| `role/` (aliases) | primary → base/terracotta · secondary → base/sage · accent → base/butter · background → base/cream · surface → base/ivory · text → base/ink · text-heading → base/cocoa · text-muted → base/cocoa-mid · border → base/sand-line · cta → base/terracotta-deep · cta-hover → base/terracotta-ink · whatsapp/success → base/sage-deep · alert → base/error · focus-ring → base/terracotta-deep |

Componentes devem usar **sempre `role/`**, nunca `base/` direto — assim a cliente troca a cor da marca num lugar só.

### Coleção `Space` (number)
`1`=4 · `2`=8 · `3`=12 · `4`=16 · `6`=24 · `8`=32 · `12`=48 · `16`=64 · `20`=80 · `28`=112 · `gutter/mobile`=16 · `gutter/tablet`=24 · `gutter/desktop`=40 · `section-y/mobile`=80 · `section-y/desktop`=112

### Coleção `Radius` (number)
`input`=12 · `card`=24 · `block`=36 · `pill`=999 · `arch-top`=999 · `arch-bottom`=24

## 3. Estilos

**Texto** (Text styles) — nomes iguais aos de `tokens.json › typography`:
`Display/H1 Desktop` (Fraunces 600, 70/72, -1.5%, eixo SOFT 100 WONK 1) · `Display/H1 Mobile` (42) · `Display/H2 Desktop` (48) · `Display/H2 Mobile` (34) · `Display/H3` (28) · `Product/Name` (Fraunces 600 20) · `Body/L` (Figtree 400 18/160%) · `Body/M` (16) · `Body/S` (14) · `Price` (Figtree 700 17) · `Button` (Figtree 600 15) · `Label/Eyebrow` (Figtree 700 13, +14%, CAIXA ALTA) · `Badge` (Figtree 700 11.5, +8%, CAIXA ALTA) · `Hand/Note` (Caveat 600 24).

> No Figma, ajuste os eixos variáveis de Fraunces em *Type settings › Variable font axes*: **Softness 100**, **Wonky 1** só nos H1/H2.

**Efeitos** (Effect styles): `Shadow/Soft`, `Shadow/Lift`, `Shadow/Paper` (valores em `tokens.json › shadow`, cor #5C4033 com alfa).

**Grids** (Layout grids): `Grid/Desktop 1440` (12 col, margem 60, gutter 24, container 1320) · `Grid/Tablet 768` (8 col, margem 24, gutter 20) · `Grid/Mobile 390` (4 col, margem 16, gutter 12).

## 4. Componentes (página `Components`)

Use **Auto layout** em todos. Nome = `Categoria/Nome`. Propriedades de variante em **minúsculas**.

| Componente | Propriedades de variante | Propriedades de instância | Auto layout |
|---|---|---|---|
| `Button` | `variant`: primary, secondary, whatsapp, ghost, cream · `size`: sm, md, lg · `state`: default, hover, focus, pressed, disabled | `label` (texto), `iconLeft` (boolean + instance swap), `iconRight` | Horizontal, gap 8, padding H 16/24/28, altura fixa 40/48/56, raio pill |
| `Badge` | `tone`: butter, rose, sage, lavender, cocoa, muted | `label` | Horizontal, padding 4×10, raio pill |
| `Category Chip` | `state`: default, hover, active | `label`, `count` | Horizontal, gap 8, altura 44, padding H 16 |
| `Color Swatch` | `state`: default, selected, focus · `multi`: true/false | `color` (fill), `name` | Fixo 44×44, círculo interno 32 |
| `Product Card` | `availability`: pronta-entrega, sob-encomenda, esgotado · `state`: default, hover · `breakpoint`: desktop, mobile | `image`, `badge` (boolean+texto), `name`, `category`, `price`, `compareAtPrice` (boolean), `description` (boolean — oculto no mobile) | Vertical, gap 14; imagem 4:5 raio 26 (22 no mobile) |
| `Product Gallery` | `count`: 2, 3 | `images` | Imagem principal + thumbs 56×56 sobrepostas |
| `Product Detail` | `breakpoint`: desktop, mobile · `availability` | — | Desktop: 2 colunas (galeria \| info) em diálogo 1024×~780 raio 28. Mobile: sheet 100% largura, barra de ação fixa |
| `Navbar` | `state`: top, scrolled · `breakpoint`: desktop, mobile | `bagCount` | Altura 72, container 1320 |
| `Mobile Menu` | `state`: closed, open | — | Tela cheia creme, links Fraunces 32 |
| `Testimonial` | `type`: featured, note · `tone`: rose, butter, lavender | `quote`, `author`, `city`, `product` | Note: padding 24, rotação 1° |
| `Process Step` | `media`: none, landscape, square | `number`, `title`, `text`, `note`, `icon` | Vertical, gap 8, indent 64 para o marcador |
| `WhatsApp CTA` | `type`: floating, inline · `state`: default, hover | `label` | Floating: altura 56, pill, sálvia profunda |
| `Newsletter Form` | `state`: default, error, sending, success | — | Input pill + botão manteiga em linha (rodapé) |
| `Custom Order Form` | `state`: empty, error, filled, sending, success | — | Card marfim raio 28, padding 32 |
| `Benefit Item` | — | `icon`, `title`, `text` | Horizontal, gap 12 |
| `Footer` | `breakpoint`: desktop, mobile | — | 4 colunas → 1 coluna |

Documente cada componente com a descrição do Figma (campo *Description*): uso, do/don't, link para o arquivo em `src/components`.

## 5. Frames da landing

### Desktop — `Landing / Desktop 1440` (largura 1440, altura livre)
Cada seção é um frame filho com auto layout vertical, nomeado:

| Ordem | Frame | Fundo | Notas de layout |
|---|---|---|---|
| 01 | `01 Navbar` | transparente | logo · 5 links centrais · sacola · CTA |
| 02 | `02 Hero` | cream | 2 colunas 1.02fr/1fr; colagem: arco 0.68 + 2 fotos (0.85 e 1:1); selo manteiga 128 px; etiqueta de preço; fio SVG |
| 03 | `03 Benefits` | cocoa | 6 colunas com divisória tracejada |
| 04 | `04 Categories` | cream | 6 cards; colunas pares deslocadas +40 px |
| 05 | `05 Products` | ivory | título + chips + grid 4×2 + “Ver mais” |
| 06 | `06 Featured Product` | sage-soft + textura | foto-arco 0.8 + detalhe rotacionado 3°; selo terracota -12° |
| 07 | `07 Handmade Process` | cream | coluna fixa (sticky) + timeline de 6 etapas |
| 08 | `08 Custom Order` | cocoa | texto + 3 passos à esquerda; ficha marfim à direita |
| 09 | `09 About` | cream | foto 0.82 + arco sobreposto; números; valores; bilhete da artesã |
| 10 | `10 Testimonials` | ivory | 7/12 destaque + 5/12 três bilhetes |
| 11 | `11 Gallery` | cream | mosaico 4 colunas × 3 linhas (tall, wide, square) |
| 12 | `12 FAQ` | sand 60% | coluna fixa + 8 accordions |
| 13 | `13 Final CTA` | terracotta-deep | bloco raio 48 com costura tracejada interna |
| 14 | `14 Footer` | ink | 4 colunas |

### Mobile — `Landing / Mobile 390`
Mesma ordem e nomes. Diferenças: hero em coluna (texto → colagem), benefícios/categorias/chips em linha rolável, vitrine 2 colunas, galeria 2 colunas, timeline compacta, rodapé 1 coluna, botão WhatsApp flutuante fixo (*Position: Fixed* no protótipo).

## 6. Breakpoints

| Nome | Largura | Uso no Figma |
|---|---|---|
| Mobile S | 360 | checagem de quebra (duplicar 390 e reduzir) |
| Mobile | 390 | **frame principal mobile** |
| Tablet | 768 | opcional — 3 colunas na vitrine |
| Desktop | 1440 | **frame principal desktop** (container 1320) |

## 7. Auto layout — convenções

- Seções: vertical, padding 112/40 (desktop) e 80/16 (mobile), *fill container* na largura.
- Containers internos: largura máx. 1320 (use *max width* do auto layout).
- Espaçamentos sempre ligados às variáveis `Space/*`.
- Fotos: retângulo com *fill image* em modo **Fill**, proporção travada (4:5, 1:1, 3:2, 0.8).

## 8. Como substituir imagens (para a cliente)

1. Selecione a foto (dentro da instância de `Product Card`, por exemplo).
2. No painel direito, em **Fill**, clique na miniatura da imagem → **Choose image**.
3. Escolha a foto nova. Ela mantém o recorte e os cantos arredondados.
4. Prefira fotos verticais 4:5 com luz natural (DESIGN.md §7).

No código, o equivalente é trocar o `src` em `src/data/images.ts`.

## 9. Protótipo (página `Prototype`)

Copie os frames desktop e mobile para esta página e conecte:

| Fluxo | Gatilho | Ação | Animação |
|---|---|---|---|
| Navegação da página | Clique em link da Navbar | *Scroll to* → frame da seção | Smart animate 400 ms ease-out |
| Filtro por categoria | Clique em `Category Chip` | *Change to* `state=active`; trocar variante do grid (`Products / Bolsas`) | Smart animate 300 ms |
| Hover nos produtos | *While hovering* em `Product Card` | *Change to* `state=hover` | Dissolve 250 ms |
| Abrir detalhe | Clique no card | *Open overlay* `Product Detail` (centro, fundo 45% ink) | Move in de baixo 420 ms |
| Clique para encomenda | Botão “Personalizar” | *Close overlay* + *Scroll to* `08 Custom Order` | Instant |
| Menu mobile | Clique no ícone de menu | *Open overlay* `Mobile Menu / open` | Dissolve 300 ms |
| Formulário | Botão “Enviar ficha” | *Change to* `state=error` (fluxo 1) ou `state=success` (fluxo 2) | Dissolve 250 ms |
| CTA WhatsApp | Qualquer botão WhatsApp | *Open link* `https://wa.me/5511900000000` | — |

Defina os pontos de início: **“Desktop — compra”**, **“Mobile — compra”**, **“Mobile — encomenda”**.

## 10. Como compartilhar com a cliente

1. **Share** → convide pelo e-mail com permissão **can edit** (ela precisa de uma vaga de editor; no plano gratuito há limite de arquivos editáveis) ou **can view** para só comentar.
2. Peça que ela trabalhe **somente** nas páginas `Desktop Landing Page`, `Mobile Landing Page` e troque textos/imagens **em instâncias** — nunca dentro dos componentes principais.
3. Ative *Dev Mode* para quem for implementar.
4. Use comentários (tecla **C**) para pedidos de alteração.
5. Para apresentar: abra a página `Prototype` → **Present**.

## 11. Manter Figma e código sincronizados

| Mudou no… | Faça |
|---|---|
| Figma — cor, fonte, espaço | Exporte as variáveis (Tokens Studio → *Export*) para `design/tokens.json` e atualize o bloco `@theme` em `src/index.css` com os mesmos valores |
| Figma — componente | Atualize o componente correspondente em `src/components` (mesmo nome) e confira em `/styleguide.html` |
| Código — texto/produto | Nada a fazer no Figma, a menos que a mudança seja estrutural; `src/data/*` é a fonte da verdade de conteúdo |
| Código — componente novo | Adicione a seção no `/styleguide.html` e crie o componente no Figma |

**Importar a página pronta como camadas:** o plugin **html.to.design** converte uma URL em camadas editáveis do Figma. Rode `npm run dev` (ou publique o `dist/`) e importe `/` e `/styleguide.html` nas larguras 1440 e 390 — é o caminho mais rápido para ter o Figma fiel ao código. Depois, transforme os blocos repetidos em componentes conforme §4.

**Com o Figma MCP autenticado:** autorize o conector do Figma (configurações de conectores do claude.ai ou `/mcp`) e peça a um agente para executar este guia — as skills `figma:figma-generate-library` (variáveis e componentes) e `figma:figma-generate-design` (telas) usam exatamente estes nomes. Mapeie depois com **Code Connect** (`figma:figma-code-connect`) para que o Dev Mode mostre o componente React real.
