import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/travelog', () => {
  console.log('connected to db');
});
