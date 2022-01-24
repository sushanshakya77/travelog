import * as express from 'express';
import { getUserInfo, updateUserInfo } from '../controller/userInfo';

const router = express.Router();

router.get('/', getUserInfo);
router.patch('/:id', updateUserInfo);

export default router;
