import { Injectable, Logger } from "@nestjs/common";
import { EnvConfigDto } from "./dtos/env.dto";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

@Injectable()
export class ConfigService {
	private readonly logger = new Logger(ConfigService.name);
	private readonly config: EnvConfigDto;
	constructor() {
		this.logger.log("ConfigService instantiated");

		// Transform and validate environment variables
		const envConfig = plainToClass(EnvConfigDto, process.env, {
			enableImplicitConversion: true,
		});

		const errors = validateSync(envConfig);

		if (errors.length > 0) {
			this.logger.error(errors);
			throw new Error("Config validation error");
		}

		this.config = envConfig;
	}

	get<K extends keyof EnvConfigDto>(key: K): EnvConfigDto[K] {
		return this.config[key];
	}
}
