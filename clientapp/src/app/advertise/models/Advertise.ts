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
}

export interface IResponseHomeAdvertise {
  userAdvertise: IHomeAdvertise;
}
interface IHomeAdvertise
  extends Omit<IAdvertise, 'id' | 'publishedAt' | 'advertiseInfo'> {
  advertiseInfo: IHomeAdvertiseInfo;
  user: User;
}

interface IHomeAdvertiseInfo extends Pick<IAdvertiseInfo, 'hint'> {}
