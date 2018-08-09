import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Overview',
    icon: 'nb-grid-a',
    link: '/pages/overview',
    home: false,
  },
  {
    title: 'Admin',
    icon: 'nb-person',
    link: '/pages/admin-instances',
    home: false,
  },
];
