import * as express from 'express';
import { createTrip, getAllTrips } from '../controller/trips';

const router = express.Router();

router.post('/', createTrip);
router.get('/', getAllTrips);

export default router;
