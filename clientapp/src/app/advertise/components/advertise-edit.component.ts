import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { fromAdvertise } from '../actions';
import {
  IAddAdvertise,
  IEditAdvertise,
  IResponseAdvertise,
} from '../models/Advertise';
import { AdvertiseState, getConnecting } from '../reducers';
import { State } from '../reducers/advertise.reducer';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertie-edit',
  templateUrl: '../templates/advertise-edit.template.html',
  styleUrls: ['../styles/advertise-edit.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseEditComponent {
  @Input() selectedAdvertise: any;
  editForm: FormGroup | undefined;
  imagesToBeDeleted: DeletingImages[] = [];
  defaultFileList: NzUploadFile[] = [];
  isConnecting$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AdvertiseState>,
    private changeDetector: ChangeDetectorRef
  ) {
    setTimeout(() => {
      const toSelectedAdvertise = this.selectedAdvertise as IResponseAdvertise;
      this.editForm = this.fb.group({
        color: [
          toSelectedAdvertise?.userAdvertise.advertise.advertiseInfo.color,
          Validators.required,
        ],
        hint: [
          toSelectedAdvertise?.userAdvertise.advertise.advertiseInfo.hint,
          Validators.required,
        ],
        paymentOption: [
          toSelectedAdvertise?.userAdvertise.paymentOption,
          Validators.required,
        ],
        status: [
          toSelectedAdvertise?.userAdvertise.status,
          Validators.required,
        ],
        description: [
          toSelectedAdvertise?.userAdvertise.advertise.advertiseInfo
            .description,
          Validators.required,
        ],
        price: [
          toSelectedAdvertise?.userAdvertise.advertise.price,
          Validators.required,
        ],
        category: [
          toSelectedAdvertise?.userAdvertise.category,
          Validators.required,
        ],
        quantity: [
          toSelectedAdvertise?.userAdvertise.advertise.advertiseInfo.quantity,
          Validators.required,
        ],
      });
      this.changeDetector.markForCheck();
    }, 1);

    this.isConnecting$ = this.store.pipe(select(getConnecting));
  }

  submit(): void {
    if (
      this.editForm?.touched ||
      this.defaultFileList.length > 0 ||
      this.imagesToBeDeleted.length > 0
    ) {
      const toSelectedAdvertise = this.selectedAdvertise as IResponseAdvertise;

      const advertise: IEditAdvertise = {
        isNegotiate: toSelectedAdvertise.userAdvertise.isNegotiate as boolean,
        isOnWarranty: toSelectedAdvertise.userAdvertise.isOnWarranty as boolean,
        category: this.editForm?.get('category')?.value,
        photos: this.defaultFileList,
        imagesToBeDelete: this.imagesToBeDeleted,
        paymentOption: parseInt(this.editForm?.get('paymentOption')?.value, 0),
        status: parseInt(this.editForm?.get('status')?.value, 0),
        district: toSelectedAdvertise.userAdvertise.advertise
          .district as string,
        city: toSelectedAdvertise.userAdvertise.advertise.city as string,
        price: parseInt(this.editForm?.get('price')?.value, 0),

        advertiseInfo: {
          color: this.editForm?.get('color')?.value,
          hint: this.editForm?.get('hint')?.value,
          description: this.editForm?.get('description')?.value,
          quantity: this.editForm?.get('quantity')?.value,
        },
      };
      const uniqueId = toSelectedAdvertise.userAdvertise.advertise
        .uniqueId as string;

      this.store.dispatch(fromAdvertise.editAdvertise({ uniqueId, advertise }));
    } else {
      console.log('didnt send update');
    }
  }
  isExist(id: string): boolean {
    return this.imagesToBeDeleted.findIndex((x) => x.id == id) >= 0;
  }
  addToDelete(id: string) {
    const imageIdx = this.imagesToBeDeleted.findIndex((x) => x.id == id);
    if (imageIdx >= 0) {
      this.imagesToBeDeleted.splice(imageIdx, 1);
    } else {
      this.imagesToBeDeleted = [...this.imagesToBeDeleted, { id }];
    }
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.defaultFileList = this.defaultFileList.concat(file);

    return false;
  };
}
export interface DeletingImages {
  id: string;
}
