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
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
