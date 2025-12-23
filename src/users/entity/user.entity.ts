// import { AccessLevel } from "./access-level.enum";

import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { AccessLevel } from "./access-level.enum";

// export interface User {
//   id: number;
//   login: string;
//   passwordHash: string;
//   accessLevel: AccessLevel;
// }

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  login: string;

  @Column()
  passwordHash: string;

  @Column({
    type: "enum",
    enum: AccessLevel,
  })
  accessLevel: AccessLevel;
}