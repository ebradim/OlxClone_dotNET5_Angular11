import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/Login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/API';
@Injectable({ providedIn: 'root' })
export class AuthService {
  routes = {
    login: '/user/login',
  };
  constructor(private client: HttpClient) {}

  public login(user: ILogin): Observable<IUser> {
    const endpoint = environment.url + this.routes.login;
    return this.client.post<IUser>(endpoint, user);
  }
}
