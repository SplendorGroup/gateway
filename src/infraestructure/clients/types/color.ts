export interface Color {
    id?: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
  }
  
  export interface ColorFilter {
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
  
  export interface ColorRequest {
    filter?: ColorFilter;
    user?: User;
  }
  
  export interface ColorIdRequest {
    id: string;
  }
  
  export interface ColorResponse {
    Color: Color;
  }
  
  export interface ColorsFindAllResponse {
    total: number;
    page: number;
    per_page: number;
    in_page: number;
    data: Color[];
  }
  
  export interface ColorsResponse {
    Colors: Color[];
  }
  
