import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request | any, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;

    if (!auth_header) {
      throw new UnauthorizedException('No token provided');
    }

    const token = auth_header.split(' ')[1];
    const route = req.baseUrl + req.path;
    const method = req.method;

    this.validateToken(token, route, method)
      .subscribe(
        response => {
          req.user = response.user;
          next();
        },
        error => {
          if (error.response && error.response.status === 401) {
            throw new UnauthorizedException('Invalid token');
          }
          if (error.response && error.response.status === 403) {
            throw new ForbiddenException('Insufficient permissions');
          }
          throw new ForbiddenException('Failed to authenticate token');
        }
      );
  }

  private validateToken(token: string, route: string, method: string): Observable<any> {
    return {} as any
  }
}
