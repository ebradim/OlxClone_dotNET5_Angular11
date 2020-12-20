import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromLoginActions } from '../actions';
import { ILogin } from '../models/Login';
import { AuthState, getErrorLogin, isLogging } from '../reducers';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'auth-login',
  templateUrl: '../templates/authlogin.template.html',
  styleUrls: ['../styles/authlogin.styles.scss'],
})
export class AuthLoginComponent {
  passwordVisible = false;
  loginForm: FormGroup;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
    this.error$ = this.store.pipe(select(getErrorLogin));
    this.loading$ = this.store.pipe(select(isLogging));
  }
  submit(): void {
    console.log(this.loginForm.value);
    const user = this.loginForm.value as ILogin;
    this.store.dispatch(fromLoginActions.login({ user }));
  }
}
