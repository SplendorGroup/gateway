import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { GrpcRoutesModule, Route } from '../modules/grpc-routes-module';

function matchPath(path: string, routePath: string): boolean {
  const pathParts = path.split('/').filter(Boolean);
  const routeParts = routePath.split('/').filter(Boolean);

  if (pathParts.length !== routeParts.length) {
    return false;
  }

  return routeParts.every((part, index) => {
    return part.startsWith(':') || part === pathParts[index];
  });
}

const GrpcMethodFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();
    const routes: Route[] = GrpcRoutesModule.getRoutes();
    const matchingRoute = routes.find(
      (route) =>
        route.method_http === request.method &&
        matchPath(request.path, route.pathname),
    );

    return matchingRoute ? matchingRoute.method_grpc : undefined;
  },
);

export { GrpcMethodFromRequest };
