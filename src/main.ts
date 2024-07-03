import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle("AITC Backend Example: NestJS Standard")
    .setDescription("The AITC Backend Example API description")
    .setVersion("1.0")
    .addTag("aitc")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(configService.get("PORT"));
}
bootstrap();
