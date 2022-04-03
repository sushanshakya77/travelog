import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    caption: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
