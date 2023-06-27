import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PulseShib',
  description:
    'The most popular AMM on PLS by user count! Earn PSB through yield farming or win it in the Lottery, then stake it in PSB Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PulseShib), NFTs, and more, on a platform you can trust.',
  image: 'https://shibshift.com/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PulseShib')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('PulseShib')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('PulseShib')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('PulseShib')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('PulseShib')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('PulseShib')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PulseShib')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PulseShib')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('PulseShib')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PulseShib')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('PulseShib')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PulseShib')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PulseShib')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PulseShib')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PulseShib')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('PulseShib')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('PulseShib')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('PulseShib')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PulseShib Info & Analytics')}`,
        description: 'View statistics for PulseShib exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PulseShib Info & Analytics')}`,
        description: 'View statistics for PulseShib exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('PulseShib Info & Analytics')}`,
        description: 'View statistics for PulseShib exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('PulseShib')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('PulseShib')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('PulseShib')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('PulseShib')}`,
      }
    default:
      return null
  }
}
