<script lang="ts" setup>
import {
  BreadCrumbsModel,
  DetailsBlock,
  InfoDetails,
  useNotificationStore,
} from "@/shared";
import { usePlayerStore } from "@/entities";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  /**
   * * Идентификатор игрока
   */
  playerId: {
    type: Number,
    required: true,
  },
});

/**
 * * Стор для работы с уведомлениями
 */
const { success, error } = useNotificationStore();

/**
 * * Стор для работы с игроками
 */
const { playerDetails } = storeToRefs(usePlayerStore());
const { getPlayerDetails, deletePlayer } = usePlayerStore();

/**
 * * Хлебные крошки
 */
const breadCumbs = computed(() => [
  new BreadCrumbsModel({
    Text: "Players",
    Route: "players-list",
    QueryParams: { page: 1 },
  }),
  new BreadCrumbsModel({
    Text: playerDetails.value.Name,
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
  router.push({
    name: "player-editor",
    params: { id: playerDetails.value.Id },
  });
};

/**
 * * Удалить
 */
const onDelete = async () => {
  await deletePlayer(playerDetails.value.Id).then((response) => {
    if (!response.IsSuccess) {
      error(response.ErrorMessage);
      return;
    }

    success(`Player has been deleted successfully.`);
    router.push({ name: "players-list" });
  });
};

onMounted(async () => {
  await getPlayerDetails(props.playerId);

  if (!playerDetails.value.Id)
    router.push({ name: "players-list" });
});
</script>

<template>
  <div class="player-details">
    <DetailsBlock
      :imageUrl="playerDetails.AvatarUrl"
      :bread-cumbs="breadCumbs"
      is-avatar
      @edit="onEdit"
      @delete="onDelete"
    >
      <template #title
        >{{ playerDetails.Name }}
        <span id="player-number">#{{ playerDetails.Number }}</span></template
      >
      <template #info-left>
        <InfoDetails
          titleText="Position"
          :description="playerDetails.Position"
        />
        <InfoDetails
          titleText="Height"
          :description="`${playerDetails.Height} cm`"
        />
        <InfoDetails titleText="Age" :description="playerDetails.Age" />
      </template>
      <template #info-right>
        <InfoDetails titleText="Team" :description="playerDetails.Team" />
        <InfoDetails
          titleText="Weight"
          :description="`${playerDetails.Weight} kg`"
        />
      </template>
    </DetailsBlock>
  </div>
</template>

<style lang="scss" scoped>
.player-details {
  #player-number {
    color: $light-red;
  }
}
</style>
