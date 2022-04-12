import * as mongoose from 'mongoose';

const subDestinationsSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    description: String,
    longitude: Number,
    latitude: Number,
    categories: { type: String },
    parentDestination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destinations',
    },
    reviews: [
      {
        reviewRating: Number,
        reviewText: String,
        replies: [
          {
            replyText: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
        ],
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
