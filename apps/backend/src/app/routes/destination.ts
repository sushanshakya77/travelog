import * as express from 'express';
import { getDestination, getDestinationById } from '../controller/destination';

const router = express.Router();

router.get('/', getDestination);
router.get('/:id', getDestinationById);

export default router;
