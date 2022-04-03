import * as express from 'express';
import {
  createSubDestination,
  getSubDestination,
  getSubDestinationById,
  reviewSubDestination,
  updateSubDestination,
} from '../controller/subDestination';

const router = express.Router();

router.post('/', createSubDestination);
router.get('/', getSubDestination);
router.get('/:id', getSubDestinationById);
router.patch('/update/:id', updateSubDestination);
router.patch('/review/:id', reviewSubDestination);

export default router;
