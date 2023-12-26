import { defineStore } from "pinia";
import { TeamModel } from "../models";
import { PaginationFilterModel, PaginationResponseModel } from "@/entities";
import Img from "@/shared/assets/img/test-team.svg";

/**
 * * Стор для работы с командой
 */
export const useTeamStore = defineStore(
  "team-store",
  () => {
    /**
     * * Получить список команд
     * @param filter Фильтр
     * @returns Список команд
     */
    const getTeams = async (filter: PaginationFilterModel) =>
      new Promise<PaginationResponseModel<TeamModel>>((resolve) => {
        return resolve(new PaginationResponseModel<TeamModel>({
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
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
            new TeamModel({
              Id: 1,
              ImageUrl: Img,
              Name: "Portland trail blazers",
              FoundationYear: 1970,
            }),
          ],
        }))
      });
    return {
      /**
       * * Получить список команд
       * @param filter Фильтр
       * @returns Список команд
       */
      getTeams,
    };
  }
);
