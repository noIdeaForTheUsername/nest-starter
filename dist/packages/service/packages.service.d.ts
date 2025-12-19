import { Package } from '../entity/package.interface';
export declare class PackagesService {
    private packages;
    addPackage(senderId: number, receiverId: number, content: string, sentDate: string, deliveredDate?: string): Package;
    private getPackageIndexById;
    removePackage(id: number): void;
    getPackages(): Package[];
    getPackage(id: number): Package;
}
