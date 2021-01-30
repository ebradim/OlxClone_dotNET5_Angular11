import { Component, Input } from '@angular/core';
import { IHomeAdvertise } from 'src/app/advertise/models/Advertise';
import { IFilterAdvertise } from '../models/advertise';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-explore',
  templateUrl: '../templates/advertise-explore.template.html',
  styleUrls: ['../styles/advertise-explore.styles.scss'],
})
export class AdvertiseExploreComponent {
  @Input() advertise: any;
}
