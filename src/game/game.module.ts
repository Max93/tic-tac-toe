import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { TurnEntity } from './turn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, TurnEntity])],
  providers: [GameService],
  controllers: [GameController],
})

export class GameModule {}