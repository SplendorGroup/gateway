import { ClientOptions, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  Entity,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
  DeleteResponse,
} from './types/permission';
import { credentials } from '../config/grpc';
import 'dotenv/config';


export const permissionGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'permission',
    protoPath: join(__dirname, '..','/proto/permission.proto'),
    url: process.env.GRPC_PERMISSION_URL,
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

export interface PermissionGrpcClientMethods {
  FindAll(data: FindAllRequest): Promise<FindAllResponse>;
  FindOne(data: FindOneRequest): Promise<Entity>;
  Create(data: CreateRequest): Promise<Entity>;
  Update(data: UpdateRequest): Promise<Entity>;
  Delete(data: DeleteRequest): Promise<DeleteResponse>;
}

export type PermissionMethodsName = keyof PermissionGrpcClientMethods;
