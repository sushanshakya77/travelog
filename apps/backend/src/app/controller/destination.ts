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

//update review
export const updateReview: RequestHandler = async (req, res) => {
  try {
    const { user } = req.session;
    const reviewid = req.params.id;
    const reply = [
      {
        replyText: req.body.replyText,
        postedBy: user._id,
      },
    ];

    const updateReview = await Destinations.findOneAndUpdate(
      { 'reviews._id': reviewid },
      { $push: { 'reviews.$.replies': reply } }
    );

    // const updateReview = await findReview.update({ replies: replies });
    return res.status(200).json(updateReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update destination
export const reviewDestination: RequestHandler = async (req, res) => {
  const user = req.session.user;

  const review = {
    reviewRating: req.body.reviewRating,
    reviewText: req.body.reviewText,
    postedBy: user._id,
  };

  await Destinations.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
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

export const deleteReview: RequestHandler = async (req, res) => {
  await Destinations.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { reviews: { _id: req.params.reviewId } },
    },
    { new: true }
  )
    .then((res) => {
      return res.status(200).json(res);
    })
    .catch((err) => {
      return res.status(422).json(err);
    });
};

export const getDestinationById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await Destinations.findById(id)
    .populate('reviews.postedBy', '_id username profilePicture')
    .populate('reviews.replies.postedBy', '_id username profilePicture')
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
