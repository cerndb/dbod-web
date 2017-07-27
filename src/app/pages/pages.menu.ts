export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: '',
            icon: 'ion-navicon',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'home',
        data: {
          menu: {
            title: 'general.menu.home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'editor',
        data: {
          menu: {
            title: 'general.menu.editor',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'help',
        data: {
          menu: {
            title: 'general.menu.help',
            icon: 'ion-help',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.external_link',
            url: '#',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.report_an_incident',
                url: 'https://cern.service-now.com/service-portal/report-ticket.do?name=incident&se=database-on-demand'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.submit_a_request',
                url: 'https://cern.service-now.com/service-portal/report-ticket.do?name=request&se=database-on-demand'
              }
            }
          }
        ]
      },
    ]
  },
];
