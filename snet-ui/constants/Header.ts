import { AIRDROP_SITE_STRING, AIRDROP_LINKS } from 'utils/airdropWindows';

export const navData = [
  {
    id: 3,
    name: `${AIRDROP_SITE_STRING} Site`,
    url: `${AIRDROP_LINKS.WEBSITE}`,
    external: true,
  },
  {
    id: 4,
    name: 'Contact us',
    url: '/contactus',
  },
];

export const userActions = [
  {
    name: 'Login',
    url: 'https://beta.singularitynet.io/login',
  },
  {
    name: 'Sign up',
    name_responsive: 'free',
    url: 'https://beta.singularitynet.io/signup',
  },
];
