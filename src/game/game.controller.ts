import {
  Controller,
  Get,
  Post,
  Put,
  HttpCode,
  Body,
  Param
} from "@nestjs/common";

import { GameService } from "./game.service";
import { GameEntity } from './game.entity';

import { CreateGameDto } from './create-game.dto';
import { UpdateGameDto } from './update-game.dto';

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @HttpCode(200)
  createGame(@Body() createGameDto: CreateGameDto): Promise<GameEntity> {
    return this.gameService.create(createGameDto);
  }

  @Get(":id")
  getGame(@Param() params): Promise<GameEntity> {
    return this.gameService.find(params.id);
  }

  @Put(":id")
  updateGame(@Body() updateGameDto: UpdateGameDto, @Param() params): Promise<GameEntity> {
    return this.gameService.update(params.id, updateGameDto);
  }
}