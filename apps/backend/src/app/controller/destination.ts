import { RequestHandler } from 'express';
import Destinations from '../model/destinationModel';

export const getDestination: RequestHandler = async (req, res) => {
  await Destinations.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

//update destination
export const reviewDestination: RequestHandler = async (req, res) => {
  const user = req.session.user;
  const review = {
    reviewText: req.body.reviews,
    postedBy: user._id,
  };
  console.log(review);
  await Destinations.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .populate('reviews.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json(err);
      } else {
        res.json(result);
      }
    });
};

export const getDestinationById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await Destinations.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
};
