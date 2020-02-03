import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game/game.entity';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tttoe',
      entities: [GameEntity],
      synchronize: true,
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}