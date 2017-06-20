import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

@Injectable()
export class CalendarService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {

    let homeColors = this._baConfig.get().colors.home;
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-03-08',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'All Day Event',
          start: '2016-03-01',
          color: homeColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2016-03-07',
          end: '2016-03-10',
          color: homeColors.blueStone
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: homeColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: homeColors.gossip
        }
      ]
    };
  }
}
