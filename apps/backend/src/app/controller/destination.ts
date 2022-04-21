import { RequestHandler } from 'express';
import Destinations from '../model/destinationModel';

//create new destination
export const createDestination: RequestHandler = async (req, res) => {
  try {
    const destination = new Destinations(req.body);

    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update destination
export const updateDestination: RequestHandler = async (req, res) => {
  try {
    const destination = req.body;
    console.log(destination);
    const updatedDestination = await Destinations.findByIdAndUpdate(
      req.params.id,
      destination
    );
    res.status(200).json(updatedDestination);
  } catch (err) {
    res.status(500).json(err);
  }
};

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
  const reply = [
    {
      replyText: req.body.replyText,
      postedBy: user._id,
    },
  ];
  const review = {
    reviewRating: req.body.reviewRating,
    reviewText: req.body.reviewText,
    postedBy: user._id,
  };

  console.log(reply);
  await Destinations.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
      $set: { 'reviews.$.replies': reply },
      // 'reviews.replies': reply,
    },
    { new: true }
  )
    .then((res) => {
      return res.status(500).json(res);
    })
    .catch((err) => {
      return res.status(422).json(err);
    });
};

export const getDestinationById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await Destinations.findById(id)
    .populate('reviews.postedBy', '_id username')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

//delete destination
export const deleteDestination: RequestHandler = async (req, res) => {
  try {
    const destination = await Destinations.findByIdAndDelete(req.params.id);
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json(err);
  }
};
