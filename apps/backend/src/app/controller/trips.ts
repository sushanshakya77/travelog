import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import { RequestHandler } from 'express';
import Trip from '../model/tripModel';
import { payloadData } from './user';
import * as jwt from 'jsonwebtoken';

export const createTrip: RequestHandler = async (req, res) => {
  if (refreshTokenCheck) {
    const newTrip = new Trip(req.body);
    try {
      const savedTrip = await newTrip.save();
      res.status(200).json(savedTrip);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//get all trips
export const getAllTrips: RequestHandler = async (req, res) => {
  // if (refreshTokenCheck) {
  //   try {
  //     const allTrips = await Trip.find();
  //     res.status(200).json(allTrips);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json('You are not authenticated');

  // verify old refreshToken
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as string);
  const username = (decoded as payloadData).username;
  console.log(username);

  // find user in db
  const trip = await Trip.findOne({ username }).select([
    'title',
    'desc',
    'img',
  ]);
  console.log(trip);
  return res.status(200).json(trip);
};
