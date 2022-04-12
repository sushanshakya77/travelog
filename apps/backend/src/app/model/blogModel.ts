import * as mongoose from 'mongoose';
export enum Categories {
  'Featured' = 'Featured',
  'Popular' = 'Popular',
}

const blogSchema = new mongoose.Schema(
  {
    title: String,
    img: String,
    description: String,
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
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
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
