import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../model/userModel';
import { payloadData } from './user';
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

  // find user in db
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
