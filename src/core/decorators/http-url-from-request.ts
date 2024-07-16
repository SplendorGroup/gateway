import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GrpcRoutesModule, Route } from "../modules/grpc-routes-module";
import { matchPath } from "@/utils/math-path";
import { Request } from 'express';

export const HttpUrlFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();
    const routes: Route[] = GrpcRoutesModule.getRoutes();
    const matchingRoute = routes.find(
      (route) =>
        route.method_http === request.method &&
        route.protocol === 'http' &&
        matchPath(request.path, route.pathname),
    );

    return matchingRoute ? matchingRoute.url : undefined;
  },
);
