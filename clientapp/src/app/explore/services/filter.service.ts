import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseFilterAdvertise } from '../models/advertise';

@Injectable({ providedIn: 'root' })
export class FilterService {
  routes = {
    filter: '/advertise/filter',
  };
  constructor(private client: HttpClient) {}
  public filterHomeAds(): Observable<IResponseFilterAdvertise> {
    const endpoint = environment.url + this.routes.filter;
    return this.client.get<IResponseFilterAdvertise>(endpoint, {
      withCredentials: true,
    });
  }

  public filterHomeByIdAds(
    advertiseId: string
  ): Observable<IResponseFilterAdvertise> {
    const endpoint =
      environment.url + this.routes.filter + `?advertiseId=${advertiseId}`;
    return this.client.get<IResponseFilterAdvertise>(endpoint, {
      withCredentials: true,
    });
  }
  public filterCategoryAds(
    category: string | null
  ): Observable<IResponseFilterAdvertise> {
    const endpoint =
      environment.url + this.routes.filter + `?Category=${category}`;
    return this.client.get<IResponseFilterAdvertise>(endpoint, {
      withCredentials: true,
    });
  }
  public filterCategoryByIdAds(
    advertiseId: string,
    category: string
  ): Observable<IResponseFilterAdvertise> {
    const endpoint =
      environment.url +
      this.routes.filter +
      `?advertiseId=${advertiseId}&Category=${category}`;
    return this.client.get<IResponseFilterAdvertise>(endpoint, {
      withCredentials: true,
    });
  }
}
