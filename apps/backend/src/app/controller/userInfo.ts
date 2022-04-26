import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
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

  const user = await User.findOne({ username }).select([
    'firstName',
    'lastName',
    'email',
    'username',
    'currentCity',
    'dob',
    'description',
    'profilePicture',
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

export const uploadProfile: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const image = `images/profilePicture/${req?.file?.filename}`;
    console.log(req.file.filename);
    const addProfile = await User.findByIdAndUpdate(req.params.id, {
      profilePicture: image,
    });

    return res.status(200).json('Profile Picture Uploaded');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//reset password
export const resetPassword: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (refreshTokenCheck) {
      const user = await User.findById(req.params.id);
      console.log(req.body);

      const isPasswordCorrect = await argon2.verify(
        user.password,
        req.body.oldPassword
      );

      if (isPasswordCorrect) {
        const hashedPassword = await argon2.hash(req.body.password, {
          hashLength: 40,
        });
        const user = await User.findByIdAndUpdate(req.params.id, {
          password: hashedPassword,
        });

        res.status(200).json(user);
      } else {
        res.status(400).json('Old password is incorrect');
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
