import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../auth/models/API';

@Injectable({ providedIn: 'root' })
export class TokenService {
  routes = {
    refresh: '/user/refresh',
    xtoken: '/user/refresh',
  };
  constructor(private client: HttpClient) {}
  public refreshToken(): Observable<IUser> {
    const endpoint = environment.url + this.routes.refresh;
    return this.client.get<IUser>(endpoint, { withCredentials: true });
  }

  public getXToken(): Observable<object> {
    const endpoint = environment.url + this.routes.xtoken;
    return this.client.get(endpoint, { withCredentials: true });
  }
}
