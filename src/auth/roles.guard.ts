import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { Roles } from "./role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const allowedRoles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);
    if (allowedRoles.length === 0) return true;  // for public endpoints

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) throw new UnauthorizedException("No token received, or its format is invalid");

    try {
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
      if (allowedRoles.includes(payload.role))
        request["user"] = payload;
      else
        throw new ForbiddenException("Your current role doesn't grant you access to this data/action");
    } catch (e) {
      if (e instanceof ForbiddenException) throw e;
      else throw new UnauthorizedException("Received token invalid");
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookie = request.cookies["authJwt"];
    if (!cookie || typeof cookie !== "string") return undefined;
    return cookie;
  }
}