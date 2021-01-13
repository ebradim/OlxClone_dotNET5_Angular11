import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAdvertiseSearchResult, RootState } from '../../reducers';
import { IGroupedAdvertise } from '../models/SearchAdvertise';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-searchbox',
  styleUrls: ['../styles/searchbox.styles.scss'],
  templateUrl: '../templates/searchbox.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  @Output() search = new EventEmitter<KeyboardEvent>();
  searchResults$: Observable<IGroupedAdvertise[]>;

  constructor(private store: Store<RootState>) {
    this.searchResults$ = this.store.pipe(select(getAdvertiseSearchResult));
  }
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
