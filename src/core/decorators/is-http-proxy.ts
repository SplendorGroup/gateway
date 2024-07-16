import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { GrpcRoutesModule } from '../../core/modules/grpc-routes-module';
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
class HttpProxyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const route = GrpcRoutesModule.getRoutes().find(
      (route) =>
        route.protocol === 'http' &&
        route.pathname === request.path &&
        route.method_http === request.method,
    );

    if (!route) {
      const nextFunction = context.switchToHttp().getNext();
      nextFunction();
      return new Observable();
    }

    return next.handle();
  }
}

export function IsHttpProxy() {
  return applyDecorators(
    SetMetadata('isHttpProxy', true),
    UseInterceptors(HttpProxyInterceptor),
  );
}
