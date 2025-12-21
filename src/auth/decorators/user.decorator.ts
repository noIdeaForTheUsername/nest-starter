import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserAuth } from "../user-auth.interface";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserAuth;
  }
)