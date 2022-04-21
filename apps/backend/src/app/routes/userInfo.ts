import * as express from 'express';
import * as fs from 'fs';
import multer = require('multer');
import { join } from 'path';
import {
  getUserInfo,
  resetPassword,
  updateUserInfo,
  uploadProfile,
} from '../controller/userInfo';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    fs.mkdirSync(join(__dirname, 'public/images/profilePicture/'), {
      recursive: true,
    });

    cb(null, join(__dirname, 'public/images/profilePicture/'));
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

router.get('/', getUserInfo);
router.patch('/:id', updateUserInfo);
router.patch('/addProfile/:id', upload.single('profilePicture'), uploadProfile);
router.patch('/reset/:id', resetPassword);

export default router;
