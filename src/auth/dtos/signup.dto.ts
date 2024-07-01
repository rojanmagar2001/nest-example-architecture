import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
	@ApiProperty({
		required: true,
		description: "The user's email address",
		example: "john@example.com",
		minimum: 5,
		maximum: 255,
	})
	@IsString()
	@IsEmail()
	@Length(5, 255)
	@Transform(({ value }) => value.toLowerCase())
	email: string;
}