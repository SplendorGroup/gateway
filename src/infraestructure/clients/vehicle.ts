import { ClientOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { VehicleIdRequest, VehicleRequest, VehicleResponse, VehiclesFindAllResponse } from './types/vehicle';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const vehiclesGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'vehicle',
    protoPath: resolve('src/infraestructure/proto/vehicle.proto'),
    url: process.env.GRPC_VEHICLE_URL,
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

export interface VehicleGrpcClientMethods {
    FindAll(data: VehicleRequest): Promise<VehiclesFindAllResponse>;
    FindById(data: VehicleIdRequest): Promise<VehicleResponse>;
    FindOne(data: VehicleRequest): Promise<VehicleResponse>;
    Create(data: VehicleRequest): Promise<VehicleResponse>;
    Update(data: VehicleIdRequest): Promise<VehicleResponse>;
}
  
export type VehicleMethodsName = keyof VehicleGrpcClientMethods