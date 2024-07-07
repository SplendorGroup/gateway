export interface AuthUser {
  id: string;
  name: string;
  email: string;
  email_verify: boolean;
  roles: string[];
  permissions: string[];
}

export interface Entity {
  id: string;
  name: string;
  label: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FindAllDTO {
  id?: string;
  name?: string;
  label?: string;
  page?: string;
  start_date?: string;
  end_date?: string;
}

export interface FindAllRequest {
  query?: FindAllDTO;
  user?: AuthUser;
}

export interface FindAllResponse {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  in_page: number;
  data: Entity[];
}

export interface FindOneDTO {
  id: string;
}

export interface FindOneRequest {
  params: FindOneDTO;
  user?: AuthUser;
}

export interface CreateDTO {
  name: string;
  label: string;
  description: string;
}

export interface CreateRequest {
  body: CreateDTO;
  user?: AuthUser;
}

export interface UpdateDTO {
  name: string;
  label: string;
  description: string;
}

export interface UpdateParamDTO {
  id: string;
}

export interface UpdateRequest {
  params: UpdateParamDTO;
  body: UpdateDTO;
  user?: AuthUser;
}

export interface DeleteDTO {
  id: string;
}

export interface DeleteRequest {
  params: DeleteDTO;
  user?: AuthUser;
}

export interface DeleteResponse {}
