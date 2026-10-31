export function KineticFoldPreloader({ progress }: { progress: number }) {
  // Laser sweep calculation
  const laserPos = Math.min(Math.max((progress - 10) / 70, 0), 1) * 100

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 3D Perspective Isometric Cube / Letter Fold Stage */}
      <div className="relative [perspective:1200px] flex items-center justify-center">
        {/* Ambient Laser Plane */}
        <div
          className="absolute -inset-10 pointer-events-none transition-opacity duration-300"
          style={{ opacity: progress > 15 && progress < 85 ? 0.8 : 0 }}
        >
          <div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#63a1f2] to-transparent shadow-[0_0_20px_#63a1f2]"
            style={{ top: `${laserPos}%` }}
          />
        </div>

        {/* 3D Geometric Tiles Stagger */}
        <div className="flex items-center gap-3 sm:gap-6 font-manrope text-5xl sm:text-8xl md:text-9xl font-black text-paper">
          {/* Tile V */}
          <div
            className="transition-all duration-700 ease-[var(--ease-expo)]"
            style={{
              transform:
                progress >= 15
                  ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
                  : 'rotateX(80deg) rotateY(-40deg) translateZ(-150px) scale(0.6)',
              opacity: progress >= 15 ? 1 : 0,
            }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
              V
            </span>
          </div>

          {/* Tile O */}
          <div
            className="transition-all duration-700 ease-[var(--ease-expo)]"
            style={{
              transform:
                progress >= 30
                  ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
                  : 'rotateX(-75deg) rotateY(45deg) translateZ(-150px) scale(0.6)',
              opacity: progress >= 30 ? 1 : 0,
            }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
              O
            </span>
          </div>

          {/* Tile X */}
          <div
            className="transition-all duration-700 ease-[var(--ease-expo)]"
            style={{
              transform:
                progress >= 45
                  ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
                  : 'rotateX(75deg) rotateY(-30deg) translateZ(-150px) scale(0.6)',
              opacity: progress >= 45 ? 1 : 0,
            }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
              X
            </span>
          </div>

          {/* Tile A */}
          <div
            className="transition-all duration-700 ease-[var(--ease-expo)]"
            style={{
              transform:
                progress >= 60
                  ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
                  : 'rotateX(-80deg) rotateY(35deg) translateZ(-150px) scale(0.6)',
              opacity: progress >= 60 ? 1 : 0,
            }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
              A
            </span>
          </div>

          {/* Glowing Flame Dot */}
          <div
            className="transition-all duration-500 ease-[var(--ease-expo)]"
            style={{
              transform: progress >= 75 ? 'scale(1) translateZ(30px)' : 'scale(0) translateZ(-50px)',
              opacity: progress >= 75 ? 1 : 0,
            }}
          >
            <span className="inline-block size-4 sm:size-6 rounded-full bg-flame shadow-[0_0_24px_#ff5a3c]" />
          </div>
        </div>
      </div>

      {/* Cyber Grid Lines */}
      <div
        className="mt-6 flex items-center gap-2 text-xs font-dm tracking-[0.25em] uppercase text-voxa transition-opacity duration-500"
        style={{ opacity: progress >= 40 ? 1 : 0 }}
      >
        <span className="size-1.5 rounded-full bg-voxa animate-pulse" />
        <span>KINETIC STRUCTURAL FOLD</span>
      </div>
    </div>
  )
}
