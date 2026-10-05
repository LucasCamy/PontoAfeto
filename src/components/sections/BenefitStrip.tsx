import { benefits } from '../../data/content'
import { Icon } from '../ui/Icon'

export function BenefitStrip() {
  return (
    <section aria-label="Por que comprar com a gente" className="relative bg-cocoa text-cream">
      <div className="stitch-line absolute inset-x-0 top-2 text-cream/25" aria-hidden="true" />
      <ul className="no-scrollbar mx-auto flex max-w-[1320px] snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 py-7 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:gap-y-6 lg:overflow-visible lg:px-10 xl:grid-cols-6">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className={`flex min-w-[15.5rem] snap-start items-start gap-3 px-2 lg:min-w-0 lg:px-4 ${
              i > 0 ? 'xl:border-l xl:border-dashed xl:border-cream/20' : ''
            }`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream/10 text-butter">
              <Icon name={b.icon} size={22} weight="duotone" />
            </span>
            <span>
              <span className="block text-[0.95rem] font-semibold leading-snug">{b.title}</span>
              <span className="mt-0.5 block text-sm leading-snug text-cream/70">{b.text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="stitch-line absolute inset-x-0 bottom-2 text-cream/25" aria-hidden="true" />
    </section>
  )
}
