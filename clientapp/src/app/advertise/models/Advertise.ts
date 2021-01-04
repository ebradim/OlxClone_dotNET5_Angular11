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
interface IRoot {
  category: string;
  isNegotiate: boolean;
  isOnWarranty: boolean;
  paymentOption: number;
  status: number;
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
