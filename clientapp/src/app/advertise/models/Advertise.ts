import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DeletingImages } from '../components/advertise-edit.component';

export interface IResponseAdvertise {
  userAdvertise: IRoot;
}

export interface IAddAdvertise {
  isNegotiate: boolean;
  isOnWarranty: boolean;
  paymentOption: PaymentOption;
  title: string;
  category: string;
  district: string;
  city: string;
  price: number;
  advertiseInfo: AdvertiseInfo;
  photos: NzUploadFile[];
}

interface AdvertiseInfo {
  color: string;
  description: string;
  hint: string;
  quantity: number;
}
enum Status {
  Pending = 0,
  Sold = 1,
}
export enum PaymentOption {
  Cash = 0,
  Exchange = 1,
}
export interface IRoot {
  category: string;
  isNegotiate: boolean;
  isOnWarranty: boolean;
  paymentOption: number;
  status: number;
  isFavorite: boolean;
  isLiked: boolean;
  likes: number;
  advertise: IAdvertise;
  user: User;
  photos: IPhotos[];
}
interface IPhotos {
  id: string;
  url: string;
}
interface IAdvertise {
  id: number;
  uniqueId: string;
  title: string;
  district: string;
  city: string;
  price: number;
  publishedAt: Date;
  advertiseInfo: IAdvertiseInfo;
}

interface IAdvertiseInfo {
  color: string;
  description: string;
  hint: string;
  quantity: number;
}

interface User {
  firstName: string;
  lastName: string;
  userName: string;
}
export interface IEditAdvertise extends Omit<IAddAdvertise, 'title'> {
  status: number;
  imagesToBeDelete: DeletingImages[];
}

export interface IResponseHomeAdvertise {
  userAdvertise: IHomeAdvertise;
}
export interface IHomeAdvertise
  extends Omit<IAdvertise, 'id' | 'publishedAt' | 'advertiseInfo'> {
  advertiseInfo: IHomeAdvertiseInfo;
  user: User;
  imageUrl: string;
}

interface IHomeAdvertiseInfo extends Pick<IAdvertiseInfo, 'hint'> {}
