/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import API from '../index';
import { ESecondaryRoutes, EMainRoutes } from './types';

const HEADERS: Readonly<Record<string, string>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const MEDIA_HEADERS: Readonly<Record<string, string>> = {
  'content-type': 'multipart/form-data',
};

class Http {
  private token: null | string = null;

  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance ? this.instance : this.initHttp();
  }

  private errorParser = async (payload: any) => {
    if (payload?.message?.includes?.('Network Error')) {
      // TODO: Show popover with error message if any
    }

    throw payload;
  };

  private injectToken = async (
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    if (this.token) {
      config.headers!.authorization = this.token;
    } else {
      const token = API.LocalStorage.get('token');
      if (token) {
        this.token = token;
        config.headers!.authorization = token;
      }
    }

    return config;
  };

  mediaHeaders = { headers: MEDIA_HEADERS };

  buildPath = (path: EMainRoutes, trailingPath: ESecondaryRoutes) =>
    `${path}${trailingPath}`;

  private initHttp() {
    const http = axios.create({
      headers: HEADERS,
      baseURL: 'http://localhost:4000',
    });

    http.interceptors.request.use(this.injectToken);
    http.interceptors.response.use((config) => config, this.errorParser);

    this.instance = http;
    return http;
  }

  async updateToken() {
    const token = await API.LocalStorage.get('token');

    this.token = token;
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}

export default new Http();
