import { IBaseMongoInterface } from './BaseMongoInterface';
import { IDestination } from './Destination';
import { IUser } from './User';

export interface IPost extends IBaseMongoInterface {
  caption: string;
  img: any;
  likes: [];
  destination: IDestination;
  postedBy: IUser;
  replyText: string;
}
