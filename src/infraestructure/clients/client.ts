import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { credentials } from '../config/grpc';
import 'dotenv/config';
import { ClientEntity, CreateClientRequest, DeleteClientRequest, DeleteClientResponse, FindAllClientRequest, FindAllClientResponse, FindOneClientRequest, UpdateClientRequest } from './types/client';

export const clientGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'client',
    protoPath: join(__dirname, '..','/proto/client.proto'),
    url: process.env.GRPC_CLIENT_URL,
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

export interface ClientGrpcClientMethods {
  CreateClient(data: CreateClientRequest): Promise<ClientEntity>;
  UpdateClient(data: UpdateClientRequest): Promise<ClientEntity>;
  GetClients(data: FindAllClientRequest): Promise<FindAllClientResponse>;
  GetClientById(data: FindOneClientRequest): Promise<ClientEntity>;
  DeleteClient(data: DeleteClientRequest): Promise<DeleteClientResponse>;
}

export type ClientMethodsName = keyof ClientGrpcClientMethods;
