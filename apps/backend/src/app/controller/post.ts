import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import Post from '../model/postModel';
import User from '../model/userModel';

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (refreshTokenCheck) {
      await Post.findByIdAndUpdate(id, req.body)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (refreshTokenCheck) {
      await Post.findByIdAndDelete(id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//component to like and dislike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(id);
    if (refreshTokenCheck) {
      if (user.likedPosts.includes(id)) {
        user.likedPosts.splice(user.likedPosts.indexOf(id), 1);
        post.likes--;
      } else {
        user.likedPosts.push(id);
        post.likes++;
      }
      await user.save();
      await post.save();
      res.json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    await Post.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
