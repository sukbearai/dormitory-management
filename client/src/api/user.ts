import type { LoginResponse, MenuItem, RegisterResponse, UserInfo } from '@/types/api';
import type { HttpResponse} from '@/utils/request';
import { request } from '@/utils/request';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export function login(data: LoginData) {
  return request<HttpResponse<LoginResponse>>('/api/user/login', {
    method: 'POST',
    data
  });
}

export function logout() {
  return request<HttpResponse>('/api/user/logout', {
    method: 'POST'
  });
}

export function getUserInfo() {
  return request<HttpResponse<UserInfo>>('/api/user/info', {
    method: 'POST'
  });
}

export function getMenuList() {
  return request<HttpResponse<MenuItem[]>>('/api/user/menu', {
    method: 'POST'
  });
}

export function register(data: RegisterData) {
  return request<HttpResponse<RegisterResponse>>('/api/user/register', {
    method: 'POST',
    data
  });
}