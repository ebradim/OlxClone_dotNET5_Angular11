import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
import { IAddAdvertise, PaymentOption } from '../models/Advertise';
import { AdvertiseState } from '../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-advertise',
  templateUrl: '../templates/add-advertise.template.html',
  styleUrls: ['../styles/add-advertise.style.scss'],
})
export class AddAdvertiseComponent {
  createAdForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AdvertiseState>) {
    this.createAdForm = this.fb.group({
      isNegotiate: [false, Validators.required],
      isOnWarranty: [false, Validators.required],
      paymentOptions: [PaymentOption.Cash, Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      price: [, Validators.required],
      advertiseInfo: this.fb.group({
        color: ['', Validators.required],
        description: ['', Validators.required],
        hint: ['', Validators.required],
        quantity: [, Validators.required],
      }),
    });
  }
  onSubmit(): void {
    const advertise = this.createAdForm.value as IAddAdvertise;
    console.log(advertise);
    this.store.dispatch(fromAdvertise.addAdvertise({ advertise }));
  }
}
