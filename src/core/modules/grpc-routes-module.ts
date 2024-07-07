import { Module, DynamicModule, Global } from '@nestjs/common';

type httpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"

export interface Route {
  method_http: httpMethods;
  method_grpc: string;
  pathname: string;
}

interface GrpcRoutesOptions {
  routes: Route[];
}

@Global()
@Module({})
export class GrpcRoutesModule {
  static routes: Route[] = [];

  static register(options: GrpcRoutesOptions): DynamicModule {
    this.routes = options.routes;

    return {
      module: GrpcRoutesModule,
    };
  }

  static getRoutes(): Route[] {
    return this.routes;
  }
}
