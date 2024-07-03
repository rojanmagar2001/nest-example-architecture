import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResponseMapper<T> {
  @ApiProperty({
    description: "Response message",
    example: "Request successful",
    type: String,
  })
  public message: string;

  @ApiProperty({
    description: "Response data",
    type: Object,
  })
  public data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
}

export function createResponseMapper<T, U extends BaseResponseMapper<T>>(
  MapperClass: new (message: string, data: T) => U,
  message: string,
  data: T
): U {
  return new MapperClass(message, data);
}
