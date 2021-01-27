import { IResponseHomeAdvertise } from 'src/app/advertise/models/Advertise';

export interface IFilterAdvertise extends IResponseHomeAdvertise {
  id: number;
}
export interface IResponseFilterAdvertise {
  lastId: string;
  advertises: IFilterAdvertise[];
}
