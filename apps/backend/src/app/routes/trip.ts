import * as express from 'express';
import { createTrip, getTripById, getUserTrips } from '../controller/trips';

const router = express.Router();

router.post('/', createTrip);
router.get('/user/:id', getUserTrips);
router.get('/:id', getTripById);

export default router;
