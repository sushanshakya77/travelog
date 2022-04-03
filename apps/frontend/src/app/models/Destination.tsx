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

interface IReview {
  _id: string;
  postedBy: IUser;
  reviewText: string;
}

interface IUser {
  _id: string;
  username: string;
}
