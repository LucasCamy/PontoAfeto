import { InstagramLogo } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { gallery } from '../../data/content'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

const spanClass = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
}

/**
 * Galeria de inspiração. Funciona sem depender do Instagram: as fotos
 * vêm de data/content.ts. O link do perfil é FICTÍCIO (config/site.ts).
 */
export function Gallery() {
  return (
    <section aria-labelledby="galeria-titulo" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="galeria-titulo" eyebrow="Diário do ateliê" title="Fios, bastidores e pacotinhos">
            Um pouco do que acontece por aqui entre um pedido e outro.
          </SectionHeading>
          <ButtonLink
            href={site.contact.instagramUrl}
            variant="secondary"
            className="self-start md:self-auto"
            icon={<InstagramLogo size={20} aria-hidden="true" />}
          >
            {site.contact.instagramHandle}
          </ButtonLink>
        </div>

        <ul className="mt-10 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[14rem]">
          {gallery.map((item, i) => (
            <li key={item.image.src} className={spanClass[item.span]}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <figure className="group relative h-full overflow-hidden rounded-[22px] bg-sand">
                  <SmartImage
                    asset={item.image}
                    width={item.span === 'wide' ? 760 : 420}
                    sizes={item.span === 'wide' ? '(min-width: 768px) 46vw, 92vw' : '(min-width: 768px) 23vw, 46vw'}
                    className="size-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-3 pb-2.5 pt-8 text-[0.8rem] font-medium leading-snug text-cream transition-opacity duration-300 sm:text-sm [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
