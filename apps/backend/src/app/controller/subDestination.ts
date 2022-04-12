import { refreshTokenCheck } from './../../../../../libs/refresh-token-verify';
import { RequestHandler } from 'express';
import SubDestinations from '../model/subDestinationModel';

//create new destination
export const createSubDestination: RequestHandler = async (req, res) => {
  try {
    const destination = new SubDestinations(req.body);

    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update destination
export const updateSubDestination: RequestHandler = async (req, res) => {
  try {
    if (refreshTokenCheck) {
      const destination = req.body;
      const updatedDestination = await SubDestinations.findByIdAndUpdate(
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
    .populate('parentDestination', '_id title')
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

  console.log(req.body);
  await SubDestinations.findByIdAndUpdate(req.params.id, {
    reviews: review,
    // 'reviews.replies': reply,
  })
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

export const deleteSubDestination: RequestHandler = async (req, res) => {
  try {
    const destination = await SubDestinations.findByIdAndDelete(req.params.id);
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json(err);
  }
};
