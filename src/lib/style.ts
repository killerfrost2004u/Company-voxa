import type { CSSProperties } from 'react'

/** Inline CSS custom properties, e.g. `vars({ '--d': '120ms' })`. */
export const vars = (values: Record<`--${string}`, string | number>) => values as CSSProperties

/** Reveal delay for `[data-reveal]` elements. */
export const delay = (ms: number) => vars({ '--d': `${ms}ms` })
