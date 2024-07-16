import { Controller, All, Req, Query, Body, Res, InternalServerErrorException } from '@nestjs/common';
import { GrpcProvider } from '../../infraestructure/providers/grpc-provider';
import { GrpcMethodFromRequest } from '../../core/decorators/grpc-method-from-request';
import { ParamsFromRequest } from '../../core/decorators/params-from-request';
import { RequestWithAuthUser } from '../../infraestructure/types/request-user';
import { HttpService } from '@nestjs/axios';
import { HttpUrlFromRequest } from '../../core/decorators/http-url-from-request';
import { Response } from 'express'
import { IsHttpProxy } from '../../core/decorators/is-http-proxy';
import { lastValueFrom } from 'rxjs';

@Controller()
export class ProxyController {
  constructor(
    private readonly grpcService: GrpcProvider,
    private readonly httpService: HttpService,
  ) {}

  @All('*')
  @IsHttpProxy()
  async proxyHttp(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @ParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @Res() res: Response,
    @HttpUrlFromRequest() url: string,
  ) {
    const method = req.method.toLowerCase();
    const headers = req.headers;

    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          headers,
          data: data.body,
          params: data.query,
        }),
      );

      return res.status(Number(response.status)).send(response.data);
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  @All(['vehicle/*', 'vehicle'])
  async proxyVehicles(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @ParamsFromRequest() params: Record<string, string>,
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
    @ParamsFromRequest() params: Record<string, string>,
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
    @ParamsFromRequest() params: Record<string, string>,
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
    @ParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    console.log({ method });
    console.log(data);

    return await this.grpcService.proxyUser(method, data);
  }

  @All(['permission/*', 'permission'])
  async proxyPermission(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @ParamsFromRequest() params: Record<string, string>,
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
    @ParamsFromRequest() params: Record<string, string>,
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
    @ParamsFromRequest() params: Record<string, string>,
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

  @All(['order/*', 'order'])
  async proxyOrder(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @ParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    return await this.grpcService.proxyOrder(method, data);
  }

  @All(['client/*', 'client'])
  async proxyClient(
    @Req() req: RequestWithAuthUser,
    @Body() body: unknown,
    @ParamsFromRequest() params: Record<string, string>,
    @Query() query: Record<string, string>,
    @GrpcMethodFromRequest() method: string,
  ) {
    const data = {
      body,
      query,
      params,
      user: req.user,
    };

    return await this.grpcService.proxyClient(method, data);
  }
}
