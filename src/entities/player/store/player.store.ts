import { defineStore } from "pinia";
import { PlayerDetailsModel, PlayerFilterModel, PlayerModel } from "../models";
import { PaginationFilterModel, PaginationResponseModel } from "@/entities";
import Img from "@/shared/assets/img/user.png";
import { ref } from "vue";

/**
 * * Стор для работы с игроками
 */
export const usePlayerStore = defineStore("player-store", () => {
  /**
   * * Детальные данные игрока
   */
  const playerDetails = ref<PlayerDetailsModel>(new PlayerDetailsModel());

  /**
   * * Игроки команды
   */
  const teamPleyars = ref<PlayerDetailsModel[]>(
    new Array<PlayerDetailsModel>()
  );

  /**
   * * Получить список игроков команды
   * @param teamId Идентификатор команды
   */
  const getTeamPlayers = async (teamId: number) => {
    teamPleyars.value = new Array<PlayerDetailsModel>();
    for (let i = 1; i < 10; i++) {
      teamPleyars.value.push(
        new PlayerDetailsModel({
          Id: i,
          Name: "Denver Nuggets",
          AvatarUrl: Img,
          Age: 27,
          Height: 206,
          Number: i,
          Position: "Forward",
          Team: "Denver Nuggets",
          Weight: 95,
        })
      );
    }
  };

  /**
   * * Получить детальную информацию команды
   * @param teamId Идентификатор команды
   */
  const getPlayerDetails = async (playerId: number) => {
    playerDetails.value = new PlayerDetailsModel({
      Id: 1,
      Name: "Denver Nuggets",
      AvatarUrl: Img,
      Age: 27,
      Height: 206,
      Number: 1,
      Position: "Forward",
      Team: "Denver Nuggets",
      Weight: 95,
    });
  };

  /**
   * * Удалить игрока
   * @param teamId Идентификатор игрока
   * @returns Статус удаления
   */
  const deletePlayer = async (playerId: number) =>
    new Promise<boolean>((resolve) => {
      playerDetails.value = new PlayerDetailsModel();
      return resolve(true);
    });

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
     * * Детальные данные игрока
     */
    playerDetails,
    /**
     * * Игроки команды
     */
    teamPleyars,
    /**
     * * Получить список игроков команды
     * @param teamId Идентификатор команды
     */
    getTeamPlayers,
    /**
     * * Получить детальную информацию команды
     * @param teamId Идентификатор команды
     */
    getPlayerDetails,
    /**
     * * Удалить игрока
     * @param teamId Идентификатор игрока
     * @returns Статус удаления
     */
    deletePlayer,
    /**
     * * Получить список игроков
     * @param filter Фильтр
     * @returns Список игроков
     */
    getPlayers,
  };
});
