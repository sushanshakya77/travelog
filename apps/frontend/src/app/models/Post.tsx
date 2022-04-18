import { IBaseMongoInterface } from './BaseMongoInterface';
import { IUser } from './User';

export interface IPost extends IBaseMongoInterface {
  caption: string;
  img: any;
  likes: number;
  destination: string;
  postedBy: IUser;
  replyText: string;
}
