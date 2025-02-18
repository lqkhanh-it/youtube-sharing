import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiBase = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiVersion = import.meta.env.VITE_API_VERSION;

const axiosInstance = axios.create({
  baseURL: apiBase + apiVersion,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-api-key': apiKey,
    authorization: `Bearer ${apiKey}`,
  },
});

const fetchRequest = async <TResponse>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<TResponse> => {
  try {
    const data = localStorage.getItem('user') as string;
    const tempConfig = { ...config };

    if (data) {
      const tokens = JSON.parse(data)?.tokens;
      tempConfig.headers = {
        ...config.headers,
        authorization: `Bearer ${tokens?.accessToken}`,
      };
    }

    const response: AxiosResponse<TResponse> = await axiosInstance(url, tempConfig);
    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

const request = {
  get: <TResponse>(url: string) => fetchRequest<TResponse>(url, { method: 'GET' }),

  delete: <TResponse>(url: string) => fetchRequest<TResponse>(url, { method: 'DELETE' }),

  post: <TBody, TResponse>(url: string, body?: TBody) =>
    fetchRequest<TResponse>(url, {
      method: 'POST',
      data: body,
    }),

  put: <TBody, TResponse>(url: string, body?: TBody) =>
    fetchRequest<TResponse>(url, {
      method: 'PUT',
      data: body,
    }),
};

export enum ERequestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export enum HttpPaths {
  LOGOUT = '/logout',
  LOGIN = '/login/basic',
  SIGNUP = '/signup/basic',
  REFRESH_TOKEN = '/token/refresh',
}

export default request;
