import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithAuthUser } from '../../infraestructure/types/request-user';

const UserFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request: RequestWithAuthUser = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);

export { UserFromRequest };
