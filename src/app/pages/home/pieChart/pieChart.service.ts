import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.homePieChart;
    return [
      {
        color: pieColor,
        description: 'home.new_visits',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'home.purchases',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'home.active_users',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'home.returned',
        stats: '32,592',
        icon: 'refresh',
      }
    ];
  }
}
