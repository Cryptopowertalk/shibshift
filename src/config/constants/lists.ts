const PANPSB_EXTENDED = 'https://tokens.shibshift.com/pancakeswap-extended.jsn'
const PANPSB_TOP100 = 'https://tokens.shibshift.com/pancakeswap-top-100.jsn'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  PANPSB_TOP100,
  PANPSB_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
