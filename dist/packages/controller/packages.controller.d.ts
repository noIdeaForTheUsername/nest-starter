import { PackagesService } from '../service/packages.service';
import { NewPackageDTO } from '../dto/new.dto';
import { UsersService } from 'src/users/users.service';
export declare class PackagesController {
    private packageService;
    private usersService;
    constructor(packageService: PackagesService, usersService: UsersService);
    getPackages(): Promise<import("../entity/package.interface").Package[]>;
    getPackage(id: number): Promise<import("../entity/package.interface").Package>;
    addPackage(dto: NewPackageDTO): Promise<void>;
    removePackage(id: number): Promise<void>;
}
