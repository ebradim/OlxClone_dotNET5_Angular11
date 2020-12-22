import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../auth/models/API';

@Injectable({ providedIn: 'root' })
export class TokenService {
  routes = {
    refresh: '/user/refresh',
  };
  constructor(private client: HttpClient) {}
  public refreshToken(): Observable<IUser> {
    const endpoint = environment.url + this.routes.refresh;
    return this.client.post<IUser>(endpoint, {}, { withCredentials: true });
  }
}
