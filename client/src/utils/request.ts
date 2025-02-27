import type { AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';

export interface HttpResponse<T = unknown> {
    code: number
    message: string
    data: T
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      Message.error({
        content: res.message || '错误',
        duration: 5 * 1000,
      });
      if (res.code === 401 && !['/login', '/register'].includes(response.config.url || '')) {
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
    if (error?.message?.includes?.('timeout')) {
      Message.error('请求超时');
    } else {
      Message.error({
        content: error.message || '请求错误',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig
): Promise<ResponseType> => {
  return axiosInstance({
    url,
    ...options,
  }) as Promise<ResponseType>;
};

export { axiosInstance, request };