import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class TrafficChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }


  getData() {
    let homeColors = this._baConfig.get().colors.home;
    return [
      {
        value: 2000,
        color: homeColors.white,
        highlight: colorHelper.shade(homeColors.white, 15),
        label: 'Other',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: homeColors.gossip,
        highlight: colorHelper.shade(homeColors.gossip, 15),
        label: 'Search engines',
        percentage: 22,
        order: 4,
      }, {
        value: 1000,
        color: homeColors.silverTree,
        highlight: colorHelper.shade(homeColors.silverTree, 15),
        label: 'Referral Traffic',
        percentage: 70,
        order: 3,
      }, {
        value: 1200,
        color: homeColors.surfieGreen,
        highlight: colorHelper.shade(homeColors.surfieGreen, 15),
        label: 'Direct Traffic',
        percentage: 38,
        order: 2,
      }, {
        value: 400,
        color: homeColors.blueStone,
        highlight: colorHelper.shade(homeColors.blueStone, 15),
        label: 'Ad Campaigns',
        percentage: 17,
        order: 0,
      },
    ];
  }
}
