import { PackageStatus } from "./package-status.enum";

export interface Package {
  id: number,
  senderId: number,
  receiverId: number,
  content: string,
  sentDate: string,  // ISO string
  deliveredDate?: string,  // ISO string
  status: PackageStatus
}
