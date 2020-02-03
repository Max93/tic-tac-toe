import {
  Controller,
  Get,
  Post,
  Put,
  HttpCode,
  Query,
  Body
} from "@nestjs/common";
import { GameService } from "./game.service";
import { GameEntity } from './game.entity';

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @HttpCode(200)
  createGame(@Body() data: string): Promise<GameEntity> {
    return this.gameService.create(data);
  }

  @Get(":id")
  getGame(@Query("id") id: number): Promise<GameEntity> {
    return this.gameService.find(id);
  }

  @Put(":id")
  updateGame(@Body() data: string, @Query("id") id: number): Promise<GameEntity> {
    return this.gameService.update(id, data);
  }
}