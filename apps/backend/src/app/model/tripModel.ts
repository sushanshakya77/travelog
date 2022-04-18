import * as mongoose from 'mongoose';

export enum Status {
  'Private' = 'Private',
  'Public' = 'Public',
}

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.values(Status),
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    days: [
      {
        number: Number,
        title: String,
        description: String,
        destination: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubDestinations',
        },
      },
    ],
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
