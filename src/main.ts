import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(express.static(join(process.cwd(), 'assets/build')));
	app.enableCors();
	await app.listen(33333);
}

bootstrap();
