import * as mongoose from 'mongoose';

const destinationsSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    description: String,
    longitude: Number,
    latitude: Number,
    categories: { type: String },
    userRating: [
      {
        rate: Number,
        ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    reviews: [
      {
        reviewText: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Destinations = mongoose.model('Destinations', destinationsSchema);

export default Destinations;
