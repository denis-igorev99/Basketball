import axios from "axios";
import { UserModel } from "@/entities";
import { useNotificationStore } from "../notification";
import { errorDictionary } from "./error-dictionary";

/**
 * * API url
 */
export const apiUrl = "http://dev.trainee.dex-it.ru";

/**
 * * API для авторизированного пользователя
 */
export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    options: {
      "Access-Control-Allow-Origin": "*",
    },
  },
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
    if (!e.response?.status) {
      localStorage.removeItem("user");
      location.href = "/";
      return;
    }

    let errorMessage =
      errorDictionary.find((x) => x.key == e.response?.status)?.value ??
      e.response?.data?.title ??
      e.response?.data ??
      e.message;

    return Promise.reject(errorMessage);
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
    let code = e.response?.status;
    let errorMessage;

    switch (code) {
      case 401:
        errorMessage = "Incorrect name or password. Please try again.";
        break;
      case 409:
        errorMessage = "An account with such data already exists.";
        break;
    }

    if (!errorMessage) errorMessage = e.response?.statusText ?? e.message;

    if (errorMessage) {
      const { error } = useNotificationStore();
      error(errorMessage);
    }
    return Promise.reject(e);
  }
);
