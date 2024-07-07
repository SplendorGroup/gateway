import { ClientOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  Entity,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
  DeleteResponse,
  SyncPermissionsRequest,
  SyncPermissionsResponse,
  GetPermissionsRequest,
  GetPermissionsResponse,
} from './types/role';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const roleGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'role',
    protoPath: resolve('src/infraestructure/proto/role.proto'),
    url: process.env.GRPC_ROLE_URL,
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

export interface RoleGrpcClientMethods {
  FindAll(data: FindAllRequest): Promise<FindAllResponse>;
  FindOne(data: FindOneRequest): Promise<Entity>;
  Create(data: CreateRequest): Promise<Entity>;
  Update(data: UpdateRequest): Promise<Entity>;
  Delete(data: DeleteRequest): Promise<DeleteResponse>;
  SyncPermissions(
    data: SyncPermissionsRequest,
  ): Promise<SyncPermissionsResponse>;
  GetPermissions(data: GetPermissionsRequest): Promise<GetPermissionsResponse>;
}

export type RoleMethodsName = keyof RoleGrpcClientMethods;
