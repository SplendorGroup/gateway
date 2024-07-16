import { ClientOptions, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  FindAllOrderRequest,
  FindAllOrderResponse,
  FindOneOrderRequest,
  FindOneOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
} from './types/order';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const orderGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'order',
    protoPath: join(__dirname, '..','/proto/order.proto'),
    url: process.env.GRPC_ORDER_URL,
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

export interface OrderGrpcClientMethods {
  CreateOrder(data: CreateOrderRequest): Promise<CreateOrderResponse>;
  UpdateOrder(data: UpdateOrderRequest): Promise<UpdateOrderResponse>;
  GetOrders(data: FindAllOrderRequest): Promise<FindAllOrderResponse>;
  GetOrderById(data: FindOneOrderRequest): Promise<FindOneOrderResponse>;
  DeleteOrder(data: DeleteOrderRequest): Promise<DeleteOrderResponse>;
}

export type OrderMethodsName = keyof OrderGrpcClientMethods;
