import { Module, MiddlewareConsumer, Global } from '@nestjs/common';
import { AuthMiddleware } from './infraestructure/middlewares/auth.middleware';
import { ProxyController } from './presentation/controller/proxy.controller';
import { GrpcRoutesModule } from './core/modules/grpc-routes-module';
import { GrpcProvider } from './infraestructure/providers/grpc-provider';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsFilter } from './infraestructure/filters/exceptions';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { SortResponseInterceptor } from '@/interceptors/sort-response-interceptor';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule,
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
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/vehicle',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/vehicle/:id',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/vehicle',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/vehicle/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/vehicle/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/brand',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/brand/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/brand',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/brand/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/brand/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/color',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/color/:id',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/color',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/color/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/color/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/user',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/user/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/user',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/user/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/user/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'SyncRoleWithUser',
          pathname: '/user/sync-role',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/permission',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/permission/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/permission',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/permission/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/permission/:id',
          is_public: false,
        },

        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'GetOrders',
          pathname: '/order',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'GetOrderById',
          pathname: '/order/:id',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'CreateOrder',
          pathname: '/order',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'UpdateOrder',
          pathname: '/order/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'DeleteOrder',
          pathname: '/order/:id',
          is_public: false,
        },

        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'GetClients',
          pathname: '/client',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'GetClientById',
          pathname: '/client/:id',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'CreateClient',
          pathname: '/client',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'UpdateClient',
          pathname: '/client/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'DeleteClient',
          pathname: '/client/:id',
          is_public: false,
        },

        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindAll',
          pathname: '/role',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'FindOne',
          pathname: '/role/:id',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Create',
          pathname: '/role',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'PUT',
          method_grpc: 'Update',
          pathname: '/role/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'DELETE',
          method_grpc: 'Delete',
          pathname: '/role/:id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'SyncPermissions',
          pathname: '/role/sync-permissions',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'GET',
          method_grpc: 'GetPermissions',
          pathname: '/role/permissions/:role_id',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Login',
          pathname: '/auth/login',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'Register',
          pathname: '/auth/register',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'LoginOrRegisterWithOAuth',
          pathname: '/auth/login-or-register-oauth',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'ForgotPassword',
          pathname: '/auth/forgot-password',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'ResetPassword',
          pathname: '/auth/reset-password',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'RequestConfirmEmail',
          pathname: '/auth/request-confirm-email',
          is_public: false,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'ConfirmEmail',
          pathname: '/auth/confirm-email',
          is_public: true,
        },
        {
          protocol: 'grpc',
          method_http: 'POST',
          method_grpc: 'VerifyAccessToken',
          pathname: '/auth/verify',
          is_public: true,
        },
        {
          protocol: 'http',
          method_http: 'GET',
          pathname: '/mail/track',
          url: 'http://localhost:3004/mail/track',
          is_public: true,
        },
      ],
    }),
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
    consumer.apply(AuthMiddleware).forRoutes(ProxyController);
  }
}
