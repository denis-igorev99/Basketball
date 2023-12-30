<script lang="ts" setup>
import { PropType, ref } from "vue";
import PhotoImg from "@/shared/assets/img/icons/photo.svg";
import { ErrorText } from "@/shared";

const props = defineProps({
  /**
   * * Изображение
   */
  modelValue: {
    type: String,
  },
  /**
   * * Файл
   */
  file: {
    type: Object as PropType<File>,
  },
  /**
   * * Типы изображений
   */
  accept: {
    type: String,
    default: "image/jpeg, image/png",
  },
  /**
   * * Ошибка
   */
  error: {
    type: String,
  },
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: string): void;
  /**
   * * Обновление значения
   */
  (e: "update:file", value: File): void;
}>();

/**
 * * Ссылка на поле загрузки
 */
const inputRef = ref();

/**
 * * Загрузить картинку
 */
const clickUpload = () => {
  inputRef.value?.click();
};

/**
 * * Загрузка изображения
 */
const uploadAvatar = (event: any) => {
  const file = event.target.files[0];
  const allowedTypes = props.accept.split(",").map((x) => x.trim()) as string[];

  if (file && allowedTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      inputRef.value.value = null;
      emit("update:modelValue", e.target.result as string);
      emit("update:file", file);
    };
  } else {
    alert(`Please upload the file in the following format: ${props.accept}`);
  }
};
</script>

<template>
  <div class="upload-avatar-wrap">
    <div class="upload-avatar">
      <input
        ref="inputRef"
        type="file"
        :accept="accept"
        @change="uploadAvatar"
      />
      <div class="avatar">
        <img v-if="modelValue" :src="modelValue" alt="Avatar" />
      </div>
      <div class="photo" @click="clickUpload">
        <img :src="PhotoImg" alt="Photo" />
      </div>
    </div>
    <ErrorText>{{ error }}</ErrorText>
  </div>
</template>

<style lang="scss" scoped>
.upload-avatar-wrap {
  text-align: center;
  .upload-avatar {
    border-radius: 10px;
    min-width: 185px;
    width: 185px;
    height: 144px;
    position: relative;
    overflow: hidden;

    input {
      opacity: 0;
      z-index: -1;
      position: absolute;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 4px;
      > img {
        height: 100%;
      }
    }

    .photo {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba($light-gray, 0.5);
      cursor: pointer;
      z-index: 2;
      user-select: none;

      img {
        width: 41px;
        height: 40px;
      }
    }

    &.avatar {
      .avatar {
        padding: 0px;
      }
    }
  }
  @include media(">=large-desktop") {
    text-align: left;
    .upload-avatar {
      min-width: 336px;
      width: 336px;
      height: 261px;

      .photo {
        img {
          width: 74px;
          height: 75px;
        }
      }
    }
  }
}
</style>
