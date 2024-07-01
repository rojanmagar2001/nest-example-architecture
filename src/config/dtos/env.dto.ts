import { IsEnum, IsNumber, IsNumberString, IsString } from "class-validator";
import { NodeEnv } from "../enums/node-env.enum";
import { Transform, type TransformFnParams } from "class-transformer";

export class EnvConfigDto {
	@IsEnum(NodeEnv)
	NODE_ENV: NodeEnv;

	@IsNumber()
	PORT: number;
}
