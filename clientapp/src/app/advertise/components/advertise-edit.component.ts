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
  @Input() selectedAdvertise: IResponseAdvertise | undefined;
  editForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private store: Store<State>) {
    setTimeout(() => {
      this.editForm = this.fb.group({
        color: [
          this.selectedAdvertise?.userAdvertise.advertise.advertiseInfo.color,
          Validators.required,
        ],
        hint: [
          this.selectedAdvertise?.userAdvertise.advertise.advertiseInfo.hint,
          Validators.required,
        ],
        paymentOption: [
          this.selectedAdvertise?.userAdvertise.paymentOption,
          Validators.required,
        ],
        status: [
          this.selectedAdvertise?.userAdvertise.status,
          Validators.required,
        ],
        description: [
          this.selectedAdvertise?.userAdvertise.advertise.advertiseInfo
            .description,
          Validators.required,
        ],
        price: [
          this.selectedAdvertise?.userAdvertise.advertise.price,
          Validators.required,
        ],
        category: [
          this.selectedAdvertise?.userAdvertise.category,
          Validators.required,
        ],
        quantity: [
          this.selectedAdvertise?.userAdvertise.advertise.advertiseInfo
            .quantity,
          Validators.required,
        ],
      });
    }, 1);
  }

  submit(): void {
    const advertise: IEditAdvertise = {
      isNegotiate: this.selectedAdvertise?.userAdvertise.isNegotiate as boolean,
      isOnWarranty: this.selectedAdvertise?.userAdvertise
        .isOnWarranty as boolean,
      category: this.editForm?.get('category')?.value,
      paymentOption: parseInt(this.editForm?.get('paymentOption')?.value, 0),
      status: parseInt(this.editForm?.get('status')?.value, 0),
      district: this.selectedAdvertise?.userAdvertise.advertise
        .district as string,
      city: this.selectedAdvertise?.userAdvertise.advertise.city as string,
      price: parseInt(this.editForm?.get('price')?.value, 0),

      advertiseInfo: {
        color: this.editForm?.get('color')?.value,
        hint: this.editForm?.get('hint')?.value,
        description: this.editForm?.get('description')?.value,
        quantity: this.editForm?.get('quantity')?.value,
      },
    };
    const uniqueId = this.selectedAdvertise?.userAdvertise.advertise
      .uniqueId as string;

    this.store.dispatch(fromAdvertise.editAdvertise({ uniqueId, advertise }));
  }
}
