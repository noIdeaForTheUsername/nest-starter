import { Role } from "./role.enum";

export interface User {
  id: number;
  login: string;
  password: string;
  role: Role;
}