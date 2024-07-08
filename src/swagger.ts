import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "./config/config.service";

// biome-ignore lint/complexity/noStaticOnlyClass: This class is a static class
export class SwaggerSetup {
  public static execute(app: INestApplication, configService: ConfigService) {
    const config = new DocumentBuilder()
      .setTitle("AITC Backend Example: NestJS Standard")
      .setDescription("The AITC Backend Example API description")
      .setVersion("1.0")
      .addServer(`http://localhost:${configService.get("PORT")}`)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document);
  }
}
