<script lang="ts" setup>
import NoPhoto from "@/shared/assets/img/no-photo-profile.svg";
const props = defineProps({
  /**
   * * Имя
   */
  avatarName: {
    type: String,
  },
  /**
   * * Картинка
   */
  imageUrl: {
    type: String,
  },
});
</script>

<template>
  <div class="avatar">
    <div class="avatar-name" v-if="avatarName">{{ avatarName }}</div>
    <img
      :src="imageUrl ?? NoPhoto"
      width="36"
      height="36"
      :alt="avatarName ?? 'Avatar'"
    />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  column-gap: 16px;
  .avatar-name {
    color: $dark-gray;
    font-size: 14px;
    line-height: 24px;
  }

  @include media("<tablet") {
    flex-direction: row-reverse;
    justify-content: flex-end;
    img {
      width: 48px;
      height: 48px;
    }
    .avatar-name {
      font-size: 15px;
    }
  }
}
</style>
