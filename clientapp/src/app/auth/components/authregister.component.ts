import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, ObservableInput, of } from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';
import { fromRegisterActions } from '../actions';
import { IRegister } from '../models/Register';
import { AuthState, getErrorRegister, isRegistering } from '../reducers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'auth-register',
  templateUrl: '../templates/authregister.template.html',
  styleUrls: ['../styles/authregister.styles.scss'],
})
export class AuthRegisterComponent {
  registerForm: FormGroup;
  passwordVisible = false;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.registerForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z]([a-zA-z0-9_]){5,18}$'),
        ],
      ],
      firstName: [
        '',
        [Validators.pattern('^[A-Z]([a-z]){2,10}$'), Validators.required],
      ],
      lastName: [
        '',
        [Validators.pattern('^[A-Z]([a-z]){2,10}$'), Validators.required],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [this.validateConfirmPassword, Validators.minLength(6)]],
      checked: [false, Validators.requiredTrue],
    });
    this.error$ = this.store.pipe(select(getErrorRegister));
    this.loading$ = this.store.pipe(select(isRegistering));
  }
  submit(): void {
    for (const key in this.registerForm.controls) {
      if (
        Object.prototype.hasOwnProperty.call(this.registerForm.controls, key)
      ) {
        this.registerForm.controls[key].markAsTouched();
        this.registerForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.registerForm.valid) {
      const user = this.registerForm.value as IRegister;
      this.store.dispatch(fromRegisterActions.register({ user }));
    }
  }
  validateConfirmPassword = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (!control?.value) {
      return { required: true, error: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  matchPassword(): void {
    this.registerForm.controls.confirm.updateValueAndValidity();
  }
}
