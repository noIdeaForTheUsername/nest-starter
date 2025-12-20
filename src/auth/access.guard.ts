import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { Access } from "./access.decorator";

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const minAccessLevel = this.reflector.getAllAndOverride(Access, [context.getHandler(), context.getClass()]);
    if (!minAccessLevel) return true;  // for public endpoints

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) throw new UnauthorizedException("No token received, or its format is invalid");

    try {
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
      if (payload.accessLevel && payload.accessLevel >= minAccessLevel)
        request["user"] = payload;
      else
        throw new ForbiddenException("Your current access level doesn't grant you access to this data/action");
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