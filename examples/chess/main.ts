import { NestFactory } from "@nestjs/core";
import { ChessModule } from "./chess.module";

async function bootstrap(): Promise<void> {
  const chess = await NestFactory.create(ChessModule);
  await chess.listen(5000);
}

bootstrap();
