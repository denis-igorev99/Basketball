<script lang="ts" setup>
import { BreadCrumbs, BreadCrumbsModel, EditDelete, Button } from "@/shared";
import { PropType } from "vue";

const props = defineProps({
  /**
   * * Хлебные крошки
   */
  breadCumbs: {
    type: Array as PropType<BreadCrumbsModel[]>,
  },
});

const emit = defineEmits<{
  /**
   * * Сохранить
   */
  (e: "save"): void;
  /**
   * * Отмена
   */
  (e: "cancel"): void;
}>();
</script>

<template>
  <div class="editor-block">
    <BreadCrumbs :bread-cumbs="breadCumbs" />
    <div class="content">
      <div class="preview">
        <slot name="preview" />
      </div>
      <div class="form-content">
        <div class="form">
          <slot />
        </div>
        <div class="buttons-wrap">
          <Button button-color="default" @click="emit('cancel')">Cancel</Button>
          <Button @click="emit('save')">Save</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-block {
  background-color: $white;
  padding: 16px 16px 48px;

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    padding: 64px 8px 0 8px;
    .preview {
      display: flex;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      row-gap: 24px;
      .buttons-wrap {
        display: flex;
        align-items: center;
        column-gap: 24px;
      }

      .form {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
      }
    }
  }

  @include media(">=large-desktop") {
    padding: 24px 32px 48px;
    border-radius: 10px;

    .content {
      flex-direction: row;
      column-gap: 95px;
      padding: 72px 41px 0 41px;

      .preview {
        width: 42.6%;
      }

      .form-content {
        min-width: 366px;
      }
    }
  }
}
</style>
<style lang="scss">
.editor-block {
  .buttons-wrap {
    > button {
      width: 50%;
    }
  }
}
</style>
