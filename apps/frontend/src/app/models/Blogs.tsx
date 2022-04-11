import { IBaseMongoInterface } from './BaseMongoInterface';
import { IDestination } from './Destination';
import { IUser } from './User';
import { ITrip } from './Trips';

export interface IBlog extends IBaseMongoInterface {
  title: string;
  description: string;
  image: string;
  postedBy: IUser;
  categories: Categories;
  destination: IDestination;
  trip: ITrip;
}
export enum Categories {
  'Featured' = 'Featured',
  'Popular' = 'Popular',
}
