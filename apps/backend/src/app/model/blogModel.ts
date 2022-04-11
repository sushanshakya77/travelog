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
        reviewText: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    categories: { type: String, enum: ['Featured', 'Popular'] },
    tags: {
      type: String,
      enum: [
        'food',
        'travel',
        'health',
        'fashion',
        'technology',
        'sports',
        'entertainment',
        'lifestyle',
        'others',
      ],
    },
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
