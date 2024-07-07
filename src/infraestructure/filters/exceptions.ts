import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ThrottlerException } from '@nestjs/throttler';
import { Request } from 'express';


@Catch()
export class ExceptionsFilter implements ExceptionFilter {

  private httpAdapter: AbstractHttpAdapter;

  constructor(
    adapterHost: HttpAdapterHost
  ) {
    this.httpAdapter = adapterHost.httpAdapter;
  }


  catch(exception: ThrottlerException | RpcException | HttpException | Error | any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest();

    console.log(exception)

    exception = this.throtllerExceptionNormalize(exception)

    const status = this.getStatus(exception)
    const body = this.mountErrorBody(exception, request)
    return this.httpAdapter.reply(response, body, status)
  }

  throtllerExceptionNormalize(exception: RpcException | HttpException | Error | any) {
    if (exception instanceof ThrottlerException) {
      return {
        response: 'Too Many Requests',
        name: 'Too Many Requests',
        status: 429,
      }
    }
    return exception
  }


  getDetails(exception: RpcException | HttpException | Error | any) {
    try {
      return JSON.parse(exception.details)
    } catch {
      return null
    }
  }

  getMessage(exception: RpcException | HttpException | Error | any) {
    const details = this.getDetails(exception)
      return details?.message ?? exception?.message 
  }

  getData(exception: RpcException | HttpException | Error | any) {
    const details = this.getDetails(exception)
    return details?.data ?? exception?.data ?? []
  }

  getName(exception: RpcException | HttpException | Error | any) {
    const details = this.getDetails(exception)
    return details?.name ?? exception?.response?.error ?? exception?.name
  }

  getPath(request: Request) {
    return request.path
  }

  getStatus(exception: RpcException | HttpException | Error | any) {
    const details = this.getDetails(exception)
    return details?.status ?? exception?.status ?? 404
  }

  getCode(exception: RpcException | HttpException | Error | any) {
    return exception?.code ?? exception?.response?.status ?? exception?.status ?? 0
  }

  mountErrorBody(exception: RpcException | HttpException | Error, request: Request) {
    const code = this.getCode(exception)
    const name = this.getName(exception)
    const status = this.getStatus(exception)
    const message = this.getMessage(exception)
    const path = this.getPath(request)
    const data = this.getData(exception)

    return {
      success: false,
      error: {
        id: crypto.randomUUID(),
        status,
        name,
        details: {
          timestamp: new Date().toISOString(),
          path,
          code,
          description: message,
          data
        }
      }
    }
  }
}