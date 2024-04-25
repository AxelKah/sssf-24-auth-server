/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import {Game} from '../../types/DBTypes';

const gameSchema = new mongoose.Schema<Game>({
  player1: {
    required: true,
  },
  player2: {
    required: true,
  },
  score1: {
    type: Number,
    required: true,
  },
  score2: {
    type: Number,
    required: true,
  },
  winner: {
    required: true,
  },
});

export default mongoose.model<Game>('Game', gameSchema);
