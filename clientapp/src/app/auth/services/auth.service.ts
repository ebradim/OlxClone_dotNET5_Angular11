import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/Login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/API';
import { IRegister } from '../models/Register';
@Injectable({ providedIn: 'root' })
export class AuthService {
  routes = {
    login: '/user/login',
    register: '/user/register',
    logout: '/user/logout',
  };
  constructor(private client: HttpClient) {}

  public login(user: ILogin): Observable<IUser> {
    const endpoint = environment.url + this.routes.login;
    return this.client.post<IUser>(endpoint, user);
  }

  public register(user: IRegister): Observable<IUser> {
    const endpoint = environment.url + this.routes.register;
    return this.client.post<IUser>(endpoint, user);
  }
  public logout(): Observable<boolean> {
    const endpoint = environment.url + this.routes.logout;
    return this.client.post<boolean>(endpoint, {});
  }
}
