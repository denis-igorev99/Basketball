import axios from "axios";
import { UserModel, useNotificationStore } from "@/entities";

/**
 * * API url
 */
export const apiUrl = "http://dev.trainee.dex-it.ru";

/**
 * * API для авторизированного пользователя
 */
export const api = axios.create({
  baseURL: apiUrl,
});

/**
 * * Обработчик входных параметров
 */
api.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.Authorization = `Bearer ${
        (JSON.parse(user) as UserModel).Token
      }`;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  }
);

/**
 * * Обработчик ответов запросов
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    let errorMessage = e.response?.data?.title ?? e.response?.data ?? e.message;
    if (errorMessage) {
      localStorage.removeItem("user");
      location.href = "/";
      const { error } = useNotificationStore();
      error(errorMessage);
    }
    return Promise.reject(e);
  }
);

/**
 * * API для неавторизированного пользователя
 */
export const noAuthApi = axios.create({
  baseURL: apiUrl,
});

/**
 * * Обработчик ответов запросов
 */
noAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    let errorMessage = e.response?.statusText ?? e.message;    
    if (errorMessage) {
      const { error } = useNotificationStore();
      error(errorMessage);
    }
    return Promise.reject(e);
  }
);
