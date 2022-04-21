import * as mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewRating: Number,
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
  },
  {
    timestamps: true,
  }
);

const Destinations = mongoose.model('Destinations', destinationsSchema);

export default Destinations;
