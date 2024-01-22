<script lang="ts" setup>
import { BreadCrumbs, BreadCrumbsModel, EditDelete } from "@/shared";
import { PropType } from "vue";

const props = defineProps({
  /**
   * * Хлебные крошки
   */
  breadCumbs: {
    type: Array as PropType<BreadCrumbsModel[]>,
  },
  /**
   * * Изображение
   */
  imageUrl: {
    type: String,
  },
  /**
   * * Аватарка
   */
  isAvatar: {
    type: Boolean,
  },
});

const emit = defineEmits<{
  /**
   * * Изменить
   */
  (e: "edit"): void;
  /**
   * * Удалить
   */
  (e: "delete"): void;
}>();

const onDelete = () => {
  if (window.confirm("Confirm deletion!")) {
    emit("delete");
  }
};
</script>

<template>
  <div class="details-block">
    <div class="header">
      <BreadCrumbs :bread-cumbs="breadCumbs" />
      <EditDelete @edit="emit('edit')" @delete="onDelete" />
    </div>
    <div class="content" :class="{ avatar: isAvatar }">
      <div class="preview">
        <img :src="imageUrl" v-if="imageUrl" alt="Preview" />
      </div>
      <div class="info">
        <div class="title"><slot name="title" /></div>
        <div class="info-details">
          <div class="info-details-left">
            <slot name="info-left" />
          </div>
          <div class="info-details-right">
            <slot name="info-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-block {
  width: 100%;
  border: 1px solid $light-gray;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $white;
    padding: 12px 16px;
  }

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    padding: 48px 12px;
    background: linear-gradient(276deg, #707070 0%, #393939 100.28%);

    .preview {
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: 90px;
        height: 90px;
      }
    }

    &.avatar {
      .preview {
        align-items: flex-end;
        > img {
          width: 143px;
          height: 112px;
        }
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      row-gap: 48px;
      .title {
        color: $white;
        font-size: 17px;
        font-weight: 800;
        line-height: 25px;
      }

      .info-details {
        display: flex;
        flex-direction: column;
        row-gap: 32px;
        .info-details-left,
        .info-details-right {
          display: flex;
          flex-direction: column;
          row-gap: 32px;
        }
      }
    }
  }

  @include media(">=large-desktop") {
    border-radius: 10px;
    overflow: hidden;

    .header {
      padding: 24px 32px;
    }

    .content {
      padding: 65px 12px;
      flex-direction: row;

      .preview {
        min-width: 44%;
        > img {
          width: 210px;
          height: 210px;
        }
      }

      .info {
        row-gap: 40px;
        text-align: left;
        align-items: flex-start;

        .title {
          font-size: 36px;
          line-height: 49px;
        }

        .info-details {
          flex-direction: row;
          column-gap: 180px;

          .info-details-left,
          .info-details-right {
            row-gap: 54px;
          }
        }
      }

      &.avatar {
        padding: 0 12px;
        min-height: 525px;
        .preview {
          > img {
            max-width: 531px;
            width: 100%;
            height: auto;
          }
        }

        .info {
          justify-content: center;
        }
      }
    }
  }
}
</style>
