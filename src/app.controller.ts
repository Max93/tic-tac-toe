import { Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
    @Get('/')
    getGamePage() {
      return 'render static game page'
    }
    @Get('/:id')
    getGame(@Query('id') id: number) {
      return 'render static game page'
    }
}