import * as mongoose from 'mongoose';

const subDestinationsSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    description: String,
    longitute: Number,
    latitude: Number,
    categories: String,
    parentDestination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destinations',
    },
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

const SubDestinations = mongoose.model(
  'SubDestinations',
  subDestinationsSchema
);

export default SubDestinations;
