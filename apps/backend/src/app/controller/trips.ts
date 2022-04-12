import { RequestHandler } from 'express';
import Trip, { Status } from '../model/tripModel';
import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';

export const createTrip: RequestHandler = async (req, res) => {
  if (refreshTokenCheck) {
    // const newTrip = new Trip(req.body);
    const user = req.session.user;
    try {
      const savedTrip = new Trip({
        postedBy: user._id,
        ...req.body,
      });
      savedTrip.save();
      res.status(200).json(savedTrip);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const getTripById: RequestHandler = async (req, res) => {
  if (refreshTokenCheck) {
    try {
      const trip = await Trip.findById(req.params.id);
      // .populate(
      //   'days.destination',
      //   'longitude latitude'
      // );
      res.status(200).json(trip);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const getUserTrips: RequestHandler = async (req, res) => {
  if (refreshTokenCheck) {
    Trip.find({ postedBy: req.params.id })
      .populate('postedBy', '_id name')
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//update a trip
export const updateTrip: RequestHandler = async (req, res) => {
  if (refreshTokenCheck) {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTrip);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//delete a trip
export const deleteTrip: RequestHandler = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTripsByDestination: RequestHandler = async (req, res) => {
  try {
    const trips = await Trip.find({
      destination: req.params.id,
      status: Status.Public,
    });
    console.log(trips);
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};
