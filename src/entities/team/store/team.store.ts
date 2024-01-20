import { defineStore } from "pinia";
import { TeamDetailsModel, TeamModel } from "../models";
import {
  PaginationFilterModel,
  PaginationResponseModel,
  ResponseModel,
  useMultimediaStore,
} from "@/entities";
import { ref } from "vue";
import { api } from "@/shared";

/**
 * * Стор для работы с командой
 */
export const useTeamStore = defineStore("team-store", () => {
  /**
   * * Детальные данные команды
   */
  const teamDetails = ref<TeamDetailsModel>(new TeamDetailsModel());

  /**
   * * Список команд
   */
  const teams = ref<TeamModel[]>(new Array<TeamModel>());

  /**
   * * Стор для работы с изображениями
   */
  const { upload, isBase64 } = useMultimediaStore();

  /**
   * * Получить список команд
   * @param filter Фильтр
   * @returns Список команд
   */
  const getTeams = async (filter: PaginationFilterModel) =>
    new Promise<PaginationResponseModel<TeamModel>>(async (resolve, reject) => {
      await api
        .get("/api/Team/GetTeams", {
          params: {
            PageSize: filter.Size,
            Page: filter.CurrentPage,
            Name: filter.Search,
          },
        })
        .then(({ data }) =>
          resolve(
            new PaginationResponseModel<TeamModel>({
              IsSuccess: true,
              Items: data.data?.map(
                (x: any) =>
                  new TeamModel({
                    Id: x.id,
                    Name: x.name,
                    ImageUrl: x.imageUrl,
                    Conference: x.conference,
                    Division: x.division,
                    FoundationYear: x.foundationYear,
                  })
              ),
              Count: data.count,
            })
          )
        )
        .catch(() => reject(new PaginationResponseModel<TeamModel>()));
    });

  /**
   * * Получить детальную информацию команды
   * @param teamId Идентификатор команды
   */
  const getTeamDetails = async (teamId: number) => {
    await api
      .get("/api/Team/Get", {
        params: {
          id: teamId,
        },
      })
      .then(({ data }) => {
        {
          teamDetails.value = new TeamDetailsModel({
            Id: data.id,
            Name: data.name,
            ImageUrl: data.imageUrl,
            Conference: data.conference,
            Division: data.division,
            FoundationYear: data.foundationYear,
          });
        }
      })
      .catch(() => new PaginationResponseModel<TeamModel>());
  };

  /**
   * * Добавить / обновить команду
   * @returns Статус добавления / обновления
   */
  const updateTeam = async () =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      if (isBase64(teamDetails.value.ImageUrl)) {
        let response = await upload(teamDetails.value.Image);

        if (!response.IsSuccess) {
          return resolve(
            new ResponseModel<boolean>({
              IsSuccess: false,
              ErrorMessage: "Failed to load image. Please try again later.",
            })
          );
        }

        teamDetails.value.ImageUrl = response.Value;
      }

      if (teamDetails.value.Id) {
        await api
          .put("/api/Team/Update", {
            id: teamDetails.value.Id,
            name: teamDetails.value.Name,
            imageUrl: teamDetails.value.ImageUrl,
            conference: teamDetails.value.Conference,
            division: teamDetails.value.Division,
            foundationYear: teamDetails.value.FoundationYear,
          })
          .then(() => {
            teamDetails.value = new TeamDetailsModel();
            getTeamsForSelect();
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
      } else {
        await api
          .post("/api/Team/Add", {
            name: teamDetails.value.Name,
            imageUrl: teamDetails.value.ImageUrl,
            conference: teamDetails.value.Conference,
            division: teamDetails.value.Division,
            foundationYear: teamDetails.value.FoundationYear,
          })
          .then(() => {
            teamDetails.value = new TeamDetailsModel();
            getTeamsForSelect();
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
   * * Удалить команду
   * @param teamId Идентификатор команды
   * @returns Статус удаления
   */
  const deleteTeam = async (teamId: number) =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      await api
        .delete("/api/Team/Delete", {
          params: {
            id: teamId,
          },
        })
        .then(() => {
          teamDetails.value = new TeamDetailsModel();
          teams.value = teams.value.filter((x) => x.Id != teamId);
          return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
        })
        .catch(() => {
          return resolve(
            new ResponseModel<boolean>({
              IsSuccess: false,
              ErrorMessage: "Failed to delete team. Please try again later.",
            })
          );
        });
    });

  /**
   * * Получить список команд для выбора
   */
  const getTeamsForSelect = async () => {
    await getTeams(new PaginationFilterModel()).then((response) => {
      if (response.IsSuccess) {
        teams.value = response.Items;
      }
    });
  };

  return {
    /**
     * * Детальные данные команды
     */
    teamDetails,
    /**
     * * Список команд
     */
    teams,
    /**
     * * Получить список команд
     * @param filter Фильтр
     * @returns Список команд
     */
    getTeams,
    /**
     * * Получить детальную информацию команды
     * @param teamId Идентификатор команды
     */
    getTeamDetails,
    /**
     * * Удалить команду
     * @param teamId Идентификатор команды
     * @returns Статус удаления
     */
    deleteTeam,
    /**
     * * Добавить / обновить команду
     * @returns Статус добавления / обновления
     */
    updateTeam,
    /**
     * * Получить список команд для выбора
     */
    getTeamsForSelect,
  };
});
