import { IsString } from "class-validator";

export class RegisterDTO {
  @IsString()
  login: string;
  @IsString()
  password: string;
  @IsString()
  passwordRepeat: string
}