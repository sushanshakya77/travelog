import * as express from 'express';
import Blog from '../model/blogModel';

export const createBlog: express.RequestHandler = async (req, res) => {
  try {
    const newBlog = new Blog({ ...req.body, postedBy: req.session.user._id });
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};
//update blog
export const updateBlog: express.RequestHandler = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllBlogs: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('postedBy', '_id name');
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getBlogsByUser: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ postedBy: req.session.user._id }).populate(
      'postedBy',
      '_id username'
    );
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getBlogById: express.RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate(
        'postedBy',
        '_id firstName lastName username description currentCity '
      )
      .populate('trip', ' _id title desc days')
      .populate('trip.days', ' _id title description ');
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get blogs by user id
export const getBlogsByUserId: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ postedBy: req.params.id });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};
