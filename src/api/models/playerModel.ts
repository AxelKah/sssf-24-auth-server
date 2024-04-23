/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import {Player} from '../../types/DBTypes';

const playerSchema = new mongoose.Schema<Player>({
  player_name: {
    type: String,
    minlength: [3, 'playername must be at least 3 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [4, 'Password must be at least 4 characters'],
  },
  role: {
    type: String,
    required: true,
    enum: ['player', 'admin'],
  },
});

export default mongoose.model<Player>('Player', playerSchema);
