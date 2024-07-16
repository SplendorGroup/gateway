export interface AuthUser {
  id: string;
  name: string;
  email: string;
  email_verify: boolean;
  roles: string[];
  permissions: string[];
}

export interface OrderEntity {
  id: string;
  vehicle_id: string;
  user_id: string;
  status: string;
  payment_code: string;
  created_at: string;
  updated_at: string;
}

export interface FindAllOrderDTO {
  id?: string;
  vehicle_id?: string;
  user_id?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
}

export interface FindAllOrderRequest {
  query?: FindAllOrderDTO;
  user?: AuthUser;
}

export interface FindAllOrderResponse {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  in_page: number;
  data: OrderEntity[];
}

export interface FindOneOrderDTO {
  id: string;
}

export interface FindOneOrderRequest {
  params: FindOneOrderDTO;
  user?: AuthUser;
}

export interface FindOneOrderResponse {
  id: string;
  vehicle_id: string;
  user_id: string;
  status: string;
  payment_code: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDTO {
  vehicle_id: string;
  user_id: string;
  status: string;
  payment_code?: string;
}

export interface CreateOrderRequest {
  body: CreateOrderDTO;
  user?: AuthUser;
}

export interface CreateOrderResponse extends OrderEntity {}

export interface UpdateOrderDTO {
  vehicle_id?: string;
  user_id?: string;
  status?: string;
  payment_code?: string;
}

export interface UpdateOrderParamDTO {
  id: string;
}

export interface UpdateOrderRequest {
  params: UpdateOrderParamDTO;
  body: UpdateOrderDTO;
  user?: AuthUser;
}

export interface UpdateOrderResponse extends OrderEntity {}

export interface DeleteOrderDTO {
  id: string;
}

export interface DeleteOrderRequest {
  params: DeleteOrderDTO;
  user?: AuthUser;
}

export interface DeleteOrderResponse {}
