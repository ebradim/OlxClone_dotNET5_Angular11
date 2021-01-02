export interface IHomeAdvertises {
  advertise: IRoot;
}

interface IRoot {
  category: string;
  isNegotiate: boolean;
  isOnWarranty: boolean;
  paymentOption: number;
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
