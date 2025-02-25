import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // 如果状态码不是 200，则判定为错误
    if (res.code !== 200) {
      Message.error({
        content: res.message || '错误',
        duration: 5 * 1000,
      });
      // 401: 未授权或 token 失效
      if (res.code === 401 && response.config.url !== '/login') {
        Modal.error({
          title: '确认登出',
          content: '您已被登出，请重新登录',
          okText: '重新登录',
          async onOk() {
            const userStore = useUserStore();
            await userStore.logout();
            window.location.reload();
          },
        });
      }
      return Promise.reject(new Error(res.message || '错误'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message || '请求错误',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);