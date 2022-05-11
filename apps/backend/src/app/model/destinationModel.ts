import * as mongoose from 'mongoose';
import { IUser } from './userModel';

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

const reviewSchema = new mongoose.Schema({
  reviewRating: { type: Number, required: true },
  reviewText: String,
  replies: [
    {
      replyText: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const destinationsSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    description: String,
    longitude: Number,
    latitude: Number,
    categories: { type: String },

    reviews: [reviewSchema],
    //   reviews: [
    //     {
    //       reviewRating: { type: Number, required: true },
    //       reviewText: String,
    //       replies: [
    //         {
    //           replyText: String,
    //           postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //         },
    //       ],
    //       postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     },
    //   ],
  },
  {
    timestamps: true,
  }
);

const Destinations = mongoose.model('Destinations', destinationsSchema);

export default Destinations;
