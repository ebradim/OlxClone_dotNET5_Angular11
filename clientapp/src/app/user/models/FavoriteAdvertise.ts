export interface IFavoriteAdvertise {
  id: number;
  uniqueId: string;
  title: string;
  price: number;
  advertiseInfo: AdvertiseInfoDTO;
  user: User;
}

interface AdvertiseInfoDTO {
  hint: string;
}

interface User {
  firstName: string;
  lastName: string;
  userName: string;
}
