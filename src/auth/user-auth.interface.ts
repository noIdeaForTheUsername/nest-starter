import { AccessLevel } from "src/users/entity/access-level.enum";
import { ObjectId } from "typeorm";

export interface UserAuth {
  id: ObjectId;
  accessLevel: AccessLevel;

  // sub: number;
  // login: string;
  // accessLevel: AccessLevel;
  // iat: number;
  // exp: number;
}