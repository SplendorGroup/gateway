import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BrandIdRequest, BrandRequest, BrandResponse, BrandsFindAllResponse } from './types/brand';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const brandGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'brand',
    protoPath: join(__dirname, '..','/proto/brand.proto'),
    url: process.env.GRPC_BRAND_URL,
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

export interface BrandGrpcClientMethods {
    FindAll(data: BrandRequest): Promise<BrandsFindAllResponse>;
    FindById(data: BrandIdRequest): Promise<BrandResponse>;
    FindOne(data: BrandRequest): Promise<BrandResponse>;
    Create(data: BrandRequest): Promise<BrandResponse>;
    Update(data: BrandIdRequest): Promise<BrandResponse>;
}
  
export type BrandMethodsName = keyof BrandGrpcClientMethods