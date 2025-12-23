import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Package } from './entity/package.entity';
import { AccessLevel } from 'src/users/entity/access-level.enum';
import { PackageStatus } from './entity/package-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserAuth } from 'src/auth/user-auth.interface';

@Injectable()
export class PackagesService {

  // PRIVATE
  constructor(
    @InjectRepository(Package)
    private packages: MongoRepository<Package>
  ) {}

  // PUBLIC

  public async getUndeliveredPackages() {
    return await this.packages.find({
      where: { status: { $lt: PackageStatus.DELIVERED } },
    });
  }

  public async getUserPackages(userId: ObjectId) {
    return await this.packages.find({ where: {
      $or: [{receiverId: userId}, {senderId: userId}]
    }});
  }

  public async getPackage(id: ObjectId, caller: UserAuth) {
    const pack = await this.packages.findOneBy({_id: id});
    const callerOid = new ObjectId(caller.id);
    if (pack && (pack.senderId.equals(callerOid) || pack.receiverId.equals(callerOid) || caller.accessLevel >= AccessLevel.Courier))
      return pack;
    else
      throw new NotFoundException("Package with the given ID not found, or you don't have access to it");
  }

  public async addPackage(senderId: ObjectId, receiverId: ObjectId,
    content: string, sentDate: Date = new Date()) {

    // Create and push a new object
    const newPackage = this.packages.create({
      senderId: senderId,
      receiverId: receiverId,
      content,
      sentDate: sentDate.toISOString(),
      status: PackageStatus.CREATED
    });
    await this.packages.save(newPackage);
    return newPackage;
  }


  /*checks authorization level (it can be set to Admin for actions performed due
    to the server's logic) and changes the package's status with proper checks. The privileges are:
    - Users: Cancel packages that were not SENT
    - Couriers: push the status forward (and only forward, by the enum values) for PAID+ and not already DELIVERED/CANCELED/FAILED packages
    - Admins: everything */
  public async changePackageStatus(packageId: ObjectId, newStatus: PackageStatus,
  authorizationLevel: AccessLevel) {
    const pack = await this.packages.findOneBy({_id: packageId});
    if (!pack) throw new NotFoundException("Package with the given ID not found");
    // Condition variables
    const courier = authorizationLevel >= AccessLevel.Courier;
    const admin = authorizationLevel >= AccessLevel.Admin;
    const cancelling = newStatus == PackageStatus.CANCELED;
    const updatingProgress = (newStatus >= pack.status
      && pack.status < PackageStatus.DELIVERED
      && pack.status >= PackageStatus.PAID);
    const confirmingPayment = pack.status == PackageStatus.CREATED && newStatus == PackageStatus.PAID;
    
    // Conditions
    const standardForbidden = new ForbiddenException("Not authorized to change the package status in the requested way");
    if (!courier) {  // Normal users
      if (!cancelling) throw standardForbidden;
      else if (pack.status >= PackageStatus.SENT)
        throw new ForbiddenException("Cannot cancel an already-sent package");
    }
    else if (!admin) {  // Couriers
      if (!(updatingProgress || confirmingPayment)) throw standardForbidden;
    }

    await this.packages.updateOne(
      {_id: packageId},
      {$set: {status: newStatus}}
    );
  }

  
  // Not supposed to be used when a courier is changing the package status, only for the user-called cancel
  public async cancelUserPackage(packageId: ObjectId, userId: ObjectId) {
    const pack = await this.packages.findOneBy({_id: packageId});
    if (pack && pack.receiverId.equals(userId) && !pack.senderId.equals(userId))
      throw new ForbiddenException("You can only cancel packages SENT by you");
    else if (!pack || !pack.senderId.equals(userId))
      throw new NotFoundException("Package with the given ID not found, or you don't have access to it");

    if (pack.status == PackageStatus.CANCELED)
      return;
    else if (pack.status >= PackageStatus.SENT)
      throw new ForbiddenException("Cannot cancel an already-sent package");

    await this.packages.updateOne(
      {_id: packageId},
      {$set: {status: PackageStatus.CANCELED}}
    );
  }

  // NO VALIDATION IN THIS METHOD
  // cancels packages that were supposed to be RECEIVED by the user in argument
  public async cancelUndeliveredPackages(userId: ObjectId) {
    await this.packages.updateMany(
      {
        $and: [
          { receiverId: userId },
          { status: { $lt: PackageStatus.DELIVERED } },
        ],
      },
      {
        $set: { status: PackageStatus.CANCELED },
      }
    );
  }
}

