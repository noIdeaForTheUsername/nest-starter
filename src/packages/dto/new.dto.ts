import { IsInt, IsString } from "class-validator";

export class NewPackageDTO {
  @IsInt()
  receiverId: number;
  @IsString()
  content: string;
}