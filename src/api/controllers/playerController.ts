// Description: This file contains the functions for the player routes
// TODO: add function check, to check if the server is alive
// TODO: add function to get all players
// TODO: add function to get a player by id
// TODO: add function to create a player
// TODO: add function to update a player
// TODO: add function to delete a player
// TODO: add function to check if a token is valid
import {Request, Response, NextFunction} from 'express';
import {Player} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import playerModel from '../models/playerModel';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcrypt';

const playerListGet = async (
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

const playerGet = async (
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

const playerPost = async (
  req: Request<{}, {}, Omit<Player, 'player_id'>>,
  res: Response<MessageResponse & {data: Player}>,
  next: NextFunction
) => {
  try {
    req.body.role = 'player';
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const player = await playerModel.create(req.body);
    const response = {
      message: 'Player added',
      data: player,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const playerPut = async (
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

const playerDelete = async (
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

export {playerListGet, playerGet, playerPost, playerPut, playerDelete};
