import { Controller, All, Req, Query, Body } from '@nestjs/common';
import { GrpcProvider } from '../../infraestructure/providers/grpc-provider';
import { GrpcMethodFromRequest } from '../../core/decorators/grpc-method-from-request';
import { GrpcParamsFromRequest } from '../../core/decorators/grpc-params-from-request';
import { RequestWithAuthUser } from '../../infraestructure/types/request-user';

@Controller()
export class ProxyController {
  constructor(private readonly grpcService: GrpcProvider) {}

  @All(['vehicle/*', 'vehicle'])
  async proxyVehicles(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyVehicles(method, data);
  }

  @All(['brand/*', 'brand'])
  async proxyBrand(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyBrand(method, data);
  }

  @All(['color/*', 'color'])
  async proxyColor(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyColor(method, data);
  }

  @All(['user/*', 'user'])
  async proxyUser(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyUser(method, data);
  }

  @All(['permission/*', 'permission'])
  async proxyPermission(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyPermission(method, data);
  }

  @All(['role/*', 'role'])
  async proxyRole(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log(data);

    return await this.grpcService.proxyRole(method, data);
  }

  @All(['auth/*', 'auth'])
  async proxyAuth(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @GrpcParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    return await this.grpcService.proxyAuth(method, data);
  }
}
