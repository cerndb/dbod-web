export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
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
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.submit_a_request',
                url: '#'
              }
            }
          }
        ]
      }
    ]
  }
];
