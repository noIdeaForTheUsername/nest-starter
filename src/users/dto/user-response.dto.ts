import { AccessLevel } from "../entity/access-level.enum"

export class UserResponseDTO {
  id: string;
  login: string;
  accessLevel: AccessLevel;
}