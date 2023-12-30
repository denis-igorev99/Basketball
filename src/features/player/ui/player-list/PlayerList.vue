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
import { TeamSelect } from "@/features";
import { ref } from "vue";
import { storeToRefs } from "pinia";
/**
 * * Стор для работы с командой
 */
const { teams } = storeToRefs(useTeamStore());

/**
 * * Название команды
 */
const teamName = (teamId: number) =>
  teams.value?.find((x) => x.Id == teamId)?.Name ?? "";

/**
 * * Фильтр
 */
const filter = ref<PlayerFilterModel>(new PlayerFilterModel());

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
  return await playerStore.getPlayers(filter.value);
}

/**
 * * Обновить фильтр по командам
 */
const updateTeamIds = (ids: number[]) => {
  let _filter = new PlayerFilterModel(JSON.parse(JSON.stringify(filter.value)));
  _filter.TeamIds = ids;
  _filter.CurrentPage = 1;
  filter.value = new PlayerFilterModel(_filter);
};
</script>

<template>
  <PagePaginatorLayout
    v-model:filter="filter"
    :paginator="paginator"
    create-route-name="player-editor"
  >
    <template #entity="{ item }">
      <InfoCard
        class="player-card"
        :imgUrl="item.AvatarUrl"
        :text="item.Name"
        :description="teamName(item.TeamId)"
        :details-id="item.Id"
        :details-router-name="'player-details'"
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
    <template #right-search>
      <TeamSelect
        :model-value="filter.TeamIds"
        :multiple="true"
        :selectColor="'white'"
        @update:modelValue="updateTeamIds"
      />
    </template>
  </PagePaginatorLayout>
</template>

<style lang="scss"></style>
