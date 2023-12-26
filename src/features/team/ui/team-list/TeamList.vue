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
const filter = ref<PaginationFilterModel>();

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
  return await teamStore.getTeams(new PaginationFilterModel());
}
</script>

<template>
  <PagePaginatorLayout v-model:filter="filter" :paginator="paginator">
    <template #entity="{ item }">
      <InfoCard
        :imgUrl="item.ImageUrl"
        :text="item.Name"
        :description="`Year of foundation: ${item.FoundationYear}`"
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
