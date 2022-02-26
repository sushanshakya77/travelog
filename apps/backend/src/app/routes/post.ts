import * as express from 'express';
import {
  createPost,
  deletePost,
  getSinglePost,
  getTimelinePosts,
  getUserPosts,
  likePost,
  updatePost,
} from '../controller/post';

const router = express.Router();

//create a post
router.post('/', createPost);
//update a post

router.patch('/:id', updatePost);
//delete a post

router.delete('/:id', deletePost);
//like / dislike a post

router.patch('/:id/like', likePost);
//get a post

router.get('/:id', getSinglePost);

//get timeline posts

router.get('/timeline/:userId', getTimelinePosts);

//get user's all posts

router.get('/profile/:username', getUserPosts);

export default router;
