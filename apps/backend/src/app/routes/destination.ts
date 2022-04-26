import * as express from 'express';
import {
  createDestination,
  deleteDestination,
  deleteReview,
  getDestination,
  getDestinationById,
  reviewDestination,
  updateDestination,
} from '../controller/destination';

const router = express.Router();

router.post('/', createDestination);
router.get('/', getDestination);
router.get('/:id', getDestinationById);
router.patch('/update/:id', updateDestination);
router.patch('/review/:id', reviewDestination);
router.patch('/review/delete/:id/:reviewId', deleteReview);
router.delete('/delete/:id', deleteDestination);

export default router;
