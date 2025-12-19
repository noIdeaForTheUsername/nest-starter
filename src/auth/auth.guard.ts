import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    console.log("request cookies: ", request.cookies, " |  signed: ", request.signedCookies);
    const token = this.extractTokenFromCookie(request);
    console.log("processed token: ", token);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookie = request.cookies["authJwt"];
    if (!cookie || typeof cookie !== "string") return undefined;
    return cookie;
  }
}