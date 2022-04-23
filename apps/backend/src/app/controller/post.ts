import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import Post from '../model/postModel';
import * as express from 'express';

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = {
      caption: req.body.caption,
      destination: req.body.destination,
      postedBy: req.session.user._id,
    };

    const img = `images/post/${req.file.filename}`;

    const newPost = new Post({ ...data, img: img });
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

export const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText, postedBy } = req.body;
    const comment = {
      replyText,
      postedBy,
    };
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comment: comment } },
      { new: true }
    );
    res.status(200).json(updatedPost);
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
//get all posts
export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', '_id username firstName lastName profilePicture')
      .populate('destination', '_id title')
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//like and dislike post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.session.user;
    const post = await Post.findById(id);
    if (!post.likes.includes(user._id)) {
      await post.updateOne({ $push: { likes: user._id } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: user._id } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPostByUser = async (req, res) => {
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

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.id })
      .populate('postedBy', '_id username firstName lastName')
      .populate('destination', '_id title')
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};
