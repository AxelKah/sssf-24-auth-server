import express from 'express';

import userRoute from './routes/userRoute';
import playerRoute from './routes/playerRoute';
import authRoute from './routes/authRoute';
import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: players, users, auth',
  });
});

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/players', playerRoute);

export default router;
