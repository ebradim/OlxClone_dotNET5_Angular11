import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-page',
  styleUrls: ['../styles/home-page.styles.scss'],
  templateUrl: '../templates/home-page.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
