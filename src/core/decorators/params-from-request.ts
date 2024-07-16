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

function extractParams(path: string, routePath: string): Record<string, string> {
  const pathParts = path.split('/').filter(Boolean);
  const routeParts = routePath.split('/').filter(Boolean);

  const params: Record<string, string> = {};

  routeParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      params[part.substring(1)] = pathParts[index];
    }
  });

  return params;
}

const ParamsFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Record<string, any> => {
    const request: Request = ctx.switchToHttp().getRequest();
    const routes: Route[] = GrpcRoutesModule.getRoutes();
    const matchingRoute = routes.find(
      (route) =>
        route.method_http === request.method &&
        matchPath(request.path, route.pathname),
    );

    if (!matchingRoute) {
      return {};
    }

    const params = extractParams(request.path, matchingRoute.pathname);
    return params;
  },
);

export { ParamsFromRequest };
