import * as mongoose from 'mongoose';

const destinationsSchema = new mongoose.Schema(
  {
    img: String,
    imgAlt: String,
    rating: Number,
    description: String,
    userRating: [
      {
        text: Number,
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
