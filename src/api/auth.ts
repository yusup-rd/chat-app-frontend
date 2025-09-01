import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '@/types/auth';
import { ErrorResponse } from '@/types/error';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw data as ErrorResponse;
  }
  return data as T;
}

export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse | ErrorResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<RegisterResponse>(res);
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<LoginResponse>(res);
}
