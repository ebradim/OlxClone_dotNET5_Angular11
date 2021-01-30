import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromFilter } from '../actions';
import {
  IFilterAdvertise,
  IResponseFilterAdvertise,
} from '../models/advertise';
import {
  FilterState,
  getFilteredEntity,
  getFilteredEntityCount,
  getLastAdvertiseID,
} from '../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'explore-page',
  templateUrl: '../templates/explore-page.template.html',
  styleUrls: ['../styles/explore-page.styles.scss'],
})
export class ExplorePageComponent {
  currentIndex = 1;
  filterForm: FormGroup;
  resultCount$: Observable<number>;
  lastId$: Observable<string | null>;
  entities$: Observable<IFilterAdvertise[]>;
  constructor(private fb: FormBuilder, private store: Store<FilterState>) {
    this.filterForm = this.fb.group({
      category: [''],
    });

    this.resultCount$ = this.store.pipe(select(getFilteredEntityCount));
    this.lastId$ = this.store.pipe(select(getLastAdvertiseID));
    this.entities$ = this.store.pipe(select(getFilteredEntity));
    this.store.dispatch(fromFilter.loadAdvertises());
  }
  onPageChange(pageIndex: any, lastId?: any): void {
    if (pageIndex > this.currentIndex) {
      this.currentIndex = pageIndex;
    }

    if (lastId) {
      if (!!!(this.currentIndex % 3)) {
        const category = this.filterForm.get('category')?.value;
        if (category.length > 1) {
          this.store.dispatch(
            fromFilter.filterByCategoryLastId({ lastId, category })
          );
        } else {
          this.store.dispatch(
            fromFilter.filterByLastId({ advertiseId: lastId })
          );
        }
      }

      this.store.dispatch(fromFilter.pageChange({ page: pageIndex }));
      console.log(
        '%cCurrent Page Index: ',
        'color:blue;font-size:20px',
        this.currentIndex
      );
    } else {
      this.store.dispatch(fromFilter.pageChange({ page: pageIndex }));
    }
  }

  filter(): void {
    const category = this.filterForm.get('category')?.value;
    this.store.dispatch(fromFilter.filterByCategory({ category }));
  }
  clearFilters(): void {
    // tslint:disable-next-line: forin
    for (const iterator in this.filterForm.controls) {
      this.filterForm.get(iterator)?.setValue('');
    }
  }

  isFiltered(): boolean {
    for (const iterator in this.filterForm.controls) {
      if (
        this.filterForm.get(iterator)?.value === '' ||
        this.filterForm.get(iterator)?.value.length < 1
      ) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
