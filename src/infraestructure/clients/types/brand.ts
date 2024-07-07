export interface Brand {
    id?: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
  }
  
  export interface BrandFilter {
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
  
  export interface BrandRequest {
    filter?: BrandFilter;
    user?: User;
  }
  
  export interface BrandIdRequest {
    id: string;
  }
  
  export interface BrandResponse {
    Brand: Brand;
  }
  
  export interface BrandsFindAllResponse {
    total: number;
    page: number;
    per_page: number;
    in_page: number;
    data: Brand[];
  }
  
  export interface BrandsResponse {
    Brands: Brand[];
  }
  
