import { matchPath } from '@/utils/math-path';
import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { lastValueFrom } from 'rxjs';
import { GrpcRoutesModule, Route } from '../../core/modules/grpc-routes-module';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private httpService: HttpService
  ) {}

  async use(request: Request | any, res: Response, next: NextFunction) {
    const routes: Route[] = GrpcRoutesModule.getRoutes();

    const access_route = this.getAccessRoute(request, routes);

    const is_public = this.accessRouteIsPublic(access_route);

    if (is_public) {
      return next()
    }

    const token = this.getBearerToken(request);
    const route = request.baseUrl + request.path;
    const method = request.method;

    console.log(token, route, method)
    const user = await this.verifyToken(token)
    const is_allow = this.checkPermissions(access_route?.permissions, user.permissions)
    this.userHasPermission(is_allow)
    request.user = user
    return next();
  }

  private getBearerToken(request: Request) {
    const authorization = this.getBearerTokenInHeaders(request);
    if (authorization) {
      const parts = this.fragmentBearerToken(authorization);
      this.checkFragmentPartsBearerToken(parts);
      return parts.token;
    }
    throw new UnauthorizedException('Token is invalid');
  }

  private getBearerTokenInHeaders(request: Request) {
    return request.headers.authorization;
  }

  private fragmentBearerToken(authorization: string) {
    const parts = authorization.split(' ');
    if (parts.length == 2) {
      const [scheme, token] = parts;
      return {
        scheme,
        token,
      };
    }
    throw new UnauthorizedException('Token is invalid');
  }

  private checkFragmentPartsBearerToken(parts: {
    scheme: string;
    token: string;
  }) {
    if (!parts?.scheme && !/Bearer$/i.test(parts?.scheme)) {
      throw new UnauthorizedException('Token is invalid');
    }
  }

  private getAccessRoute(request: Request, routes: Route[]) {
    const matchingRoute = routes.find(
      (route) =>
        route.method_http === request.method &&
        matchPath(request.path, route.pathname),
    );
    return matchingRoute;
  }

  private accessRouteIsPublic(access_route: Route) {
    if (access_route.is_public === true) {
      return true
    }
  }

  private async verifyToken(
    token: string,
  ) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post('http://localhost:3001/auth/verify', {
          access_token: token,
        }),
      );
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        email_verify: data.email_verify,
        roles: data.roles,
        permissions: data.permissions
      }
    } catch (error) {
      throw new UnauthorizedException(error?.response?.message)
    }
  }

  private checkPermissions(route_permissions: string[], user_permissions: string[]) {
    
    if (typeof route_permissions !== 'object' || route_permissions.length === 0) {
      return true
    } 
    
    return route_permissions.some((permission) => user_permissions.includes(permission))
  }

  private userHasPermission(permission: boolean) {
    if (!permission) {
      throw new ForbiddenException(
        `You don't have permission to access this resource.`,
      );
    }
  }
}
