import { Module, DynamicModule, Global } from '@nestjs/common';

type httpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"

export interface Route {
  protocol: "http" | "grpc";
  method_http?: httpMethods;
  method_grpc?: string;
  url?: string;
  permissions?: string[]
  pathname: string;
  is_public: boolean;
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
