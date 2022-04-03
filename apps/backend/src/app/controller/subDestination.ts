import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import { RequestHandler } from 'express';
import SubDestinations from '../model/subDestinationModel';

//create new destination
export const createSubDestination: RequestHandler = (req, res) => {
  try {
    const destination = new SubDestinations(req.body);

    const savedDestination = destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update destination
export const updateSubDestination: RequestHandler = (req, res) => {
  try {
    if (refreshTokenCheck) {
      const destination = req.body;
      const updatedDestination = SubDestinations.findByIdAndUpdate(
        req.params.id,
        destination,
        { new: true }
      );
      console.log(updatedDestination);
      res.status(200).json(updatedDestination);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSubDestination: RequestHandler = async (req, res) => {
  await SubDestinations.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

//update destination
export const reviewSubDestination: RequestHandler = async (req, res) => {
  const user = req.session.user;
  const review = {
    reviewText: req.body.reviews,
    postedBy: user._id,
  };
  console.log(review);
  await SubDestinations.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .then((res) => {
      return res.status(500).json(res);
    })
    .catch((err) => {
      return res.status(422).json(err);
    });
};

export const getSubDestinationById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await SubDestinations.findById(id)
    .populate('reviews.postedBy', '_id username')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
};
