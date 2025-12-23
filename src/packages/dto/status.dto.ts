import { IsEnum } from "class-validator";
import { PackageStatus } from "../entity/package-status.enum";

export class StatusDTO {
  @IsEnum(PackageStatus)
  status: PackageStatus
}