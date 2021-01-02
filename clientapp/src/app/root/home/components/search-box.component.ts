import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-searchbox',
  styleUrls: ['../styles/searchbox.styles.scss'],
  templateUrl: '../templates/searchbox.template.html',
})
export class SearchBoxComponent implements OnInit {
  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];

  constructor() {}

  onChange(value: string): void {
    console.log(value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.optionGroups = [
        {
          title: 'Electronics',
          children: [
            {
              title: 'IPhone 11 Pro Max',
              count: 2,
            },
            {
              title: 'Samsung S20',
              count: 20,
            },
          ],
        },
      ];
    }, 1000);
  }
}
export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}
