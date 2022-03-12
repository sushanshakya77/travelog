import * as mongoose from 'mongoose';

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
    days: [
      {
        title: String,
        description: String,
        destination: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Destination',
        },
      },
    ],
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
