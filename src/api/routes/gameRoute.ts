/* eslint-disable prettier/prettier */
import express from 'express';
import {
  gameDelete,
  gameGet,
  gameListGet,
  gamePost,
  gamePut,
} from '../controllers/gameController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(gameListGet).post(authenticate, gamePost);

router
  .route('/')
  .get(gameGet)
  .put(authenticate, gamePut)
  .delete(authenticate, gameDelete);

export default router;

////////////////////////////////// fix the code //////////////////////////////////
