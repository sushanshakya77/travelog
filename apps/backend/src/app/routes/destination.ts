import * as express from 'express';
import {
  getDestination,
  getDestinationById,
  reviewDestination,
} from '../controller/destination';

const router = express.Router();

router.get('/', getDestination);
router.get('/:id', getDestinationById);
router.patch('/review/:id', reviewDestination);

export default router;
