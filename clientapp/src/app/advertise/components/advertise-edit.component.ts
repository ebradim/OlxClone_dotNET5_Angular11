import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromAdvertise } from '../actions';
import {
  IAddAdvertise,
  IEditAdvertise,
  IResponseAdvertise,
} from '../models/Advertise';
import { State } from '../reducers/advertise.reducer';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'advertie-edit',
  templateUrl: '../templates/advertise-edit.template.html',
  styleUrls: ['../styles/advertise-edit.style.scss'],
})
export class AdvertiseEditComponent {
  @Input() selectedAdvertise: '' | IResponseAdvertise | null | undefined;
  editForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private store: Store<State>) {
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
    }, 1);
  }

  submit(): void {
    const toSelectedAdvertise = this.selectedAdvertise as IResponseAdvertise;

    const advertise: IEditAdvertise = {
      isNegotiate: toSelectedAdvertise.userAdvertise.isNegotiate as boolean,
      isOnWarranty: toSelectedAdvertise.userAdvertise.isOnWarranty as boolean,
      category: this.editForm?.get('category')?.value,
      paymentOption: parseInt(this.editForm?.get('paymentOption')?.value, 0),
      status: parseInt(this.editForm?.get('status')?.value, 0),
      district: toSelectedAdvertise.userAdvertise.advertise.district as string,
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
  }
}
