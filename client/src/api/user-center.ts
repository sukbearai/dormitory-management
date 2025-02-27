import { type HttpResponse, request } from '@/utils/request';

export interface UserInfo {
  real_name: string;
  contact: string;
}

interface UserPwd {
  oldPassword: string;
  newPassword: string;
}

export function saveUserInfo(data: UserInfo) {
  return request<HttpResponse>('/api/user/save-info', {
    method: 'POST',
    data
  });
}

export function updateUserPwd(data: UserPwd) {
  return request<HttpResponse>('/api/user/update-pwd', {
    method: 'POST',
    data
  });
}
