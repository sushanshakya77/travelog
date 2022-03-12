import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    caption: {
      type: String,
      max: 500,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
