import { Injectable, NotFoundException } from '@nestjs/common';
import { Package } from '../domain/package.interface';

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

  public removePackage(id: number) {
    const foundIndex = this.packages.findIndex((p) => p.id == id);
    if (foundIndex !== -1) this.packages.splice(foundIndex, 1);
    else throw new NotFoundException("Package to remove with the given ID not found");
  }

  public getPackages() {
    return this.packages;
  }
}
