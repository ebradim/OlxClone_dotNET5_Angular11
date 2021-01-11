import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-searchbox',
  styleUrls: ['../styles/searchbox.styles.scss'],
  templateUrl: '../templates/searchbox.template.html',
})
export class SearchBoxComponent implements OnInit {
  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [
    {
      category: 'Electronics',
      children: {
        title: 'Dell G3 ',
        hint: 'Gaming laptop',
      },
    },
    {
      category: 'Mobiles',
      children: {
        title: 'IPhone 11 Pro Max',
        hint: 'AWESOME MOBILE',
      },
    },
    {
      category: 'Mobiles',
      children: {
        title: 'Samsung S6',
        hint: 'AWESOME MOBILE',
      },
    },
    {
      category: 'Sports',
      children: {
        title: 'Mohamed Salah',
        hint: 'SPEEEEEEEED',
      },
    },
  ];

  constructor() {}

  onChange(value: string): void {
    console.log(value);
  }

  ngOnInit(): void {}
}
export interface AutocompleteOptionGroups {
  category: string;
  children: AutocompleteChildGroups;
}
export interface AutocompleteChildGroups {
  title: string;
  hint: string;
}
