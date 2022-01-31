import * as argon2 from 'argon2';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants/constants';
import User from '../model/userModel';

declare module 'express-session' {
  export interface Session {
    refreshToken: string;
    accessToken: string;
  }
}

export interface payloadData {
  username: string;
}

export const loginController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await argon2.verify(user.password, password))) {
      const accessToken = jwt.sign(
        { username: user.username },
        jwtConstants.ACCESS_TOKEN as string,
        {
          expiresIn: '20m',
        }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        jwtConstants.REFRESH_TOKEN as string,
        {
          expiresIn: '20m',
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
    const { firstName, lastName, phoneNumber, email, username, password } =
      req.body;
    console.log(username);
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res
        .status(403)
        .send('User Already Exist. Please Use a Different username');
    }

    const encryptedPassword = await argon2.hash(password);

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ username: user.username }, 'test', {
      expiresIn: '15m',
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
    expiresIn: '30d',
  });

  res.status(200).json({
    user,
    newToken,
  });
};

export const logoutController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  req.session.destroy((error) => {
    if (error) {
      console.log('this is error', error);
      return res.send(error);
    } else return res.json('Logged Out');
  });
};
