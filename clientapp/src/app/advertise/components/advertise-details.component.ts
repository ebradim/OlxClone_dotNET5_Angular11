import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/auth/models/API';
import { getCurrentUser, RootState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
import { IResponseAdvertise } from '../models/Advertise';
import { getSelectedAdvertiseIdEntity } from '../reducers';
import { State } from '../reducers/advertise.reducer';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-details',
  templateUrl: '../templates/advertise-details.template.html',
  styleUrls: ['../styles/advertise-details.style.scss'],
})
export class AdvertiseDetailsComponent implements OnDestroy {
  currentUser$: Observable<IUser | null>;
  advertise$: Observable<'' | IResponseAdvertise | null | undefined>;
  modalRef: NzModalRef | undefined;

  constructor(private store: Store<State>, private modal: NzModalService) {
    this.advertise$ = this.store.pipe(select(getSelectedAdvertiseIdEntity));
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
  }
  ngOnDestroy(): void {
    this.modalRef?.destroy();
  }

  openEditModal(
    title: TemplateRef<{}>,
    content: TemplateRef<{}>,
    footer: TemplateRef<{}>
  ): void {
    this.modalRef = this.modal.create({
      nzTitle: title,
      nzContent: content,
      nzFooter: footer,
      nzCloseOnNavigation: true,
    });
  }

  deleteAdvertise(uniqueId: string): void {
    this.store.dispatch(fromAdvertise.deleteAdvertise({ uniqueId }));
  }
}
