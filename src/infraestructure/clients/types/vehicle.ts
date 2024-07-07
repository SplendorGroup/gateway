export interface Vehicle {
    id?: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
  }
  
  export interface VehicleFilter {
    id?: string;
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
  }
  
  export interface VehicleRequest {
    filter?: VehicleFilter;
    user?: User;
  }
  
  export interface VehicleIdRequest {
    id: string;
  }
  
  export interface VehicleResponse {
    vehicle: Vehicle;
  }
  
  export interface VehiclesFindAllResponse {
    total: number;
    page: number;
    per_page: number;
    in_page: number;
    data: Vehicle[];
  }
  
  export interface VehiclesResponse {
    vehicles: Vehicle[];
  }
  
