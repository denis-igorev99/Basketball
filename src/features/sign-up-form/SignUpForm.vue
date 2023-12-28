<script lang="ts" setup>
import { SignUpModel, useUserStore } from "@/entities";
import {
  Input,
  Checkbox,
  Link,
  Button,
  required,
  useFormValidator,
  useLoading,
} from "@/shared";
import { computed, PropType, ref } from "vue";
import { useRouter } from "vue-router";

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * * Стор для работы с пользователем
 */
const userStore = useUserStore();

/**
 * * Инструменты отображения загрузки
 */
const { isLoading, startLoading, stopLoading } = useLoading();

/**
 * * Входная модель
 */
const modelValue = ref<SignUpModel>(new SignUpModel());

/**
 * * Повторить пароль
 */
const confirmPassword = ref<string>("");

/**
 * * Подтверждение
 */
const accept = ref<boolean>(false);

/**
 * * Отправить форму
 */
const clickSubmit = async () => {
  if (!StartValidate()) return;
  startLoading();
  await userStore
    .signUp(modelValue.value)
    .then((response) => {
      if (response.IsSuccess) {
        router.push({
          name: "teams-list",
        });
      }
    })
    .finally(() => stopLoading());
};

/**
 * * Валидатор формы
 */
const { StartValidate, errors, isDisabledSubmit, isValidate } =
  useFormValidator(
    computed(() => ({
      NameError: modelValue.value.Name,
      LoginError: modelValue.value.Login,
      PasswordError: modelValue.value.Password,
    })),
    {
      NameError: [required("Please enter your name")],
      LoginError: [required("Please enter login")],
      PasswordError: [required("Please enter password")],
    }
  );
</script>

<template>
  <div class="sign-up-form">
    <div class="title">Sign Up</div>
    <Input
      v-model="modelValue.Name"
      inputLabel="Login"
      :error="errors?.NameError"
    />
    <Input
      v-model="modelValue.Login"
      inputLabel="Name"
      :error="errors?.LoginError"
    />
    <Input
      v-model="modelValue.Password"
      inputLabel="Password"
      type="password"
      :error="errors?.PasswordError"
    />
    <Input
      v-model="confirmPassword"
      inputLabel="Password"
      type="password"
      :error="
        isValidate && modelValue.Password != confirmPassword
          ? 'Password mismatch'
          : ''
      "
    />
    <Checkbox v-model="accept" :is-error="!accept && isValidate"
      >I accept the agreement</Checkbox
    >
    <Button :disabled="isLoading" @click="clickSubmit">Sign Up</Button>
    <div class="info">
      Already a member? <Link routerName="sign-in">Sign in</Link>
    </div>
  </div>
</template>

<style lang="scss">
.sign-up-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  width: 100%;
  > .title {
    color: $blue;
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 8px;
    width: 100%;
    text-align: center;
  }

  > button {
    width: 100%;
  }

  @include media(">=desktop") {
    > .title {
      text-align: left;
    }
  }
}
</style>
