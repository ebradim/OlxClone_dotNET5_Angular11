export interface IGroupedAdvertise {
  category: string;
  advertiseResult: AdvertiseResult[];
}

export interface AdvertiseResult {
  uniqueId: string;
  title: string;
  hint: string;
  price: number;
  sellerName: string;
}
