import * as jwt from 'jsonwebtoken';
import * as express from 'express';

export const refreshTokenCheck = async (req, res) => {
  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json('You are not authenticated');

  const refreshTokenCheck = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN as string
  );
  return refreshTokenCheck;
};
