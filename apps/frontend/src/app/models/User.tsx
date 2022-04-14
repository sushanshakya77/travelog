import { IBaseMongoInterface } from './BaseMongoInterface';

export enum Roles {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
}

export interface IUser extends IBaseMongoInterface {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  currentCity: string;
  description: string;
  profilePicture: string;
  dob: string;
}
