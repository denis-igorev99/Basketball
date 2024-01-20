<script lang="ts" setup>
import {
  BreadCrumbsModel,
  DetailsBlock,
  InfoDetails,
  useNotificationStore,
} from "@/shared";
import { useTeamStore } from "@/entities";
import { PlayerTable } from "@/features";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  /**
   * * Идентификатор команды
   */
  teamId: {
    type: Number,
    required: true,
  },
});

/**
 * * Стор для работы с командой
 */
const { teamDetails } = storeToRefs(useTeamStore());
const { getTeamDetails, deleteTeam } = useTeamStore();

/**
 * * Стор для работы с уведомлениями
 */
const { success, error } = useNotificationStore();

/**
 * * Хлебные крошки
 */
const breadCumbs = computed(() => [
  new BreadCrumbsModel({
    Text: "Teams",
    Route: "teams-list",
    QueryParams: { page: 1 },
  }),
  new BreadCrumbsModel({
    Text: teamDetails.value.Name,
  }),
]);

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * * Изменить
 */
const onEdit = () => {
  router.push({ name: "team-editor", params: { id: teamDetails.value.Id } });
};

/**
 * * Удалить
 */
const onDelete = async () => {
  await deleteTeam(teamDetails.value.Id).then((response) => {
    if (!response.IsSuccess) {
      error(response.ErrorMessage);
      return;
    }

    success(`Team has been deleted successfully.`);
    router.push({ name: "teams-list" });
  });
};

onMounted(async () => {
  await getTeamDetails(props.teamId);

  if (!teamDetails.value.Id) router.push({ name: "teams-list" });
});
</script>

<template>
  <div class="team-details">
    <DetailsBlock
      :imageUrl="teamDetails.ImageUrl"
      :bread-cumbs="breadCumbs"
      @edit="onEdit"
      @delete="onDelete"
    >
      <template #title>{{ teamDetails.Name }}</template>
      <template #info-left>
        <InfoDetails
          titleText="Year of foundation"
          :description="teamDetails.FoundationYear"
        />
        <InfoDetails
          titleText="Conference"
          :description="teamDetails.Conference"
        />
      </template>
      <template #info-right>
        <InfoDetails titleText="Division" :description="teamDetails.Division" />
      </template>
    </DetailsBlock>
    <PlayerTable :team-id="teamId" />
  </div>
</template>

<style lang="scss" scoped>
.team-details {
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @include media(">=tablet") {
    row-gap: 24px;
  }
}
</style>
