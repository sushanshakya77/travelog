import * as express from 'express';
import {
  loginController,
  refreshTokenController,
  registerController,
} from '../controller/user';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refreshtoken', refreshTokenController);

export default router;
