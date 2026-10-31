import { logos } from '@/lib/assets'

export type LogoProps = {
  className?: string
  /** Colour theme for the logo; 'blue' gives voxa brand glow, 'paper' is monochrome white/silver. */
  tone?: 'blue' | 'paper'
  /** Presentation variant:
   * - 'full': Monogram badge + crisp geometric wordmark (default)
   * - 'wordmark': Horizontal cropped VOXA wordmark SVG
   * - 'icon': The standalone 'V' monogram mark
   * - 'navbar': Square transparent navbar badge
   * - 'text': Styled typographic fallback
   */
  variant?: 'full' | 'wordmark' | 'icon' | 'navbar' | 'text'
  /** Height preset if not provided in className */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Logo({
  className = '',
  tone = 'blue',
  variant = 'full',
  size = 'md',
}: LogoProps) {
  // Height sizing helpers
  const sizeMap = {
    sm: { height: 'h-6', icon: 'size-6', wordmark: 'h-5' },
    md: { height: 'h-8 sm:h-9', icon: 'size-8 sm:size-9', wordmark: 'h-7 sm:h-8' },
    lg: { height: 'h-10 sm:h-12', icon: 'size-10 sm:size-12', wordmark: 'h-9 sm:h-10' },
    xl: { height: 'h-14 sm:h-16', icon: 'size-14 sm:size-16', wordmark: 'h-12 sm:h-14' },
  }

  const currentSize = sizeMap[size]

  if (variant === 'text') {
    return (
      <span
        className={`inline-block whitespace-nowrap font-manrope font-extrabold leading-[1.5] tracking-[-0.0625em] ${
          tone === 'blue' ? 'text-voxa' : 'text-paper'
        } ${className}`}
      >
        VOXA<span className="text-flame">.</span>
      </span>
    )
  }

  if (variant === 'icon') {
    return (
      <span className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src={logos.icon}
          alt="Voxa Icon"
          className={`${currentSize.icon} object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </span>
    )
  }

  if (variant === 'wordmark') {
    return (
      <span className={`relative inline-flex items-center ${className}`}>
        <img
          src={logos.wordmark}
          alt="VOXA"
          className={`${currentSize.wordmark} w-auto object-contain transition-all duration-300 ${
            tone === 'blue'
              ? 'hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(99,161,242,0.4)]'
              : 'hover:brightness-125'
          }`}
        />
      </span>
    )
  }

  if (variant === 'navbar') {
    return (
      <span className={`relative inline-flex items-center ${className}`}>
        <img
          src={logos.navbar}
          alt="Voxa Logo"
          className={`${currentSize.height} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </span>
    )
  }

  // Default 'full' variant: Monogram Badge + Wordmark
  return (
    <span
      className={`group relative inline-flex items-center gap-2.5 sm:gap-3 transition-transform duration-300 ${className}`}
    >
      {/* Icon Badge */}
      <span
        className={`relative flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 group-hover:border-voxa/40 group-hover:bg-voxa/[0.08] group-hover:shadow-[0_0_16px_rgba(99,161,242,0.35)] ${
          tone === 'blue' ? 'border-white/15' : 'border-white/10'
        }`}
      >
        <img
          src={logos.icon}
          alt=""
          aria-hidden="true"
          className="size-5 sm:size-6 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        {/* Subtle dot accent */}
        <span className="absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full bg-flame shadow-[0_0_6px_#f05d23]" />
      </span>

      {/* Wordmark */}
      <span className="relative flex items-center">
        <img
          src={logos.wordmark}
          alt="VOXA"
          className="h-6 sm:h-7 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(99,161,242,0.35)]"
        />
      </span>
    </span>
  )
}
