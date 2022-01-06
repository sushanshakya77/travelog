import * as express from 'express';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../controller/user';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refreshtoken', refreshTokenController);
router.post('/logout', logoutController);

export default router;
