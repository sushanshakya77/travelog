import * as mongoose from 'mongoose';

const destinationsSchema = new mongoose.Schema({
  img: String,
  imgAlt: String,
  rating: Number,
  description: String,
  comments: String,
});

const Destinations = mongoose.model('Destinations', destinationsSchema);

export default Destinations;
