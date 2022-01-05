import * as argon2 from 'argon2';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants/constants';
import User from '../model/Model';

declare module 'express-session' {
  export interface Session {
    refreshToken: string;
    accessToken: string;
  }
}

interface payloadData {
  username: string;
}

export const loginController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (user && (await argon2.verify(user.password, password))) {
      const accessToken = jwt.sign(
        { userName: user.userName },
        jwtConstants.ACCESS_TOKEN as string,
        {
          expiresIn: '1h',
        }
      );
      const refreshToken = jwt.sign(
        { userName: user.userName },
        jwtConstants.REFRESH_TOKEN as string,
        {
          expiresIn: '1h',
        }
      );
      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
      return res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
};

export const registerController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstName, lastName, phoneNumber, email, userName, password } =
      req.body;
    console.log(userName);
    const oldUser = await User.findOne({ userName });

    if (oldUser) {
      return res
        .status(403)
        .send('User Already Exist. Please Use a Different userName');
    }

    const encryptedPassword = await argon2.hash(password);

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
      password: encryptedPassword,
    });

    const token = jwt.sign({ userName: user.userName }, 'test', {
      expiresIn: '1hr',
    });

    res.status(201).send(token);
  } catch (err) {
    console.log(err);
  }
};

export const refreshTokenController: express.RequestHandler = async (
  req,
  res
) => {
  console.log(req.session);
  //take the refresh token from the user
  const refreshToken = req.session.refreshToken;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json('You are not authenticated!');

  const decoded = jwt.verify(
    refreshToken,
    jwtConstants.REFRESH_TOKEN as string
  );

  const username = (decoded as payloadData).username;

  const user = await User.findOne({ username });

  const newToken = jwt.sign({ username }, jwtConstants.ACCESS_TOKEN as string, {
    expiresIn: '1h',
  });

  res.status(200).json({
    user,
    newToken,
  });
};
