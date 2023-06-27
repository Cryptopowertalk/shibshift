import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Trade any token on Pulse chain in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'PLS', alt: 'PLS token' },
      { src: 'BTC', alt: 'BTC token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'PSB makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'folder', alt: 'Folder with cake token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'PSB makes our world go round.',
  bodyText:
    'PSB token is at the heart of the PSB ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    text: 'Buy PSB',
    external: false,
  },
  
  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'coin', alt: 'PSB token' },
    ],
  },
}
