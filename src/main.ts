import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
    transform: true,          //dto를 지나는 데이터들을 각각 설정해놓은 타입으로 변경해줍니다. 굉장히 편리한듯 합니다.
  }));
  await app.listen(3000);
}
bootstrap();
