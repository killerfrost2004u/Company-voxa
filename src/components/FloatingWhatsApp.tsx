import { useState } from 'react'

const WHATSAPP_URL = 'https://wa.me/201111717189'

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <aside
      aria-label="Direct WhatsApp contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 sm:bottom-8 sm:right-8"
    >
      {/* Interactive Status Tooltip pill */}
      <div
        className={`pointer-events-none hidden items-center gap-2.5 rounded-full border border-white/15 bg-black/85 px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 sm:flex ${
          isHovered ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-3 opacity-0 scale-95'
        }`}
      >
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative size-full rounded-full bg-[#25D366]" />
        </span>
        <div className="flex flex-col">
          <span className="font-dm text-xs font-bold tracking-wide text-white">Chat on WhatsApp</span>
          <span className="font-dm text-[0.65rem] text-white/50">Online • Typically replies in 5m</span>
        </div>
      </div>

      {/* Prominent Large Floating Action Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Voxa Studio on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex size-18 sm:size-20 lg:size-22 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_45px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-108 hover:shadow-[0_16px_55px_rgba(37,211,102,0.75)] active:scale-95"
      >
        {/* Soft radial pulse auras */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-35 [animation-duration:2.4s]"
        />
        <span
          aria-hidden
          className="absolute -inset-2 -z-20 rounded-full bg-[#25D366]/20 blur-md transition-all group-hover:bg-[#25D366]/35"
        />

        {/* Large, Crisp WhatsApp Glyph */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9 sm:size-10 lg:size-11 transition-transform duration-300 group-hover:scale-108"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>

        {/* Live Notification Indicator */}
        <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-black bg-white shadow-md">
          <span className="size-2.5 rounded-full bg-[#25D366]" />
        </span>
      </a>
    </aside>
  )
}
