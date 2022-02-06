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
