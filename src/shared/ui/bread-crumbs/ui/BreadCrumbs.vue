<script lang="ts" setup>
import { BreadCrumbsModel } from "../models/BreadCrumbsModel";
import { PropType } from "vue";
import { Link } from "@/shared";

const props = defineProps({
  /**
   * * Хлебные крошки
   */
  breadCumbs: {
    type: Array as PropType<BreadCrumbsModel[]>,
  },
});
</script>

<template>
  <div class="bread-crumbs">
    <template v-for="(breadCumb, index) in breadCumbs" :key="index">
      <Link :routerName="breadCumb.Route" :querParams="breadCumb.QueryParams">{{ breadCumb.Text }}</Link>
      <span v-if="index < breadCumbs.length - 1">/</span>
    </template>
  </div>
</template>

<style lang="scss">
.bread-crumbs {
  color: $red;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;

  > span {
    color: $light-gray;
    padding: 0 4px;
  }

  > a {
    text-decoration: none !important;
  }

  @include media("<tablet") {
    font-size: 13px;
    line-height: 18px;
  }
}
</style>
