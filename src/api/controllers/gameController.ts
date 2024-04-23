import {Request, Response, NextFunction} from 'express';
import {Player} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import playerModel from '../models/playerModel';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcrypt';


const gameListGet = async (
  req: Request,
  res: Response<Player[]>,
  next: NextFunction
) => {
  try {
    const players = await playerModel.find().select('-password -__v -role');
    res.json(players);
  } catch (error) {
    next(error);
  }
};

const gameGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Player>,
  next: NextFunction
) => {
  try {
    const player = await playerModel
      .findById(req.params.id)
      .select('-password -__v -role');
    if (!player) {
      throw new CustomError('No species found', 404);
    }
    res.json(player);
  } catch (error) {
    next(error);
  }
};

const gamePost = async (
  req: Request<{}, {}, Omit<Player, 'player_id'>>,
  res: Response<MessageResponse & {data: Player}>,
  next: NextFunction
) => {
  try {
    req.body.role = 'player';
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const player = await playerModel.create(req.body);
    const response = {
      message: 'Game added',
      data: player,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const gamePut = async (
  req: Request<{id: string}, {}, Omit<Player, 'player_id'>>,
  res: Response<MessageResponse & {data: Player}>,
  next: NextFunction
) => {
  try {
    const player = await playerModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .select('-password -__v -role');
    if (!player) {
      throw new CustomError('No player found', 404);
    }
    const response = {
      message: 'Player updated',
      data: player,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const gameDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const player = await playerModel
      .findByIdAndDelete(req.params.id)
      .select('-password -__v -role');
    if (!player) {
      throw new CustomError('No player found', 404);
    }
    res.json({message: 'Player deleted'});
  } catch (error) {
    next(error);
  }
};

export {gameListGet, gameGet, gamePost, gamePut, gameDelete};
