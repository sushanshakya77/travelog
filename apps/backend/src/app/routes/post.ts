import { getAllPosts } from './../controller/post';
import * as express from 'express';
import multer = require('multer');
import path = require('path');
import {
  createPost,
  deletePost,
  getSinglePost,
  getTimelinePosts,
  getUserPosts,
  likePost,
  updatePost,
} from '../controller/post';
import * as fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    fs.mkdirSync(`apps/backend/images/post/`, {
      recursive: true,
    });

    cb(null, 'apps/backend/images/post/');
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (_, file, cb) {
    const regex = new RegExp(/\.(gif|jpe?g|jpg|tiff?|png|webp|bmp)$/i);
    const ext = path.extname(file.originalname);

    if (regex.test(ext)) {
      return cb(null, true);
    }
    return cb(new Error('Only images with jpeg/png/gif/webp/bmp allowed'));
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, __, cb) {
//     cb(null, `./public/images`);
//   },
//   filename: function (_, file, cb) {
//     cb(
//       null,
//       uuidv4() + '-' + Date.now() + '-' + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (_, file, cb) {
//     const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpeg'];

//     if (allowedFileTypes.includes(file.mimetype)) {
//       return cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// });

//create a post
router.post('/', upload.single('img'), createPost);
//update a post

router.patch('/update/:id', updatePost);

router.get('/all', getAllPosts);

//delete a post

router.delete('/delete/:id', deletePost);
//like / dislike a post

router.patch('/:id/like', likePost);
//get a post

router.get('/:id', getSinglePost);

//get timeline posts

router.get('/timeline/:userId', getTimelinePosts);

//get user's all posts

router.get('/profile/:username', getUserPosts);

export default router;
