import { Column, Entity, Index, ObjectIdColumn } from "typeorm";
import { PackageStatus } from "./package-status.enum";
import { ObjectId } from "mongodb";

// export interface Package {
//   id: number,
//   senderId: number,
//   receiverId: number,
//   content: string,
//   sentDate: string,  
//   deliveredDate?: string,  // ISO string
//   status: PackageStatus
// }

@Index(['senderId'])
@Index(['receiverId'])
@Index(['status'])
@Entity()
export class Package {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  senderId: ObjectId

  @Column()
  receiverId: ObjectId

  @Column()
  content: string

  @Column()
  sentDate: string  // ISO string

  @Column({
    type: "enum",
    enum: PackageStatus,
  })
  status: PackageStatus
}
