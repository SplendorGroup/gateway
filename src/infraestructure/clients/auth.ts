import { ClientOptions, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LoginOrRegisterWithOAuthRequest,
  LoginOrRegisterWithOAuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RequestConfirmEmailRequest,
  RequestConfirmEmailResponse,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
} from './types/auth';
import { credentials } from '../config/grpc';
import 'dotenv/config';

export const authGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '..','/proto/auth.proto'),
    url: process.env.GRPC_AUTH_URL,
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

export interface AuthGrpcClientMethods {
  Login(data: LoginRequest): Promise<LoginResponse>;
  Register(data: RegisterRequest): Promise<RegisterResponse>;
  LoginOrRegisterWithOAuth(
    data: LoginOrRegisterWithOAuthRequest,
  ): Promise<LoginOrRegisterWithOAuthResponse>;
  ForgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
  ResetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse>;
  RequestConfirmEmail(
    data: RequestConfirmEmailRequest,
  ): Promise<RequestConfirmEmailResponse>;
  ConfirmEmail(data: ConfirmEmailRequest): Promise<ConfirmEmailResponse>;
}

export type AuthMethodsName = keyof AuthGrpcClientMethods;
