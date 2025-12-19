import { Injectable, NotFoundException } from '@nestjs/common';
import { Package } from '../entity/package.interface';

@Injectable()
export class PackagesService {
  private packages: Package[] = [];

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

  private getPackageIndexById(id: number) {
    const foundIndex = this.packages.findIndex((p) => p.id == id);
    if (foundIndex !== -1) return foundIndex;
    else throw new NotFoundException("Package with the given ID not found");
  }

  public removePackage(id: number) {
    this.packages.splice(this.getPackageIndexById(id), 1);
  }

  public getPackages() {
    return this.packages;
  }

  public getPackage(id: number) {
    return this.packages[this.getPackageIndexById(id)];
  }
}
