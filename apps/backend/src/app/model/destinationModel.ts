import * as mongoose from 'mongoose';

const destinationsSchema = new mongoose.Schema({
  img: String,
  imgAlt: String,
  rating: Number,
  description: String,
  comments: {
    type: Array,
    default: [],
  },
});

const Destinations = mongoose.model('Destinations', destinationsSchema);

export default Destinations;
