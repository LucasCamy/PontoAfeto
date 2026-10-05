// Captura screenshots de página inteira em vários breakpoints usando o Edge/Chrome instalado.
// Uso: node scripts/screenshots.mjs [url] [larguras separadas por vírgula]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const url = process.argv[2] ?? 'http://localhost:5188/'
const widths = (process.argv[3] ?? '360,375,390,414,768,1024,1280,1440').split(',').map(Number)
const outDir = process.env.SHOT_DIR ?? 'screenshots'
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge' })
const report = []
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(url, { waitUntil: 'networkidle' })
  // rola a página para disparar lazy-loading e animações de entrada
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  const wide = await page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .filter((el) => !el.closest('.overflow-x-auto, .overflow-hidden'))
      .slice(0, 8)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)}`),
  )
  if (overflow > 0) console.error(`[${width}] elementos além da largura:`, wide)
  const brokenImages = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
  )
  await page.screenshot({ path: `${outDir}/home-${width}.png`, fullPage: true })
  if (process.env.SEGMENTS) {
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    const step = Number(process.env.SEGMENTS)
    for (let y = 0, i = 0; y < total; y += step, i++) {
      await page.screenshot({
        path: `${outDir}/seg-${width}-${String(i).padStart(2, '0')}.png`,
        fullPage: true,
        clip: { x: 0, y, width, height: Math.min(step, total - y) },
      })
    }
  }
  report.push({ width, horizontalOverflow: overflow, brokenImages: brokenImages.length, errors })
  await page.close()
}
await browser.close()
console.log(JSON.stringify(report, null, 2))
