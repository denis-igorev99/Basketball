<script lang="ts" setup>
import { computed, InputHTMLAttributes, onMounted, ref, useAttrs, useSlots } from "vue";
import { IInputProps } from "@/shared/ui/input/interface";
import { ErrorText } from "@/shared";
import Eye from "@/shared/assets/img/icons/eye.svg";
import CloseEye from "@/shared/assets/img/icons/close_eye.svg";

const props = withDefaults(defineProps<IInputProps>(), {
  inputLabel: "",
  error: "",
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: any): void;
}>();

/**
 * * Значение
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

/**
 * * Настройка над слотом
 */
const slots = useSlots();
/**
 * * Заполнен ли слот
 */
const hasSlot = (name: string) => {
  return !!slots[name];
};

const attrs = useAttrs();

/**
 * * Поле для пароля
 */
const isPassword = attrs.type == "password";

/**
 * * Тип поля
 */
const innerType = ref<string>(attrs.type as string);

/**
 * * Изменить состояние видимости пароля
 */
const changedViewPassword = () => {
  innerType.value = innerType.value == "password" ? "text" : "password";
  console.log("innerType.value ", innerType.value);
};
</script>

<template>
  <div class="ui-input-wrap" :class="{ 'show-error': !!error }">
    <div class="title" v-if="hasSlot('title')">
      {{ inputLabel }}
    </div>
    <input
      class="ui-input"
      :class="{ password: isPassword }"
      v-model="value"
      v-bind="$attrs"
      :type="innerType"
    />
    <img
      v-if="isPassword"
      class="password-eye"
      :src="innerType == 'password' ? CloseEye : Eye"
      alt="Password"
      width="16"
      height="16"
      @click="changedViewPassword"
    />
    <ErrorText>{{ error }}</ErrorText>
  </div>
</template>

<style lang="scss" scoped>
.ui-input-wrap {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  width: 100%;
  position: relative;

  .title {
    color: $gray;
    margin-bottom: 8px;
  }

  .password-eye {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }

  .ui-input {
    padding: 7px 12px;
    border-radius: 4px;
    width: 100%;
    background: $superlight-gray;
    border: 1px solid $superlight-gray;
    outline: none;
    color: $dark-gray;
    min-height: 40px;
    transition: all 0.15s ease-in;

    &:hover {
      background: $lightest-gray;
      border-color: $lightest-gray;
    }

    &:focus {
      background: $superlight-gray;
      border-color: $superlight-gray;
      box-shadow: 0px 0px 5px 0px #d9d9d9;
    }

    &:disabled {
      color: $lightest-gray;
    }

    &::placeholder {
      color: $gray;
      font-size: 14px;
    }

    &.password {
      padding-right: 40px;
    }
  }

  &.show-error {
    .ui-input {
      border-color: $lightest-red;
    }
  }
}
</style>
