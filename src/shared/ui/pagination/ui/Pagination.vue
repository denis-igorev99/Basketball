<script lang="ts" setup>
import { IPaginationProps } from "@/shared/ui/pagination/interface";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<IPaginationProps>(), {
  size: 10,
  page: 1,
  showCount: 4,
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:page", value: any): void;
}>();

/**
 * * Значение
 */
const value = computed({
  get: () => props.page,
  set: (value) => {
    emit("update:page", value);
  },
});
</script>

<template>
  <vue-awesome-paginate
    class="ui-pagination"
    :total-items="count"
    :items-per-page="size"
    :max-pages-shown="showCount"
    v-model="value"
  >
    <template #prev-button>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M12.4 5.76821C12.712 6.08021 12.712 6.58421 12.4 6.89621L9.296 10.0002L12.4 13.1042C12.712 13.4162 12.712 13.9202 12.4 14.2322C12.088 14.5442 11.584 14.5442 11.272 14.2322L7.6 10.5602C7.288 10.2482 7.288 9.74421 7.6 9.43221L11.272 5.76021C11.576 5.45621 12.088 5.45621 12.4 5.76821Z"
            fill="#707070"
          />
        </svg>
      </span>
    </template>
    <template #next-button>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7.6 5.76821C7.288 6.08021 7.288 6.58421 7.6 6.89621L10.704 10.0002L7.6 13.1042C7.288 13.4162 7.288 13.9202 7.6 14.2322C7.912 14.5442 8.416 14.5442 8.728 14.2322L12.4 10.5602C12.712 10.2482 12.712 9.74421 12.4 9.43221L8.728 5.76021C8.424 5.45621 7.912 5.45621 7.6 5.76821Z"
            fill="#707070"
          />
        </svg>
      </span>
    </template>
  </vue-awesome-paginate>
</template>

<style lang="scss">
.pagination-container {
  &.ui-pagination {
    display: flex;
    column-gap: 16px;
    list-style: none;
    .paginate-buttons {
      min-width: 40px;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      color: $gray;

      &:not(.back-button, .next-button):hover {
        background-color: $lightest-red;
        color: $white;
      }

      &.active-page {
        background-color: $red;
        color: $white;
      }
    }
  }
}
</style>
