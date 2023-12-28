<script lang="ts" setup>
import {
  BreadCrumbsModel,
  EditorBlock,
  Input,
  required,
  useFormValidator,
  useLoading,
  UploadAvatar,
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
  }),
  new BreadCrumbsModel({
    Text: teamDetails.value.Id ? "Update team" : "Add new team",
  }),
]);

/**
 * * Сохранить
 */
const onSave = async () => {
  if (!StartValidate()) return;
  startLoading();

  await updateTeam()
    .then((response) => {
      if (!response.IsSuccess) {
        // todo error
        return;
      }
      router.push({ name: "teams-list" });
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
  if (props.teamId) await getTeamDetails(props.teamId);
});

/**
 * * Валидатор формы
 */
const { StartValidate, errors, isDisabledSubmit, isValidate } =
  useFormValidator(
    computed(() => ({
      NameError: teamDetails.value.Name,
      DivisionError: teamDetails.value.Division,
      ConferenceError: teamDetails.value.Conference,
      FoundationYearError: teamDetails.value.FoundationYear,
    })),
    {
      NameError: [required("Please enter your name")],
      DivisionError: [required("Please enter division")],
      ConferenceError: [required("Please enter conference")],
      FoundationYearError: [required("Please enter foundation year")],
    }
  );
</script>

<template>
  <EditorBlock :bread-cumbs="breadCumbs" @save="onSave" @cancel="onCancel">
    <template #preview>
      <UploadAvatar v-model="teamDetails.ImageUrl" />
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
      :max="150"
    />
  </EditorBlock>
</template>

<style lang="scss" scoped></style>
