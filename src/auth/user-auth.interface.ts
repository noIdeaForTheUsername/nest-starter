import { AccessLevel } from "src/users/entity/access-level.enum";

export interface UserAuth {
  id: number;
  accessLevel: AccessLevel;

  // sub: number;
  // login: string;
  // accessLevel: AccessLevel;
  // iat: number;
  // exp: number;
}