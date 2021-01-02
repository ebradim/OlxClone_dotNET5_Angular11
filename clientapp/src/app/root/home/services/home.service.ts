import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHomeAdvertises } from '../models/Advertise';

@Injectable({ providedIn: 'root' })
export class HomeService {
  routes = {
    loadHome: '/advertise/load',
  };
  lastTimeUpdate = 0;
  constructor(private client: HttpClient) {}
  public loadHomeAds(): Observable<IHomeAdvertises[]> {
    const endpoint = environment.url + this.routes.loadHome;
    return this.client.get<IHomeAdvertises[]>(endpoint, {
      withCredentials: true,
    });
  }
}
