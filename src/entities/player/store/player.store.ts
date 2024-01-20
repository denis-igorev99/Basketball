import { defineStore } from "pinia";
import {
  PlayerDetailsModel,
  PlayerFilterModel,
  PlayerModel,
  PositionModel,
} from "../models";
import {
  PaginationResponseModel,
  ResponseModel,
  useMultimediaStore,
} from "@/entities";
import { ref } from "vue";
import { api } from "@/shared";

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
   * * Позиции
   */
  const positions = ref<PositionModel[]>(new Array<PositionModel>());

  /**
   * * Стор для работы с изображениями
   */
  const { upload, isBase64 } = useMultimediaStore();

  /**
   * * Получить список игроков
   * @param filter Фильтр
   * @returns Список игроков
   */
  const getPlayers = async (filter: PlayerFilterModel) =>
    new Promise<PaginationResponseModel<PlayerModel>>(
      async (resolve, reject) => {
        await api
          .get("/api/Player/GetPlayers", {
            params: {
              name: filter.Search,
              teamIds: filter.TeamIds,
              page: filter.CurrentPage,
              pageSize: filter.Size,
            },
            paramsSerializer: {
              indexes: true,
            },
          })
          .then(({ data }) =>
            resolve(
              new PaginationResponseModel<PlayerModel>({
                IsSuccess: true,
                Items: data.data?.map(
                  (x: any) =>
                    new PlayerModel({
                      Id: x.id,
                      Name: x.name,
                      AvatarUrl: x.avatarUrl,
                      Age: calculateAge(new Date(x.birthday)),
                      Height: x.height,
                      Number: x.number,
                      Position: x.position,
                      TeamId: x.team,
                      Weight: x.weight,
                      Birthday: new Date(x.birthday),
                    })
                ),
                Count: data.count,
              })
            )
          )
          .catch(() =>
            reject(
              new PaginationResponseModel<PlayerModel>({
                IsSuccess: false,
              })
            )
          );
      }
    );

  /**
   * * Получить детальную информацию команды
   * @param teamId Идентификатор команды
   */
  const getPlayerDetails = async (playerId: number) => {
    await api
      .get("/api/Player/Get", {
        params: {
          id: playerId,
        },
      })
      .then(({ data }) => {
        {
          playerDetails.value = new PlayerDetailsModel({
            Id: data.id,
            Name: data.name,
            AvatarUrl: data.avatarUrl,
            Age: calculateAge(new Date(data.birthday)),
            Height: data.height,
            Number: data.number,
            Position: data.position,
            Team: data.teamName,
            TeamId: data.team,
            Weight: data.weight,
            Birthday: new Date(data.birthday),
          });
        }
      })
      .catch(() => new PaginationResponseModel<PlayerDetailsModel>());
  };

  /**
   * * Добавить / обновить игрока
   * @returns Статус добавления / обновления
   */
  const updatePlayer = async () =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      if (isBase64(playerDetails.value.AvatarUrl)) {
        let response = await upload(playerDetails.value.Avatar);

        if (!response.IsSuccess) {
          return resolve(
            new ResponseModel<boolean>({
              IsSuccess: false,
              ErrorMessage: "Failed to load image. Please try again later.",
            })
          );
        }

        playerDetails.value.AvatarUrl = response.Value;
      }

      if (playerDetails.value.Id) {
        await api
          .put("/api/Player/Update", {
            id: playerDetails.value.Id,
            name: playerDetails.value.Name,
            number: playerDetails.value.Number,
            position: playerDetails.value.Position,
            team: playerDetails.value.TeamId,
            birthday: playerDetails.value.Birthday,
            height: playerDetails.value.Height,
            weight: playerDetails.value.Weight,
            avatarUrl: playerDetails.value.AvatarUrl,
          })
          .then(() => {
            playerDetails.value = new PlayerDetailsModel();
            return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
          })
          .catch((error) =>
            resolve(
              new ResponseModel<boolean>({
                IsSuccess: false,
                ErrorMessage: error,
              })
            )
          );
      } else {
        await api
          .post("/api/Player/Add", {
            name: playerDetails.value.Name,
            number: playerDetails.value.Number,
            position: playerDetails.value.Position,
            team: playerDetails.value.TeamId,
            birthday: playerDetails.value.Birthday,
            height: playerDetails.value.Height,
            weight: playerDetails.value.Weight,
            avatarUrl: playerDetails.value.AvatarUrl,
          })
          .then(() => {
            playerDetails.value = new PlayerDetailsModel();
            return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
          })
          .catch((error) => {
            return resolve(
              new ResponseModel<boolean>({
                IsSuccess: false,
                ErrorMessage: error,
              })
            );
          });
      }
    });

  /**
   * * Удалить игрока
   * @param teamId Идентификатор игрока
   * @returns Статус удаления
   */
  const deletePlayer = async (playerId: number) =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      await api
        .delete("/api/Player/Delete", {
          params: {
            id: playerId,
          },
        })
        .then(() => {
          playerDetails.value = new PlayerDetailsModel();
          return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
        })
        .catch(() => {
          return resolve(
            new ResponseModel<boolean>({
              IsSuccess: false,
              ErrorMessage: "Failed to delete player. Please try again later.",
            })
          );
        });
    });

  /**
   * * Получить список игроков команды
   * @param teamId Идентификатор команды
   */
  const getTeamPlayers = async (teamId: number) => {
    await getPlayers(
      new PlayerFilterModel({
        TeamIds: [teamId],
      })
    ).then((response) => {
      teamPleyars.value = new Array<PlayerDetailsModel>();
      if (response.IsSuccess) {
        teamPleyars.value = response.Items;
      }
    });
  };

  /**
   * * Получить список позиций
   */
  const getPositions = async () => {
    await api
      .get("/api/Player/GetPositions")
      .then(({ data }) => {
        {
          positions.value = data?.map(
            (x: string) =>
              new PositionModel({
                Id: x,
                Name: x,
              })
          );
        }
      })
      .catch(() => new PaginationResponseModel<PlayerDetailsModel>());
  };

  /**
   * * Расчитать возраст
   * @param birthDate Дата рождения
   * @returns Возраст
   */
  const calculateAge = (birthDate: Date) => {
    const currentDate = new Date();
    const dob = new Date(birthDate);

    let age = currentDate.getFullYear() - dob.getFullYear();

    const currentMonth = currentDate.getMonth();
    const dobMonth = dob.getMonth();

    if (
      currentMonth < dobMonth ||
      (currentMonth === dobMonth && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };
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
     * * Позиции
     */
    positions,
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
    /**
     * * Добавить / обновить игрока
     * @returns Статус добавления / обновления
     */
    updatePlayer,
    /**
     * * Получить список позиций
     */
    getPositions,
  };
});
