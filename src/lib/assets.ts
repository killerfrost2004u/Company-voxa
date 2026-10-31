const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`
const logoAsset = (file: string) => `${import.meta.env.BASE_URL}logo/${file}`

export const logos = {
  cropped: logoAsset('CroppedLOGOOO.svg'),
  icon: logoAsset('iconnnnLOGOOO.svg'),
  fullSquare: logoAsset('LOGO.svg'),
  navbar: logoAsset('NavbarLogo2.svg'),
  wordmark: logoAsset('NewCroppedLOGOOO.svg'),
  showcaseJpg: logoAsset('voxa_logo.jpg'),
}

export const assets = {
  stars: asset('2aca7.png'),
  waves: asset('34ab2.png'),
  heroGlow: asset('6ff35.svg'),
  studioGlow: asset('05582.svg'),
  ring: asset('e84f9.svg'),
  arrowRight: asset('2fa87.svg'),
  arrowRightLarge: asset('396fe.svg'),
  arrowUpRight: asset('4e62e.svg'),
  arrowUpRightLarge: asset('73667.svg'),
  lineLong: asset('1bdd2.svg'),
  lineShort: asset('a4077.svg'),
  quote: asset('48b40.svg'),
  check: asset('b6903.svg'),
  sparkle: asset('95ab4.svg'),
  mail: asset('17a18.svg'),
  phone: asset('ea8fa.svg'),
  pin: asset('0f512.svg'),
}

