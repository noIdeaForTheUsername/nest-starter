import { IsMongoId, IsString } from "class-validator";

export class NewPackageDTO {
  @IsMongoId()
  receiverId: string;
  @IsString()
  content: string;
}