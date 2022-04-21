import { IBaseMongoInterface } from './BaseMongoInterface';
import { IDestination, IReview } from './Destination';
import { IUser } from './User';
import { ITrip, Status } from './Trips';

export interface IBlog extends IBaseMongoInterface {
  title: string;
  description: string;
  img: string;
  postedBy: IUser;
  categories: Categories;
  destination: IDestination;
  trip: ITrip;
  tags: Tags[];
  reviews: IReview[];
  status: Status;
}
export enum Categories {
  'Featured' = 'Featured',
  'Popular' = 'Popular',
}

export enum Tags {
  'Art',
  'Design',
  'Tech',
  'Trekking',
  'Hiking',
  'Dance',
  'Lift',
  'Bike',
  'Climb',
  'Camping',
  'Adventure',
  'Nature',
  'Food',
  'Travel',
  'Photography',
  'Music',
}
