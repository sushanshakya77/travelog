import * as express from 'express';
import Blog from '../model/blogModel';
import Destinations from '../model/destinationModel';
import SubDestinations from '../model/subDestinationModel';
import { Status } from '../model/tripModel';

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
    const blogs = await Blog.find().populate(
      'postedBy',
      '_id username profilePicture'
    );
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getBlogsByUser: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ postedBy: req.session.user._id }).populate(
      'postedBy',
      '_id username profilePicture'
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
        '_id firstName lastName username description currentCity profilePicture '
      )
      .populate('reviews.postedBy', '_id username profilePicture')
      .populate('trip', ' _id title desc days')
      .populate('trip.days', ' _id title description ');
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getBlogsByUserId: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ postedBy: req.params.id });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};
//review blog
export const reviewBlog: express.RequestHandler = async (req, res) => {
  const user = req.session.user;
  const review = {
    reviewRating: req.body.reviewRating,
    reviewText: req.body.reviewText,
    postedBy: user._id,
  };
  console.log(req.body);
  await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .then((res) => {
      return res.status(500).json(res);
    })
    .catch((err) => {
      return res.status(422).json(err);
    });
};

export const deleteBlog: express.RequestHandler = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllBlogsByDestinationId: express.RequestHandler = async (
  req,
  res
) => {
  try {
    const destination = SubDestinations.findById(req.params.id).select(
      'parentDestination'
    );
    const parentDestination = Destinations.findById(destination).select('_id');
    console.log(parentDestination);
    const blogs = await Blog.find({
      destination: req.params.id,
      status: Status.Public,
    }).populate('postedBy', '_id username profilePicture');
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getAllBlogsBy: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({
      destination: req.params.id,
      status: Status.Public,
    });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get blogs by tags
export const getBlogsByTags: express.RequestHandler = async (req, res) => {
  try {
    const blogs = await Blog.find({ tags: req.params.tags }).populate(
      'postedBy',
      '_id username'
    );

    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};
