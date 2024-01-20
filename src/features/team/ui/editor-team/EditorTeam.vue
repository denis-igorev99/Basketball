<script lang="ts" setup>
import {
  BreadCrumbsModel,
  EditorBlock,
  Input,
  required,
  useFormValidator,
  useLoading,
  UploadAvatar,
  checkYear,
  checkNoMoreCurrentYear,
  useNotificationStore,
} from "@/shared";
import { computed, onMounted, PropType } from "vue";
import PhotoImg from "@/shared/assets/img/photo.svg";
import { TeamDetailsModel, useTeamStore } from "@/entities";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const props = defineProps({
  /**
   * * Идентификатор команды
   */
  teamId: {
    type: Number,
  },
});

/**
 * * Стор для работы с уведомлениями
 */
const { success, error } = useNotificationStore();

/**
 * * Стор для работы с командой
 */
const { teamDetails } = storeToRefs(useTeamStore());
const { updateTeam, getTeamDetails } = useTeamStore();

/**
 * * Инструменты отображения загрузки
 */
const { isLoading, startLoading, stopLoading } = useLoading();

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
    Text: teamDetails.value.Id ? "Update team" : "Add new team",
  }),
]);

/**
 * * Текущий год
 */
const currentYear = computed(() => new Date().getFullYear());

/**
 * * Сохранить
 */
const onSave = async () => {
  if (!startValidate()) return;

  stopValidate();
  startLoading();

  let isEdit = !!teamDetails.value.Id;

  await updateTeam()
    .then((response) => {
      if (response.IsSuccess) {
        success(
          isEdit
            ? "Team has been updated successfully."
            : "Team has been created successfully."
        );
        router.push({ name: "teams-list" });
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
  teamDetails.value = new TeamDetailsModel();
  router.push({ name: "teams-list" });
};

onMounted(async () => {
  teamDetails.value = new TeamDetailsModel();
  if (props.teamId) {
    await getTeamDetails(props.teamId);

    if (!teamDetails.value.Id) router.push({ name: "teams-list" });
  }
});

/**
 * * Валидатор формы
 */
const { startValidate, stopValidate, errors, isDisabledSubmit, isValidate } =
  useFormValidator(
    computed(() => ({
      NameError: teamDetails.value.Name,
      DivisionError: teamDetails.value.Division,
      ConferenceError: teamDetails.value.Conference,
      FoundationYearError: teamDetails.value.FoundationYear,
      ImageUrlError: teamDetails.value.ImageUrl,
    })),
    {
      NameError: [required("Please enter your name")],
      DivisionError: [required("Please enter division")],
      ConferenceError: [required("Please enter conference")],
      FoundationYearError: [
        required("Please enter foundation year"),
        checkYear(),
        checkNoMoreCurrentYear(
          "The year of foundation cannot be greater than the current year"
        ),
      ],
      ImageUrlError: [required("Please upload image")],
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
        v-model="teamDetails.ImageUrl"
        v-model:file="teamDetails.Image"
        :error="errors?.ImageUrlError"
      />
    </template>
    <Input
      v-model="teamDetails.Name"
      inputLabel="Name"
      :error="errors?.NameError"
    />
    <Input
      v-model="teamDetails.Division"
      inputLabel="Division"
      :error="errors?.DivisionError"
    />
    <Input
      v-model="teamDetails.Conference"
      inputLabel="Conference"
      :error="errors?.ConferenceError"
    />
    <Input
      v-model="teamDetails.FoundationYear"
      inputLabel="Year of foundation"
      :error="errors?.FoundationYearError"
      type="number"
      :min="0"
      :max="currentYear"
    />
  </EditorBlock>
</template>

<style lang="scss" scoped></style>
