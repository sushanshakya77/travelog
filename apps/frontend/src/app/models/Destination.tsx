import { IUser } from './User';

export interface IDestination {
  _id: string;
  img: string;
  title: string;
  rating: number;
  description: string;
  categories: string;
  longitude: number;
  latitude: number;
  reviews: IReview[];
}
export interface ISubDestination {
  _id: string;
  img: string;
  title: string;
  rating: number;
  description: string;
  parentDestination: IDestination;
  categories: string;
  longitude: number;
  latitude: number;
  reviews: IReview[];
}

export interface IReview {
  rating: any;
  _id: string;
  postedBy: IUser;
  reviewRating: number | null;
  reviewText: string;
  replies: IReply[];
}

export interface IReply {
  _id: string;
  postedBy: IUser;
  replyText: string;
}
