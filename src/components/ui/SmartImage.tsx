import { useState, type ImgHTMLAttributes } from 'react'
import { imageSrcSet, imageUrl, type ImageAsset } from '../../data/images'
import { LogoMark } from './Logo'

interface SmartImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  asset: ImageAsset
  /** Largura base da imagem em px */
  width?: number
  /** Proporção largura/altura usada no recorte (ex.: 4/5) */
  aspect?: number
  sizes?: string
  priority?: boolean
  /** Sobrescreve o alt do asset (use '' para imagens decorativas) */
  alt?: string
}

/**
 * Imagem responsiva com srcset e fallback ilustrado.
 * Se a foto não carregar, mostra o símbolo da marca sobre textura de pontos
 * (o layout não "pula", pois o contêiner já reserva o espaço).
 */
export function SmartImage({
  asset,
  width = 800,
  aspect,
  sizes = '100vw',
  priority = false,
  alt,
  className = '',
  style,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const label = alt ?? asset.alt

  if (failed) {
    return (
      <div
        role={label ? 'img' : undefined}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        className={`stitch-texture grid place-items-center bg-sand ${className}`}
        style={style}
      >
        <LogoMark size={44} className="opacity-60" />
      </div>
    )
  }

  const widths = [Math.round(width / 2), width, Math.round(width * 1.5), width * 2]
  return (
    <img
      src={imageUrl(asset, width, aspect)}
      srcSet={imageSrcSet(asset, widths, aspect)}
      sizes={sizes}
      alt={label}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`bg-sand object-cover ${className}`}
      style={{ objectPosition: asset.focus, ...style }}
      {...rest}
    />
  )
}
