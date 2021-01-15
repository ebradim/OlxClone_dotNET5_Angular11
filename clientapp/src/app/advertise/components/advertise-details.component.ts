import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/auth/models/API';
import { getCurrentUser, RootState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
import { IResponseAdvertise } from '../models/Advertise';
import { AdvertiseState, getSelectedAdvertiseIdEntity } from '../reducers';
import { AdvertiseEditComponent } from './advertise-edit.component';
import { SendOfferComponent } from './send-offer.component';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertise-details',
  templateUrl: '../templates/advertise-details.template.html',
  styleUrls: ['../styles/advertise-details.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseDetailsComponent implements OnDestroy {
  currentUser$: Observable<IUser | null>;
  advertise$: Observable<'' | IResponseAdvertise | null | undefined>;
  modalRef: NzModalRef | undefined;
  constructor(
    private store: Store<AdvertiseState>,
    private modal: NzModalService,
    private router: ActivatedRoute
  ) {
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
  addToFavorite(uniqueId: string): void {
    this.store.dispatch(fromAdvertise.addToFavorite({ uniqueId }));
  }

  removeFromFavorite(uniqueId: string): void {
    this.store.dispatch(fromAdvertise.removeFromFavorite({ uniqueId }));
  }
  deleteAdvertise(uniqueId: string): void {
    this.store.dispatch(fromAdvertise.deleteAdvertise({ uniqueId }));
  }

  likeAdvertise(uniqueId: string): void {
    this.store.dispatch(fromAdvertise.likeAdvertise({ uniqueId }));
  }

  getAdvertiseId(): string {
    return this.router.snapshot.params.id;
  }

  openOfferModel(userName: string, title: TemplateRef<{}>): void {
    this.modalRef = this.modal.create({
      nzContent: SendOfferComponent,
      nzCloseOnNavigation: true,
      nzClosable: true,
      nzTitle: title,
      nzOnOk: (component) => {
        component.sendOffer(userName, this.getAdvertiseId());
      },
    });
  }
}
