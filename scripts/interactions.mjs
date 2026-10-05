// Roteiro de verificação das interações principais (usa o Edge/Chrome instalado).
// Uso: node scripts/interactions.mjs [url]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const url = process.argv[2] ?? 'http://localhost:5188/'
const out = process.env.SHOT_DIR ?? 'screenshots'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge' })
const results = []
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)

// ---------- Desktop ----------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(url, { waitUntil: 'networkidle' })

  // filtro por categoria
  await page.locator('#produtos').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /^Bolsas/ }).click()
  await page.waitForTimeout(700)
  const bags = await page.locator('#produtos article').count()
  check('Filtro "Bolsas" mostra 2 produtos', bags === 2, String(bags))
  check('Chip ativo com aria-pressed', (await page.getByRole('button', { name: /^Bolsas/ }).getAttribute('aria-pressed')) === 'true')
  await page.screenshot({ path: `${out}/i-filtro.png` })
  await page.getByRole('button', { name: /^Todos/ }).click()
  await page.waitForTimeout(500)

  // categoria via card
  await page.locator('a[href="#produtos"]', { hasText: 'Kits' }).click()
  await page.waitForTimeout(900)
  check('Card de categoria filtra vitrine (Kits = 2)', (await page.locator('#produtos article').count()) === 2)
  await page.getByRole('button', { name: /^Todos/ }).click()
  await page.waitForTimeout(500)

  // detalhe do produto
  await page.getByRole('button', { name: 'Gatinho Mingau', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  check('Detalhe do produto abre como diálogo', await dialog.isVisible())
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${out}/i-detalhe.png` })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  check('Esc fecha o diálogo', (await page.getByRole('dialog').count()) === 0)
  const focused = await page.evaluate(() => document.activeElement?.textContent)
  check('Foco volta ao gatilho', /Gatinho Mingau/.test(focused ?? ''), focused ?? '')

  // adicionar à sacola
  await page.getByRole('button', { name: 'Adicionar Gatinho Mingau à sacola' }).click()
  await page.getByRole('button', { name: 'Adicionar Bolsa Primavera à sacola' }).click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${out}/i-toast.png` })
  const bagLabel = await page.getByRole('button', { name: /Abrir sacola/ }).getAttribute('aria-label')
  check('Contador da sacola atualiza', /2 itens/.test(bagLabel ?? ''), bagLabel ?? '')
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await page.waitForTimeout(600)
  const wa = await page.getByRole('link', { name: /Finalizar pelo WhatsApp/ }).getAttribute('href')
  check('Sacola gera link do WhatsApp com itens', !!wa && wa.startsWith('https://wa.me/') && decodeURIComponent(wa).includes('Gatinho Mingau'))
  await page.screenshot({ path: `${out}/i-sacola.png` })
  await page.getByRole('button', { name: 'Fechar sacola' }).click()
  await page.waitForTimeout(400)

  // FAQ
  const q = page.getByRole('button', { name: 'Qual o prazo de produção?' })
  await q.click()
  check('FAQ abre (aria-expanded=true)', (await q.getAttribute('aria-expanded')) === 'true')
  await page.waitForTimeout(400)
  check('FAQ mostra resposta', await page.getByText('Peças de pronta entrega são enviadas').isVisible())

  // formulário: erros
  await page.locator('#personalizados').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Enviar ficha de encomenda' }).click()
  await page.waitForTimeout(500)
  const alert = page.locator('#personalizados [role="alert"]')
  check('Formulário vazio mostra resumo de erros', await alert.isVisible())
  check('Resumo recebe foco', await alert.evaluate((el) => el === document.activeElement))
  await page.screenshot({ path: `${out}/i-form-erros.png` })

  // formulário: preenchimento
  await page.getByText('Amigurumi', { exact: true }).click()
  await page.locator('#encomenda-colors label[title="Sálvia"]').click()
  await page.locator('#encomenda-colors label[title="Manteiga"]').click()
  await page.getByText('Médio', { exact: true }).click()
  await page.getByLabel('Nome ou inicial').fill('Helena')
  await page.getByLabel('Seu nome').fill('Marina Duarte')
  await page.getByLabel('WhatsApp com DDD').fill('11912345678')
  check('Máscara de telefone', (await page.getByLabel('WhatsApp com DDD').inputValue()) === '(11) 91234-5678')
  await page.getByRole('button', { name: 'Enviar ficha de encomenda' }).click()
  await page.getByText(/Ficha recebida/).waitFor({ timeout: 4000 })
  check('Confirmação de encomenda aparece', true)
  const wa2 = await page.getByRole('link', { name: /Enviar resumo pelo WhatsApp/ }).getAttribute('href')
  check(
    'Resumo da encomenda vai para o WhatsApp',
    !!wa2 && decodeURIComponent(wa2).includes('Amigurumi') && decodeURIComponent(wa2).includes('Helena'),
  )
  await page.screenshot({ path: `${out}/i-form-ok.png` })

  // links internos
  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h && h.length > 1),
  )
  const missing = await page.evaluate(
    (hrefs) => [...new Set(hrefs)].filter((h) => !document.getElementById(decodeURIComponent(h.slice(1)))),
    anchors,
  )
  check('Âncoras internas apontam para seções existentes', missing.length === 0, missing.join(', '))

  check('Sem erros de console (desktop)', errors.length === 0, errors.join(' | '))
  await page.close()
}

// ---------- Mobile ----------
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.waitForTimeout(600)
  check('Menu mobile abre', await page.getByRole('dialog').isVisible())
  await page.screenshot({ path: `${out}/i-menu-mobile.png` })
  await page.getByRole('dialog').getByRole('link', { name: /^Personalizados/ }).click()
  await page.waitForTimeout(2600) // rolagem suave longa
  check('Link do menu fecha o menu', (await page.getByRole('dialog').count()) === 0)
  const top = await page.evaluate(() => document.getElementById('personalizados').getBoundingClientRect().top)
  check('Link do menu rola até a seção', Math.abs(top) < 120, `top=${Math.round(top)}`)
  await page.evaluate(() => window.scrollTo(0, 2400))
  await page.waitForTimeout(600)
  check('Botão flutuante do WhatsApp visível após a hero', await page.getByRole('link', { name: /Conversar pelo WhatsApp/ }).isVisible())
  await page.locator('#produtos').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Gatinho Mingau', exact: true }).click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${out}/i-detalhe-mobile.png` })
  await page.close()
}

await browser.close()
console.log(results.join('\n'))
if (results.some((r) => r.startsWith('FAIL'))) process.exitCode = 1
