import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from './game.entity';
import { CreateGameDto } from './create-game.dto';
import { UpdateGameDto } from './update-game.dto';
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>
  ) {}

  async find(id): Promise<GameEntity> {
    return this.gameRepository.findOne(id);
  }

  async create(data): Promise<GameEntity> {
    
    const game = new GameEntity();
    game.creation = new Date();

    game.step = 0
    game.sequence = data.sequence.join(',')
    game.squares = Array(Math.pow(data.dimenion, 2)).fill("null").join(',')

    return this.gameRepository.save(game);
  }

  async update(id, data): Promise<GameEntity> {
  
    const game = await this.gameRepository.findOne(id);

    game.step = data.step
    game.squares = data.squares.join(',')

    return this.gameRepository.save(game);
  }
}