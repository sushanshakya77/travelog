import * as express from 'express';
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resetPasswordController,
} from '../controller/user';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/refreshtoken', refreshTokenController);
router.post('/forgotPassword', forgotPasswordController);
router.post('/resetPassword/:token', resetPasswordController);
router.post('/logout', logoutController);

export default router;
