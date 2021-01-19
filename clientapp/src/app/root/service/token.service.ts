import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../auth/models/API';

@Injectable({ providedIn: 'root' })
export class TokenService {
  routes = {
    refresh: '/user/refresh',
    forgery: '/user/forgery',
  };
  constructor(private client: HttpClient) {}
  public refreshToken(): Observable<IUser> {
    const endpoint = environment.url + this.routes.refresh;
    return this.client.get<IUser>(endpoint, { withCredentials: true });
  }

  public getCSRFToken(): Observable<object> {
    const endpoint = environment.url + this.routes.forgery;
    return this.client.get(endpoint, { withCredentials: true });
  }
}
