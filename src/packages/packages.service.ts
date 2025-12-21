import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Package } from './entity/package.interface';
import { AccessLevel } from 'src/users/entity/access-level.enum';
import { PackageStatus } from './entity/package-status.enum';

@Injectable()
export class PackagesService {

  // PRIVATE

  private packages: Package[] = [];

  private getPackageIndexById(id: number) {
    const foundIndex = this.packages.findIndex((p) => p.id == id);
    if (foundIndex !== -1) return foundIndex;
    else throw new NotFoundException("Package with the given ID not found, or you don't have access to it");
  }

  // PUBLIC

  public getAllPackages() {
    return this.packages;
  }

  public getUserPackages(userId: number) {
    return this.packages.filter((p) => userId === p.senderId || userId === p.receiverId);
  }

  public getPackage(id: number, userId: number, userAccessLevel: number) {
    const pack = this.packages[this.getPackageIndexById(id)];
    if (pack.senderId === userId || pack.receiverId === userId || userAccessLevel >= AccessLevel.Courier)
      return pack;
    else
      throw new NotFoundException("Package with the given ID not found, or you don't have access to it");
  }

  public addPackage(senderId: number, receiverId: number,
    content: string, sentDate: string, deliveredDate?: string) {
    
    // Get the current maxId
    let maxId = 0;
    this.packages.forEach((p) => {
      if (p.id > maxId) maxId = p.id;
    });

    // Create and push a new object
    const newPackage: Package = {
      id: maxId + 1,
      senderId,
      receiverId,
      content,
      sentDate,
      deliveredDate,
      status: PackageStatus.CREATED
    };
    this.packages.push(newPackage);
    return newPackage;
  }

  public removePackage(id: number) {
    this.packages.splice(this.getPackageIndexById(id), 1);
  }


  // checks authorization level (it can be set to Admin for actions performed due
  // to the server's logic) and changes the package's status with proper checks
  public changePackageStatus(packageId: number, newStatus: PackageStatus,
  authorizationLevel: AccessLevel) {
    const pack = this.packages[this.getPackageIndexById(packageId)];
    // Condition variables
    const courier = authorizationLevel >= AccessLevel.Courier;
    const admin = authorizationLevel >= AccessLevel.Admin;
    const cancelling = newStatus == PackageStatus.CANCELED;
    const updatingProgress = (newStatus > pack.status
      && pack.status < PackageStatus.DELIVERED
      && pack.status >= PackageStatus.PAID);
    const confirmingPayment = pack.status == PackageStatus.CREATED && newStatus == PackageStatus.PAID;
    
    // Conditions
    if (cancelling) {  // cancelling - all allowed
      if (pack.status >= PackageStatus.SENT && !courier) throw new ForbiddenException("Cannot cancel an already-sent package");
      pack.status = newStatus;
    }
    else if (courier && (updatingProgress || confirmingPayment))  // courier+
      pack.status = newStatus;
    else if (admin)  // admin+
      pack.status = newStatus
    else
      throw new ForbiddenException("Not allowed to change the package status in the requested way");
  }

  // Not supposed to be used when a courier is changing the package status
  public cancelUserPackage(packageId: number, userId: number) {
    const pack = this.getPackage(packageId, userId, AccessLevel.User);
    if (pack.status >= PackageStatus.SENT)
      throw new ForbiddenException("Cannot cancel an already-sent package");
    pack.status = PackageStatus.CANCELED;
  }
}
