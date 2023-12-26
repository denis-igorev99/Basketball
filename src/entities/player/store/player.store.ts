import { defineStore } from "pinia";
import { PlayerFilterModel, PlayerModel } from "../models";
import { PaginationFilterModel, PaginationResponseModel } from "@/entities";
import Img from "@/shared/assets/img/user.png";

/**
 * * Стор для работы с игроками
 */
export const usePlayerStore = defineStore("player-store", () => {
  /**
   * * Получить список игроков
   * @param filter Фильтр
   * @returns Список игроков
   */
  const getPlayers = async (filter: PlayerFilterModel) =>
    new Promise<PaginationResponseModel<PlayerModel>>((resolve) => {
      return resolve(
        new PaginationResponseModel<PlayerModel>({
          IsSuccess: true,
          Count: 6,
          Items: [
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
            new PlayerModel({
              Id: 1,
              AvatarUrl: Img,
              Name: "Kyle Anderson",
              Number: 1,
              Team: "Portland trail blazers",
            }),
          ],
        })
      );
    });
  return {
    /**
     * * Получить список игроков
     * @param filter Фильтр
     * @returns Список игроков
     */
    getPlayers,
  };
});
