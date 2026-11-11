interface KeyTakeawaysProps {
  summary?: string
  points?: string[]
  lang?: 'ar' | 'en'
}

export function KeyTakeaways({ summary, points, lang = 'ar' }: KeyTakeawaysProps) {
  const isAr = lang === 'ar'
  if (!summary && (!points || points.length === 0)) return null

  return (
    <aside
      aria-label={isAr ? 'أبرز النقاط والخلاصة التنفيذية' : 'Key Takeaways & Executive Summary'}
      className="my-8 rounded-2xl border border-voxa/30 bg-gradient-to-br from-voxa/[0.08] via-ash/60 to-ash/90 p-5 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md"
    >
      {/* Badge Header */}
      <div className="flex items-center gap-2.5 text-voxa mb-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-voxa/20 text-sm">
          💡
        </span>
        <span className="font-dm text-xs font-bold uppercase tracking-[0.16em]">
          {isAr ? 'الخلاصة وأبرز النقاط (Key Takeaways)' : 'KEY TAKEAWAYS & SUMMARY'}
        </span>
      </div>

      {/* Direct Answer Summary for Featured Snippets */}
      {summary && (
        <p className="font-manrope text-base sm:text-lg font-semibold leading-relaxed text-white/95">
          {summary}
        </p>
      )}

      {/* Bulleted Points */}
      {points && points.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 font-dm text-sm sm:text-base text-white/80">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-voxa/20 text-[0.65rem] font-bold text-voxa">
                ✓
              </span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
