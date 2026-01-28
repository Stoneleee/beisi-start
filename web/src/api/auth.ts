import axios from 'axios';

export interface LoginResponse {
  code: number;
  message: string;
  data: { token: string } | null;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`/api/login`, {
    username,
    password,
  });
  return response.data;
}
