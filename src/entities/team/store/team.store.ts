import { defineStore } from "pinia";
import { TeamDetailsModel, TeamModel } from "../models";
import {
  PaginationFilterModel,
  PaginationResponseModel,
  ResponseModel,
} from "@/entities";
import Img from "@/shared/assets/img/test-team.svg";
import { ref } from "vue";

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
   * * Получить детальную информацию команды
   * @param teamId Идентификатор команды
   */
  const getTeamDetails = async (teamId: number) => {
    teamDetails.value = new TeamDetailsModel({
      Id: 1,
      Name: "Denver Nuggets",
      ImageUrl: Img,
      FoundationYear: 1970,
      Conference: "Western",
      Division: "Northwestern",
    });
  };

  /**
   * * Добавить / обновить команду
   * @returns Статус добавления / обновления
   */
  const updateTeam = async () =>
    new Promise<ResponseModel<boolean>>((resolve) => {
      return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
    });

  /**
   * * Удалить команду
   * @param teamId Идентификатор команды
   * @returns Статус удаления
   */
  const deleteTeam = async (teamId: number) =>
    new Promise<ResponseModel<boolean>>((resolve) => {
      teamDetails.value = new TeamDetailsModel();
      return resolve(new ResponseModel<boolean>({ IsSuccess: true }));
    });

  /**
   * * Получить список команд
   * @param filter Фильтр
   * @returns Список команд
   */
  const getTeams = async (filter: PaginationFilterModel) =>
    new Promise<PaginationResponseModel<TeamModel>>((resolve) => {
      return resolve(
        new PaginationResponseModel<TeamModel>({
          IsSuccess: true,
          Count: 6,
          Items: [
            new TeamModel({
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 2,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 3,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 4,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 5,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 6,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
          ],
        })
      );
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
