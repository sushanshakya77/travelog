import { getAllPosts } from './../controller/post';
import * as express from 'express';
import multer = require('multer');
import {
  createPost,
  deletePost,
  getUserPosts,
  likePost,
  updatePost,
} from '../controller/post';
import * as fs from 'fs';
import { join } from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    fs.mkdirSync(join(__dirname, 'public/images/post/'), {
      recursive: true,
    });

    cb(null, join(__dirname, 'public/images/post/'));
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (_, file, cb) {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpeg'];

    if (allowedFileTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

//create a post
router.post('/', upload.single('img'), createPost);
//update a post

router.patch('/update/:id', updatePost);

router.get('/all', getAllPosts);

//delete a post

router.delete('/delete/:id', deletePost);
//like / dislike a post

router.put('/:id/like', likePost);
//get a post

//get user's all posts

router.get('/profile/:id', getUserPosts);

export default router;
