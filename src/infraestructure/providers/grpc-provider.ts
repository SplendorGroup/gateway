import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import {
  VehicleGrpcClientMethods,
  vehiclesGrpcClientOptions,
} from '../clients/vehicle';
import { lastValueFrom } from 'rxjs';
import {
  ColorGrpcClientMethods,
  colorGrpcClientOptions,
} from '@/clients/color';
import {
  BrandGrpcClientMethods,
  brandGrpcClientOptions,
} from '@/clients/brand';
import { UserGrpcClientMethods, userGrpcClientOptions } from '@/clients/user';
import {
  PermissionGrpcClientMethods,
  permissionGrpcClientOptions,
} from '@/clients/permission';
import { RoleGrpcClientMethods, roleGrpcClientOptions } from '@/clients/role';
import { AuthGrpcClientMethods, authGrpcClientOptions } from '@/clients/auth';
import {
  OrderGrpcClientMethods,
  orderGrpcClientOptions,
} from '@/clients/order';
import { ClientGrpcClientMethods, clientGrpcClientOptions } from '@/clients/client';

@Injectable()
export class GrpcProvider implements OnModuleInit {
  @Client(vehiclesGrpcClientOptions)
  private vehiclesClient: ClientGrpc;
  private vehicleService: VehicleGrpcClientMethods;

  @Client(colorGrpcClientOptions)
  private colorClient: ClientGrpc;
  private colorService: ColorGrpcClientMethods;

  @Client(brandGrpcClientOptions)
  private brandClient: ClientGrpc;

  private brandService: BrandGrpcClientMethods;

  @Client(userGrpcClientOptions)
  private userClient: ClientGrpc;
  private userService: UserGrpcClientMethods;

  @Client(permissionGrpcClientOptions)
  private permissionClient: ClientGrpc;
  private permissionService: PermissionGrpcClientMethods;

  @Client(roleGrpcClientOptions)
  private roleClient: ClientGrpc;

  private roleService: RoleGrpcClientMethods;

  @Client(authGrpcClientOptions)
  private authClient: ClientGrpc;
  private authService: AuthGrpcClientMethods;

  @Client(orderGrpcClientOptions)
  private orderClient: ClientGrpc;
  private orderService: OrderGrpcClientMethods;

  @Client(clientGrpcClientOptions)
  private clientClient: ClientGrpc;
  private clientService: ClientGrpcClientMethods;

  onModuleInit() {
    this.vehicleService = this.vehiclesClient.getService('VehicleService');
    this.brandService = this.brandClient.getService('BrandService');
    this.colorService = this.colorClient.getService('ColorService');
    this.userService = this.userClient.getService('UserService');
    this.permissionService =
      this.permissionClient.getService('PermissionService');
    this.roleService = this.roleClient.getService('RoleService');
    this.authService = this.authClient.getService('AuthService');
    this.orderService = this.orderClient.getService('OrderService');
    this.clientService = this.clientClient.getService('ClientService');
  }

  async proxyVehicles(method: string, data: any) {
    return await lastValueFrom(this.vehicleService[method](data));
  }

  async proxyColor(method: string, data: any) {
    return await lastValueFrom(this.colorService[method](data));
  }

  async proxyBrand(method: string, data: any) {
    return await lastValueFrom(this.brandService[method](data));
  }

  async proxyUser(method: string, data: any) {
    return await lastValueFrom(this.userService[method](data));
  }

  async proxyPermission(method: string, data: any) {
    return await lastValueFrom(this.permissionService[method](data));
  }

  async proxyRole(method: string, data: any) {
    return await lastValueFrom(this.roleService[method](data));
  }

  async proxyAuth(method: string, data: any) {
    return await lastValueFrom(this.authService[method](data));
  }

  async proxyOrder(method: string, data: any) {
    return await lastValueFrom(this.orderService[method](data));
  }

  async proxyClient(method: string, data: any) {
    return await lastValueFrom(this.clientService[method](data));
  }
}
