import { Component, Input } from '@angular/core';
import { IReceivedOffer } from '../home/models/OffersHubs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'notification-item',
  templateUrl: '../templates/notification-item.template.html',
  styleUrls: ['../styles/notification-item.styles.scss'],
})
export class NotificationItemComponent {
  @Input() NavItem!: IReceivedOffer;
}
