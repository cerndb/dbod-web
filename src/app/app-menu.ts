import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/',
    home: true,
  },
  {
    title: 'Platform Overview',
    icon: 'nb-bar-chart',
    link: '/platform-overview',
  },
  {
    title: 'Help',
    icon: 'ion-help',
    link: '/help',
  },
  {
    title: 'Create Service Request',
    icon: 'ion-lightbulb',
    url: 'https://cern.service-now.com/service-portal/report-ticket.do?name=request&se=database-on-demand',
  },
  {
    title: 'Report Service Incident',
    icon: 'ion-alert',
    url: 'https://cern.service-now.com/service-portal/report-ticket.do?name=incident&se=database-on-demand',
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Info',
        link: '/auth',
      },
    ],
  },
];
