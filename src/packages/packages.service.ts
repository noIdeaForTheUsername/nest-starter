import { Injectable, NotFoundException } from '@nestjs/common';
import { Package } from './entity/package.interface';
import { AccessLevel } from 'src/users/entity/access-level.enum';

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
      deliveredDate
    };
    this.packages.push(newPackage);
    return newPackage;
  }



  public removePackage(id: number) {
    this.packages.splice(this.getPackageIndexById(id), 1);
  }
}
