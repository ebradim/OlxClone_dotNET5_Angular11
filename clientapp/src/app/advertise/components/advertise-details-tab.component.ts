import { Component, Input } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { selectAdvertise } from '../actions/advertise.actions';
import { IResponseAdvertise } from '../models/Advertise';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-details-tab',
  templateUrl: '../templates/advertise-details-tab.template.html',
  styleUrls: ['../styles/advertise-details-tab.style.scss'],
})
export class AdvertiseDetailsTabComponent {
  tabposition: NzTabPosition = 'left';
  @Input() SelectedAdvertise: IResponseAdvertise | undefined;
  constructor(eventManager: EventManager) {
    eventManager.addGlobalEventListener('window', 'resize', (e: Event) => {
      if ((e.target as Window).innerWidth < 630) {
        this.tabposition = 'top';
      } else {
        this.tabposition = 'left';
      }
    });
  }
}
