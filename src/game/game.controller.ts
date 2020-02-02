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

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @HttpCode(200)
  createGame(@Body() data: string) {
    return this.gameService.createGame(data);
  }

  @Get(":id")
  getGame(@Query("id") id: number) {
    return this.gameService.getGame(id);
  }

  @Put(":id")
  updateGame(@Query("id") id: number, @Body() data: string) {
    return this.gameService.updateGame(id, data);
  }
}
