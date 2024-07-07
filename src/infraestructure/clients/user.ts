import { ClientOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
  DeleteResponse,
  SyncRoleWithUserRequest,
  SyncRoleWithUserResponse,
  Entity,
} from './types/user';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const userGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: resolve('src/infraestructure/proto/user.proto'),
    url: process.env.GRPC_USER_URL,
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

export interface UserGrpcClientMethods {
  FindAll(data: FindAllRequest): Promise<FindAllResponse>;
  FindOne(data: FindOneRequest): Promise<FindOneResponse>;
  Create(data: CreateRequest): Promise<Entity>;
  Update(data: UpdateRequest): Promise<Entity>;
  Delete(data: DeleteRequest): Promise<DeleteResponse>;
  SyncRoleWithUser(
    data: SyncRoleWithUserRequest,
  ): Promise<SyncRoleWithUserResponse>;
}

export type UserMethodsName = keyof UserGrpcClientMethods;
