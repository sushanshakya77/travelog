import * as express from 'express';
import {
  createSubDestination,
  deleteSubDestination,
  getSubDestination,
  getSubDestinationById,
  reviewSubDestination,
  updateReview,
  updateSubDestination,
} from '../controller/subDestination';

const router = express.Router();

router.post('/', createSubDestination);
router.get('/', getSubDestination);
router.get('/:id', getSubDestinationById);
router.patch('/update/:id', updateSubDestination);
router.patch('/review/reply/:id', updateReview);

router.patch('/review/:id', reviewSubDestination);
router.delete('/delete/:id', deleteSubDestination);

export default router;
