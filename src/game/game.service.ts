import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from './game.entity';
import { TurnEntity } from './turn.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(TurnEntity)
    private readonly turnRepository: Repository<TurnEntity>,
  ) {}

  async find(id): Promise<GameEntity> {
    return this.gameRepository.findOne(id, { relations: ["turns"] });
  }

  async create(data): Promise<GameEntity> {
    const game = new GameEntity();
    game.creation = new Date();
    game.dimension = 3;
    game.sequence = ['X', '0'];

    await this.gameRepository.save(game);

    return game;
  }

  async update(id, data): Promise<GameEntity> {
    
    const game = await this.gameRepository.findOne(id, { relations: ["turns"] });

    const turn = new TurnEntity();
    turn.stepNumber = 0;
    turn.squares = Array(Math.pow(3, 2)).fill(null)
    await this.turnRepository.save(turn);

    game.turns.push(turn);

    await this.gameRepository.save(game);

    return game;
  }
}