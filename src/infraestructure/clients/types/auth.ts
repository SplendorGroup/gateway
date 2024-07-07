export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginRequest {
  body: LoginDTO;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  body: RegisterDTO;
}

export interface RegisterResponse {}

export interface LoginOrRegisterWithOAuthDTO {
  token: string;
}

export interface LoginOrRegisterWithOAuthRequest {
  body: LoginOrRegisterWithOAuthDTO;
}

export interface LoginOrRegisterWithOAuthResponse {
  access_token: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ForgotPasswordRequest {
  body: ForgotPasswordDTO;
}

export interface ForgotPasswordResponse {}

export interface ResetPasswordDTO {
  email: string;
  token: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  body: ResetPasswordDTO;
}

export interface ResetPasswordResponse {}

export interface RequestConfirmEmailDTO {
  email: string;
}

export interface RequestConfirmEmailRequest {
  user: RequestConfirmEmailDTO;
}

export interface RequestConfirmEmailResponse {}

export interface ConfirmEmailDTO {
  email: string;
  token: string;
}

export interface ConfirmEmailRequest {
  body: ConfirmEmailDTO;
}

export interface ConfirmEmailResponse {}
