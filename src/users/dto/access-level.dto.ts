import { IsEnum } from "class-validator";
import { AccessLevel } from "../entity/access-level.enum";

export class AccessLevelDTO {
  @IsEnum(AccessLevel)
  accessLevel: AccessLevel;
}