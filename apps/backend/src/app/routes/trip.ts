import * as express from 'express';
import {
  createTrip,
  deleteTrip,
  getTripById,
  getTripsByDestination,
  getUserTrips,
  updateTrip,
} from '../controller/trips';

const router = express.Router();

router.post('/', createTrip);
router.get('/user/:id', getUserTrips);
router.get('/:id', getTripById);
router.get('/destination/:id', getTripsByDestination);
router.patch('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

export default router;
