import { Body, Controller, Post } from "@nestjs/common";
import type { SignUpDto } from "./dtos/signup.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	@Post("signup")
	async signup(@Body() body: SignUpDto) {
		return "signup";
	}
}
