import { IBaseMongoInterface } from './BaseMongoInterface';
import { IDestination, IReview } from './Destination';
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
  tags: Tags[];
  reviews: IReview[];
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
