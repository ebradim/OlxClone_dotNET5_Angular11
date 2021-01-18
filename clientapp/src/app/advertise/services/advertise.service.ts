import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupedAdvertise } from 'src/app/root/home/models/SearchAdvertise';
import { environment } from 'src/environments/environment';
import { DeletingImages } from '../components/advertise-edit.component';
import {
  IAddAdvertise,
  IEditAdvertise,
  IResponseAdvertise,
  IResponseHomeAdvertise,
} from '../models/Advertise';

@Injectable({ providedIn: 'root' })
export class AdvertiseService {
  routes = {
    loadHome: '/advertise/load',
    addAdvertise: '/advertise/add',
    root: '/advertise/',
    fav: '/advertise/fav/',
    search: '/advertise/search/',
    like: '/advertise/like/',
  };
  lastTimeUpdate = 0;
  constructor(private client: HttpClient) {}
  public loadHomeAds(): Observable<IResponseHomeAdvertise[]> {
    const endpoint = environment.url + this.routes.loadHome;
    return this.client.get<IResponseHomeAdvertise[]>(endpoint, {
      withCredentials: true,
    });
  }

  public addAdvetise(advertise: IAddAdvertise): Observable<IResponseAdvertise> {
    const formData = new FormData();
    advertise.photos.forEach((file: any) => {
      formData.append('Photos', file);
    });
    formData.append('IsNegotiate', `${advertise.isNegotiate}`);
    formData.append('IsOnWarranty', `${advertise.isOnWarranty}`);
    formData.append('PaymentOption', `${advertise.paymentOption}`);
    formData.append('Title', advertise.title);
    formData.append('Category', advertise.category);
    formData.append('District', advertise.district);
    formData.append('City', advertise.city);
    formData.append('Price', `${advertise.price}`);
    formData.append('AdvertiseInfo[Color]', advertise.advertiseInfo.color);
    formData.append('AdvertiseInfo[Hint]', advertise.advertiseInfo.hint);
    formData.append(
      'AdvertiseInfo[Quantity]',
      `${advertise.advertiseInfo.quantity}`
    );
    formData.append(
      'AdvertiseInfo[Description]',
      advertise.advertiseInfo.description
    );
    const endpoint = environment.url + this.routes.addAdvertise;
    return this.client.post<IResponseAdvertise>(endpoint, formData, {
      withCredentials: true,
    });
  }

  public getAdvetise(id: string): Observable<IResponseAdvertise> {
    const endpoint = environment.url + this.routes.root + id;
    return this.client.get<IResponseAdvertise>(endpoint, {
      withCredentials: true,
    });
  }

  public deleteAdvetise(id: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.root + id;
    return this.client.delete<boolean>(endpoint, {
      withCredentials: true,
    });
  }

  public editAdvetise(
    uniqueId: string,
    advertise: IEditAdvertise
  ): Observable<IResponseAdvertise> {
    const formData = new FormData();
    advertise.photos.forEach((file: any) => {
      formData.append('Photos', file);
    });
    advertise.imagesToBeDelete.forEach((file: DeletingImages) => {
      formData.append('DeletingImages', file.id);
    });
    formData.append('IsNegotiate', `${advertise.isNegotiate}`);
    formData.append('IsOnWarranty', `${advertise.isOnWarranty}`);
    formData.append('PaymentOption', `${advertise.paymentOption}`);
    formData.append('Status', `${advertise.status}`);
    formData.append('Category', advertise.category);
    formData.append('District', advertise.district);
    formData.append('City', advertise.city);
    formData.append('Price', `${advertise.price}`);
    formData.append('AdvertiseInfo[Color]', advertise.advertiseInfo.color);
    formData.append('AdvertiseInfo[Hint]', advertise.advertiseInfo.hint);
    formData.append(
      'AdvertiseInfo[Quantity]',
      `${advertise.advertiseInfo.quantity}`
    );
    formData.append(
      'AdvertiseInfo[Description]',
      advertise.advertiseInfo.description
    );
    const endpoint = environment.url + this.routes.root + uniqueId;
    return this.client.put<IResponseAdvertise>(endpoint, formData, {
      withCredentials: true,
    });
  }

  public addAdvetiseToFavorite(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.fav + uniqueId;
    return this.client.post<boolean>(
      endpoint,
      {},
      {
        withCredentials: true,
      }
    );
  }

  public removeAdvetiseFromFavorite(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.fav + uniqueId;
    return this.client.delete<boolean>(endpoint, {
      withCredentials: true,
    });
  }

  public searchForAdvertise(term: string): Observable<IGroupedAdvertise[]> {
    const endpoint = environment.url + this.routes.search + term;
    return this.client.get<IGroupedAdvertise[]>(endpoint, {
      withCredentials: true,
    });
  }

  public likeAdvertise(uniqueId: string): Observable<boolean> {
    const endpoint = environment.url + this.routes.like + uniqueId;
    return this.client.post<boolean>(
      endpoint,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
