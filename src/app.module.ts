import { Module, MiddlewareConsumer, RequestMethod, Global } from '@nestjs/common';
import { AuthMiddleware } from './infraestructure/middlewares/auth.middleware';
import { ProxyController } from './presentation/controller/proxy.controller';
import { GrpcRoutesModule } from './core/modules/grpc-routes-module';
import { GrpcProvider } from './infraestructure/providers/grpc-provider';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsFilter } from './infraestructure/filters/exceptions';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { SortResponseInterceptor } from '@/interceptors/sort-response-interceptor';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
GrpcRoutesModule.register({
  routes: [
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/vehicle',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/vehicle/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/vehicle',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/vehicle/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/vehicle/:id',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/brand',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/brand/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/brand',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/brand/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/brand/:id',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/color',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/color/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/color',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/color/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/color/:id',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/user',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/user/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/user',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/user/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/user/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'SyncRoleWithUser',
      pathname: '/user/sync-role',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/permission',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/permission/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/permission',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/permission/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/permission/:id',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindAll',
      pathname: '/role',
    },
    {
      method_http: 'GET',
      method_grpc: 'FindOne',
      pathname: '/role/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Create',
      pathname: '/role',
    },
    {
      method_http: 'PUT',
      method_grpc: 'Update',
      pathname: '/role/:id',
    },
    {
      method_http: 'DELETE',
      method_grpc: 'Delete',
      pathname: '/role/:id',
    },
    {
      method_http: 'POST',
      method_grpc: 'SyncPermissions',
      pathname: '/role/sync-permissions',
    },
    {
      method_http: 'GET',
      method_grpc: 'GetPermissions',
      pathname: '/role/permissions/:role_id',
    },
    {
      method_http: 'POST',
      method_grpc: 'Login',
      pathname: '/auth/login',
    },
    {
      method_http: 'POST',
      method_grpc: 'Register',
      pathname: '/auth/register',
    },
    {
      method_http: 'POST',
      method_grpc: 'LoginOrRegisterWithOAuth',
      pathname: '/auth/login-or-register-oauth',
    },
    {
      method_http: 'POST',
      method_grpc: 'ForgotPassword',
      pathname: '/auth/forgot-password',
    },
    {
      method_http: 'POST',
      method_grpc: 'ResetPassword',
      pathname: '/auth/reset-password',
    },
    {
      method_http: 'POST',
      method_grpc: 'RequestConfirmEmail',
      pathname: '/auth/request-confirm-email',
    },
    {
      method_http: 'POST',
      method_grpc: 'ConfirmEmail',
      pathname: '/auth/confirm-email',
    },
  ],
})
  ],
  controllers: [ProxyController],
  providers: [
    GrpcProvider,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SortResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'vehicles/*', method: RequestMethod.ALL },
        { path: 'buyers/*', method: RequestMethod.ALL },
      );
  }
}
