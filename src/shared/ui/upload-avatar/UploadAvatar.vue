<script lang="ts" setup>
import { BreadCrumbs, BreadCrumbsModel, EditDelete, Button } from "@/shared";
import { PropType, ref } from "vue";
import PhotoImg from "@/shared/assets/img/icons/photo.svg";

const props = defineProps({
  /**
   * * Изображение
   */
  modelValue: {
    type: String,
  },
  /**
   * * Типы изображений
   */
  accept: {
    type: String,
    default: "image/jpeg, image/png",
  },
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: any): void;
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
  console.log("file.type", file.type);

  if (file && allowedTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      emit("update:modelValue", e.target.result);
    };
  } else {
    alert(`Please upload the file in the following format: ${props.accept}`);
  }
};
</script>

<template>
  <div class="upload-avatar">
    <input ref="inputRef" type="file" :accept="accept" @change="uploadAvatar" />
    <div class="avatar">
      <img v-if="modelValue" :src="modelValue" alt="Avatar" />
    </div>
    <div class="photo" @click="clickUpload">
      <img :src="PhotoImg" alt="Photo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  @include media(">=large-desktop") {
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
</style>
