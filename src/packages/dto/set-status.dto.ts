import { IsEnum } from "class-validator";
import { PackageStatus } from "../entity/package-status.enum";

export class SetStatusDTO {
  @IsEnum(PackageStatus)
  newStatus: PackageStatus
}