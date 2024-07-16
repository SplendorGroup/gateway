import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ColorIdRequest, ColorRequest, ColorResponse, ColorsFindAllResponse } from './types/color';
import { credentials } from '../config/grpc'
import 'dotenv/config';

export const colorGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'color',
    protoPath: join(__dirname, '..','/proto/color.proto'),
    url: process.env.GRPC_COLOR_URL,
    gracefulShutdown: true,
    credentials,
    loader: {
      keepCase: true,
      defaults: true,
      json: true,
      arrays: true,
    },
  },
};

export interface ColorGrpcClientMethods {
    FindAll(data: ColorRequest): Promise<ColorsFindAllResponse>;
    FindById(data: ColorIdRequest): Promise<ColorResponse>;
    FindOne(data: ColorRequest): Promise<ColorResponse>;
    Create(data: ColorRequest): Promise<ColorResponse>;
    Update(data: ColorIdRequest): Promise<ColorResponse>;
}
  
export type ColorMethodsName = keyof ColorGrpcClientMethods