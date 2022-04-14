import * as express from 'express';
import {
  createUserInfo,
  getUserInfo,
  resetPassword,
  updateUserInfo,
} from '../controller/userInfo';

const router = express.Router();

router.post('/', createUserInfo);
router.get('/', getUserInfo);
router.patch('/:id', updateUserInfo);
router.patch('/reset/:id', resetPassword);

export default router;
