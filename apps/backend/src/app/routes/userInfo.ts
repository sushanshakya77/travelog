import * as express from 'express';
import * as fs from 'fs';
import multer = require('multer');
import path = require('path');
import {
  getUserInfo,
  resetPassword,
  updateUserInfo,
  uploadProfile,
} from '../controller/userInfo';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    fs.mkdirSync('apps/backend/public/images/profilePicture/', {
      recursive: true,
    });

    cb(null, 'apps/backend/public/images/profilePicture/');
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

router.get('/', getUserInfo);
router.patch('/:id', updateUserInfo);
router.patch('/addProfile/:id', upload.single('profile'), uploadProfile);
router.patch('/reset/:id', resetPassword);

export default router;
