import { ErrorResponse } from '@/types/error';
import {
  GetProfileResponse,
  PostProfileRequest,
  PostProfileResponse,
  PutProfileRequest,
  PutProfileResponse,
  UserProfile,
} from '@/types/profile';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw data as ErrorResponse;
  }
  return data as T;
}

export async function getProfile(token: string): Promise<GetProfileResponse | ErrorResponse> {
  const res = await fetch(`${API_URL}/getProfile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<GetProfileResponse>(res);
}

export async function getAllProfiles(token: string): Promise<UserProfile[] | ErrorResponse> {
  const res = await fetch(`${API_URL}/getAllProfiles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<UserProfile[]>(res);
}

export async function createProfile(
  token: string,
  data: PostProfileRequest,
): Promise<PostProfileResponse | ErrorResponse> {
  const res = await fetch(`${API_URL}/createProfile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse<PostProfileResponse>(res);
}

export async function updateProfile(
  token: string,
  data: PutProfileRequest,
): Promise<PutProfileResponse | ErrorResponse> {
  const res = await fetch(`${API_URL}/updateProfile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse<PutProfileResponse>(res);
}
