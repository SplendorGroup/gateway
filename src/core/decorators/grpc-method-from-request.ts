import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { GrpcRoutesModule, Route } from '../modules/grpc-routes-module';
import { matchPath } from '@/utils/math-path';

const GrpcMethodFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();
    const routes: Route[] = GrpcRoutesModule.getRoutes();
    const matchingRoute = routes.find(
      (route) =>
        route.method_http === request.method && route.protocol === 'grpc' &&
        matchPath(request.path, route.pathname),
    );

    return matchingRoute ? matchingRoute.method_grpc : undefined;
  },
);

export { GrpcMethodFromRequest };
