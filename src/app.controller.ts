import { Controller, Get, Res, Next, Req } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Get('/')
    getFile(@Res() res: Response, @Next() next: NextFunction, @Req() req: Request) {
        res.sendFile(join(process.cwd(), 'assets/build/index.html'));
    }
    @Get('/:id')
    getFileParams(@Res() res: Response, @Next() next: NextFunction, @Req() req: Request) {
        res.sendFile(join(process.cwd(), 'assets/build/index.html'));
    }
}