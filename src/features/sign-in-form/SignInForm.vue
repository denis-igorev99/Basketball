<script lang="ts" setup>
import { SignInModel } from "@/entities";
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

/**
 * * Инструменты отображения загрузки
 */
const { isLoading, startLoading, stopLoading } = useLoading();

/**
 * * Входная модель
 */
const modelValue = ref<SignInModel>(new SignInModel());

/**
 * * Отправить форму
 */
const clickSubmit = async () => {
  if (!StartValidate()) return;
  startLoading();

  stopLoading();
};

/**
 * * Валидатор формы
 */
const { StartValidate, errors, isDisabledSubmit, isValidate } =
  useFormValidator(
    computed(() => ({
      LoginError: modelValue.value.Login,
      PasswordError: modelValue.value.Password,
    })),
    {
      LoginError: [required("Please enter login")],
      PasswordError: [required("Please enter password")],
    }
  );
</script>

<template>
  <div class="sign-in-form">
    <div class="title">Sign In</div>
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
    <Button :disabled="isLoading" @click="clickSubmit">Sign In</Button>
    <div class="info">Not a member yet? <Link routerName="sign-up">Sign up</Link></div>
  </div>
</template>

<style lang="scss">
.sign-in-form {
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

  @include media(">desktop") {
    > .title {
      text-align: left;
    }
  }
}
</style>
