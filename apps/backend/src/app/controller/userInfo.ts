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
  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json('You are not authenticated');

  const refreshTokenCheck = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN as string
  );

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

  // compare with old password
  // argon2.verify(
  //   user.password,
  //   req.body.oldpassword,
  //   async function (err, resp) {
  //     console.log('is password changed');
  //     console.log(resp);
  //     if (err)
  //       return res.status(201).json({
  //         error_msg: 'Some error occured while checking old password',
  //       });
  //     // if old password is true
  //     if (resp == true) {
  //       //Encrypt user password
  //       const encryptedPassword = await argon2.hash(req.body.password);
  //       user.password = encryptedPassword;

  //       //save user new data
  //       user.save(function (err, user) {
  //         if (err) res.status(500).json({ error_msg: err.message });
  //         else
  //           res
  //             .status(201)
  //             .json({ success_msg: 'User Updated successfully!' });
  //       });
  //     } else
  //       res.status(200).json({ error_msg: 'Old Password did not match' });
  //   }
  // );
  // });
};
