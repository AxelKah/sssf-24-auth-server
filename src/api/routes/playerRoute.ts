import express from 'express';
import {
  playerDelete,
  playerGet,
  playerListGet,
  playerPost,
  playerPut,
} from '../controllers/playerController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(playerListGet)
  .post(playerPost)
  .put(authenticate, playerPut)
  .delete(authenticate, playerDelete);

router.route('/:id').get(playerGet);

export default router;
