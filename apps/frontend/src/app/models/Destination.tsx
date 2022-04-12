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

interface IUser {
  _id: string;
  username: string;
}
