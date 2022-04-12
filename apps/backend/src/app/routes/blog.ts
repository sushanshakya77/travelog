import {
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByTags,
  getBlogsByUserId,
  reviewBlog,
  updateBlog,
} from './../controller/blog';
import * as express from 'express';
import { createBlog, getBlogsByUser } from '../controller/blog';

const router = express.Router();

router.post('/', createBlog);

//get user blogs
router.get('/all', getAllBlogs);

//update blog
router.patch('/update/:id', updateBlog);

//review blog
router.patch('/review/:id', reviewBlog);

router.get('/', getBlogsByUser);

//get blog by id
router.get('/:id', getBlogById);

//get blogs of users
router.get('/user/:id', getBlogsByUserId);

router.get('/tags/:tags', getBlogsByTags);

router.delete('/:id', deleteBlog);

export default router;
