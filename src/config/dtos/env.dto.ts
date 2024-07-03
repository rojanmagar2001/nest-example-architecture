import { IsEnum, IsNumber, IsNumberString, IsString } from "class-validator";
import { NodeEnv } from "../enums/node-env.enum";
import { Transform, TransformFnParams } from "class-transformer";

export class EnvConfigDto {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @IsNumber()
  PORT: number;

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_ACCESS_EXPIRATION: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  JWT_REFRESH_EXPIRATION: string;
}
