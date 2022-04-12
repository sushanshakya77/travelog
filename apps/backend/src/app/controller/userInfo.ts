import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import User from '../model/userModel';
import { IUser, payloadData } from './user';
// import * as argon2 from 'argon2';

export const getUserInfo: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json('You are not authenticated');

  // verify old refreshToken
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as string);
  const username = (decoded as payloadData).username;

  const user = await User.findOne({ username }).select([
    'firstName',
    'lastName',
    'email',
    'username',
    'currentCity',
    'description',
    'createdAt',
  ]);
  return res.status(200).json(user);
};

export const updateUserInfo: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  if (refreshTokenCheck) {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

//create a new user
export const createUserInfo: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { profilePicture } = new User(req.body);
    console.log(profilePicture);
    if (refreshTokenCheck) {
      // await profilePicture.save();
      res.status(201).json(profilePicture);
    }
  } catch (err) {
    console.log(err);
  }
};

//reset password
export const resetPassword: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = req.session.user as IUser;
    console.log(req.body);

    const isPasswordCorrect = await argon2.verify(
      user.password,
      req.body.oldPassword
    );

    if (isPasswordCorrect) {
      const hashedPassword = await argon2.hash(req.body.password, {
        hashLength: 40,
      });
      const user = await User.create({
        password: hashedPassword,
      });

      res.status(200).json(user);
    } else {
      res.status(400).json('Old password is incorrect');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
