import { Component, Input } from '@angular/core';
import { IFilterAdvertise } from '../models/advertise';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-explore',
  templateUrl: '../templates/advertise-explore.template.html',
  styleUrls: ['../styles/advertise-explore.styles.scss'],
})
export class AdvertiseExploreComponent {
  @Input() advertise: IFilterAdvertise | undefined;
}
