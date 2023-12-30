import { defineStore } from "pinia";
import { ResponseModel } from "@/entities";
import { api, apiUrl } from "@/shared";

/**
 * * Стор для работы с изображениями
 */
export const useMultimediaStore = defineStore("multimedia-store", () => {
  /**
   * * Строка в base64
   * @param value Строка
   * @returns Является ли строка base64
   */
  const isBase64 = (value: string) => value?.indexOf("base64") > -1;

  /**
   * * Загрузить изображение
   * @param base64 Строка base64
   * @returns Загружаемое изображение
   */
  const upload = async (file: File) =>
    new Promise<ResponseModel<string>>(async (resolve) => {
      const formData = new FormData();
      formData.append("file", file);
      await api
        .post("/api/Image/SaveImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) =>
          resolve(
            new ResponseModel<string>({
              IsSuccess: true,
              Value: `${apiUrl}${data}`,
            })
          )
        )
        .catch(() => resolve(new ResponseModel<string>()));
    });
  return {
    /**
     * * Строка в base64
     * @param value Строка
     * @returns Является ли строка base64
     */
    isBase64,
    /**
     * * Загрузить изображение
     * @param base64 Строка base64
     * @returns Загружаемое изображение
     */
    upload,
  };
});
