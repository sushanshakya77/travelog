import * as express from 'express';
import {
  createTrip,
  deleteTrip,
  getTripById,
  getUserTrips,
  updateTrip,
} from '../controller/trips';

const router = express.Router();

router.post('/', createTrip);
router.get('/user/:id', getUserTrips);
router.get('/:id', getTripById);
router.patch('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

export default router;
