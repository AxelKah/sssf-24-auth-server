import {Request, Response, NextFunction} from 'express';
import {Game} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import gameModel from '../models/gameModel';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcrypt';

const gameListGet = async (
  req: Request,
  res: Response<Game[]>,
  next: NextFunction
) => {
  try {
    const games = await gameModel.find();
    res.json(games);
  } catch (error) {
    next(error);
  }
};
const gameGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Game>,
  next: NextFunction
) => {
  try {
    const game = await gameModel.findById(req.params.id);
    if (!game) {
      throw new CustomError('No game found', 404);
    }
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const gamePost = async (
  req: Request<{}, {}, Omit<Game, 'game_id'>>,
  res: Response<MessageResponse & {data: Game}>,
  next: NextFunction
) => {
  try {
    const game = await gameModel.create(req.body);
    const response = {
      message: 'Game added',
      data: game,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const gamePut = async (
  req: Request<{id: string}, {}, Omit<Game, 'game_id'>>,
  res: Response<MessageResponse & {data: Game}>,
  next: NextFunction
) => {
  try {
    const game = await gameModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) {
      throw new CustomError('No game found', 404);
    }
    const response = {
      message: 'Game updated',
      data: game,
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
    const game = await gameModel.findByIdAndDelete(req.params.id);
    if (!game) {
      throw new CustomError('No game found', 404);
    }
    res.json({message: 'Game deleted'});
  } catch (error) {
    next(error);
  }
};

export {gameListGet, gameGet, gamePost, gamePut, gameDelete};
