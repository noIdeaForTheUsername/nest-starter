import { AccessLevel } from "./access-level.enum";

export interface User {
  id: number;
  login: string;
  password: string;
  accessLevel: AccessLevel;
}