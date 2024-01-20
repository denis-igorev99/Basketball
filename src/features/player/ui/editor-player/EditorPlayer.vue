<script lang="ts" setup>
import {
  BreadCrumbsModel,
  EditorBlock,
  Input,
  required,
  useFormValidator,
  useLoading,
  UploadAvatar,
  DatePicker,
  useNotificationStore,
} from "@/shared";
import { computed, onMounted, PropType } from "vue";
import PhotoImg from "@/shared/assets/img/photo.svg";
import { PlayerDetailsModel, usePlayerStore } from "@/entities";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { PositionSelect, TeamSelect } from "@/features";

const props = defineProps({
  /**
   * * Идентификатор buhjrf
   */
  playerId: {
    type: Number,
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
const { updatePlayer, getPlayerDetails } = usePlayerStore();

/**
 * * Инструменты отображения загрузки
 */
const { isLoading, startLoading, stopLoading } = useLoading();

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
    Text: playerDetails.value.Id ? "Update player" : "Add new player",
  }),
]);

/**
 * * Текущая дата
 */
const currentDate = computed(() => new Date());

/**
 * * Сохранить
 */
const onSave = async () => {
  if (!startValidate()) return;

  stopValidate();
  startLoading();

  let isEdit = !!playerDetails.value.Id;

  await updatePlayer()
    .then((response) => {
      if (response.IsSuccess) {
        success(
          isEdit
            ? "Player has been updated successfully."
            : "Player has been created successfully."
        );
        router.push({ name: "players-list" });
      } else {
        error(response.ErrorMessage);
      }
    })
    .finally(() => stopLoading());
};

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * * Отменить сохранения
 */
const onCancel = async () => {
  playerDetails.value = new PlayerDetailsModel();
  router.push({ name: "players-list" });
};

onMounted(async () => {
  playerDetails.value = new PlayerDetailsModel();
  if (props.playerId) {
    await getPlayerDetails(props.playerId);

    if (!playerDetails.value.Id)
      router.push({ name: "players-list" });
  }
});

/**
 * * Валидатор формы
 */
const { startValidate, stopValidate, errors, isDisabledSubmit, isValidate } =
  useFormValidator(
    computed(() => ({
      NameError: playerDetails.value.Name,
      PositionError: playerDetails.value.Position,
      TeamError: playerDetails.value.TeamId,
      HeightError: playerDetails.value.Height,
      WeightError: playerDetails.value.Weight,
      NumberError: playerDetails.value.Number,
      BirthdayError: playerDetails.value.Birthday,
      AvatarUrlError: playerDetails.value.AvatarUrl,
    })),
    {
      NameError: [required("Please enter your name")],
      PositionError: [required("Please select position")],
      TeamError: [required("Please select team")],
      HeightError: [required("Please enter height")],
      WeightError: [required("Please enter weight")],
      NumberError: [required("Please enter number")],
      BirthdayError: [required("Please select your birthday")],
      AvatarUrlError: [required("Please upload avatar")],
    }
  );
</script>

<template>
  <EditorBlock
    :bread-cumbs="breadCumbs"
    :isLoading="isLoading"
    @save="onSave"
    @cancel="onCancel"
  >
    <template #preview>
      <UploadAvatar
        class="avatar"
        :error="errors?.AvatarUrlError"
        v-model="playerDetails.AvatarUrl"
        v-model:file="playerDetails.Avatar"
      />
    </template>
    <Input
      v-model="playerDetails.Name"
      inputLabel="Name"
      :error="errors?.NameError"
    />
    <PositionSelect
      v-model="playerDetails.Position"
      selectLabel="Position"
      :error="errors?.PositionError"
    />
    <TeamSelect
      v-model="playerDetails.TeamId"
      selectLabel="Team"
      :error="errors?.TeamError"
    />
    <div class="inline-block">
      <Input
        v-model="playerDetails.Height"
        inputLabel="Height (cm)"
        :error="errors?.HeightError"
        type="number"
        :min="0"
      />
      <Input
        v-model="playerDetails.Weight"
        inputLabel="Weight (kg)"
        :error="errors?.WeightError"
        type="number"
        :min="0"
      />
    </div>
    <div class="inline-block">
      <DatePicker
        v-model="playerDetails.Birthday"
        label="Birthday"
        :max-date="currentDate"
        :error="errors?.BirthdayError"
      />
      <Input
        v-model="playerDetails.Number"
        inputLabel="Number"
        :error="errors?.NumberError"
        type="number"
        :min="0"
      />
    </div>
  </EditorBlock>
</template>

<style lang="scss" scoped>
.inline-block {
  display: flex;
  column-gap: 24px;
}
</style>
