import * as express from 'express';
import {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
} from '../controller/userInfo';

const router = express.Router();

router.post('/', createUserInfo);
router.get('/', getUserInfo);
router.patch('/:id', updateUserInfo);

export default router;
