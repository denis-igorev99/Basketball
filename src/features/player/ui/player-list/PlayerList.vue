<script lang="ts" setup>
import PlayerImage from "@/shared/assets/img/search-players-empty.svg";
import { InfoCard, EmptySearch } from "@/shared";
import {
  PagePaginatorLayout,
  PaginationDataModel,
  PaginationFilterModel,
  PlayerFilterModel,
  PlayerModel,
  TeamModel,
  usePaginationList,
  usePlayerStore,
  useTeamStore,
} from "@/entities";
import { ref } from "vue";

/**
 * * Фильтр
 */
const filter = ref<PlayerFilterModel>();

/**
 * * Управление получением и отображением списка игроков
 */
const paginator = ref(
  new PaginationDataModel<PlayerModel>({ Search: getPlayers as any })
);

/**
 * * Стор для работы с игроками
 */
const playerStore = usePlayerStore();

/**
 * * Получить список игроков
 */
async function getPlayers() {
  return await playerStore.getPlayers(new PlayerFilterModel());
}
</script>

<template>
  <PagePaginatorLayout v-model:filter="filter" :paginator="paginator">
    <template #entity="{ item }">
      <InfoCard
        class="player-card"
        :imgUrl="item.AvatarUrl"
        :text="item.Name"
        :description="item.Team"
      >
        <template #after-title>#{{ item.Number }}</template>
      </InfoCard>
    </template>
    <template #empty-search>
      <EmptySearch
        :imgUrl="PlayerImage"
        description="Add new players to continue"
        maxImgWidth="320px"
      />
    </template>
  </PagePaginatorLayout>
</template>

<style lang="scss"></style>
