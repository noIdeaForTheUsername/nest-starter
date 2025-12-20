import { Reflector } from "@nestjs/core";
import { AccessLevel } from "src/users/entity/access-level.enum";

export const Access = Reflector.createDecorator<AccessLevel>();