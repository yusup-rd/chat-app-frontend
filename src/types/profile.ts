export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name?: string;
  gender?: string;
  dob?: string;
  height?: number;
  weight?: number;
  interests?: string[];
  avatar?: string;
}

export type GetProfileResponse = UserProfile;

export interface PostProfileRequest {
  name?: string;
  dob?: string;
  gender?: string;
  height?: number;
  weight?: number;
  avatar?: string;
}

export interface PostProfileResponse {
  message: string;
}

export interface PutProfileRequest {
  name?: string;
  dob?: string;
  gender?: string;
  height?: number;
  weight?: number;
  interests?: string[];
  avatar?: string;
}

export interface PutProfileResponse {
  message: string;
}
