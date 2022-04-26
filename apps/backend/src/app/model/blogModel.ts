import * as mongoose from 'mongoose';
import { Status } from './tripModel';
export enum Categories {
  'Featured' = 'Featured',
  'Popular' = 'Popular',
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [
      {
        reviewRating: Number,
        reviewText: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    categories: { type: String, enum: ['Featured', 'Popular'] },
    tags: [
      {
        type: String,
        enum: [
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
        ],
      },
    ],
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubDestinations',
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
