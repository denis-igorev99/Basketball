<script lang="ts" setup>
import TeamsImage from "@/shared/assets/img/search-teams-empty.svg";
import { InfoCard, EmptySearch } from "@/shared";
import {
  PagePaginatorLayout,
  PaginationDataModel,
  PaginationFilterModel,
  TeamModel,
  usePaginationList,
  useTeamStore,
} from "@/entities";
import { ref } from "vue";

/**
 * * Фильтр
 */
const filter = ref<PaginationFilterModel>(new PaginationFilterModel());

/**
 * * Управление получением и отображением списка команды
 */
const paginator = ref(
  new PaginationDataModel<TeamModel>({ Search: getTeams as any })
);

/**
 * * Стор для работы командой
 */
const teamStore = useTeamStore();

/**
 * * Получить список команд
 */
async function getTeams() {
  return await teamStore.getTeams(filter.value);
}
</script>

<template>
  <PagePaginatorLayout
    v-model:filter="filter"
    :paginator="paginator"
    create-route-name="team-editor"
  >
    <template #entity="{ item }">
      <InfoCard
        :imgUrl="item.ImageUrl"
        :text="item.Name"
        :description="`Year of foundation: ${item.FoundationYear}`"
        :details-id="item.Id"
        :details-router-name="'team-details'"
      ></InfoCard>
    </template>
    <template #empty-search>
      <EmptySearch
        :imgUrl="TeamsImage"
        description="Add new teams to continue"
      />
    </template>
  </PagePaginatorLayout>
</template>

<style lang="scss" scoped></style>
