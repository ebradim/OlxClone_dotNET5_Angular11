import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { NzDirectionType } from 'ng-zorro-antd/steps';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
import { IAddAdvertise, PaymentOption } from '../models/Advertise';
import { AdvertiseState, getConnecting, getError } from '../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-advertise',
  templateUrl: '../templates/add-advertise.template.html',
  styleUrls: ['../styles/add-advertise.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAdvertiseComponent {
  createAdForm: FormGroup;
  stepsDirection: NzDirectionType = 'horizontal';
  current = 0;
  defaultFileList: NzUploadFile[] = [];
  isConnecting$: Observable<boolean>;
  apiError$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AdvertiseState>,
    private eventManager: EventManager,
    private detectionRef: ChangeDetectorRef
  ) {
    this.createAdForm = this.fb.group({
      isNegotiate: [false, Validators.required],
      isOnWarranty: [false, Validators.required],
      paymentOption: [PaymentOption.Cash, Validators.required],
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
    this.eventManager.addGlobalEventListener('window', 'resize', (e: Event) => {
      if ((e.target as Window).innerWidth < 800) {
        this.stepsDirection = 'vertical';
        this.detectionRef.markForCheck();
      } else {
        this.stepsDirection = 'horizontal';
        this.detectionRef.markForCheck();
      }
    });
    this.isConnecting$ = this.store.pipe(select(getConnecting));
    this.apiError$ = this.store.pipe(select(getError));
  }
  onSubmit(): void {
    // const advertise = this.createAdForm.value as IAddAdvertise;
    // console.log(advertise);
    // this.store.dispatch(fromAdvertise.addAdvertise({ advertise }));
  }
  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.defaultFileList = this.defaultFileList.concat(file);

    return false;
  };
  handleUpload(): void {
    var advertise = {
      ...this.createAdForm.value,
      photos: this.defaultFileList,
    };

    this.store.dispatch(fromAdvertise.addAdvertise({ advertise }));
  }
}
