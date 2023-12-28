<script lang="ts" setup>
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
</script>

<template>
  <div class="edit-delete">
    <div class="edit" @click="emit('edit')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7089 5.63151C21.0989 6.02151 21.0989 6.65151 20.7089 7.04151L18.8789 8.87151L15.1289 5.12151L16.9589 3.29151C17.1458 3.10426 17.3994 2.99902 17.6639 2.99902C17.9285 2.99902 18.1821 3.10426 18.3689 3.29151L20.7089 5.63151ZM2.9989 20.5015V17.4615C2.9989 17.3215 3.0489 17.2015 3.1489 17.1015L14.0589 6.19155L17.8089 9.94155L6.8889 20.8515C6.7989 20.9515 6.6689 21.0015 6.5389 21.0015H3.4989C3.2189 21.0015 2.9989 20.7815 2.9989 20.5015Z"
        />
      </svg>
    </div>
    <div class="delete" @click="emit('delete')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.5 4H18C18.55 4 19 4.45 19 5C19 5.55 18.55 6 18 6H6C5.45 6 5 5.55 5 5C5 4.45 5.45 4 6 4H8.5L9.21 3.29C9.39 3.11 9.65 3 9.91 3H14.09C14.35 3 14.61 3.11 14.79 3.29L15.5 4ZM8.00004 21C6.90004 21 6.00004 20.1 6.00004 19V9.00004C6.00004 7.90004 6.90004 7.00004 8.00004 7.00004H16C17.1 7.00004 18 7.90004 18 9.00004V19C18 20.1 17.1 21 16 21H8.00004Z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.edit-delete {
  display: flex;
  align-items: center;
  column-gap: 12px;
  cursor: pointer;

  @include media(">=tablet") {
    column-gap: 16px;
  }

  > div {
    width: 24px;
    height: 24px;
  }
  svg {
    transition: all 0.15s ease-in;
    fill: $light-gray;
    &:hover {
      fill: $red;
    }
  }
}
</style>
