export class LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: { token: string } | null;
}
