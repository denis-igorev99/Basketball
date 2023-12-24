<script lang="ts" setup>
import {
  Input,
  Search,
  Button,
  Checkbox,
  Link,
  Select,
  Pagination,
  SelectItemModel,
} from "@/shared";
import { onMounted, ref } from "vue";
import IconPlus from "@/shared/assets/img/icons/plus.svg";

const modelV = ref("");
const modelVal = ref(true);

const options = [
  new SelectItemModel({
    Id: 1,
    Value: "Value 1",
  }),
  new SelectItemModel({
    Id: 2,
    Value: "Value 2",
  }),
  new SelectItemModel({
    Id: 3,
    Value: "Value 3",
  }),
  new SelectItemModel({
    Id: 4,
    Value: "Value 4",
  }),
  new SelectItemModel({
    Id: 5,
    Value: "Value 5",
  }),
];

const mass = ref<number[]>([]);
const val = ref<number>(1);
</script>

<template>
  <div style="padding: 16px">
    Sign In
    {{ modelV }}
    <Pagination v-model:page="val" :count="72" :size="10" :page="1" />
    <!-- <Select v-model="mass" :multiple="true" :options="options" />
    <Select v-model="val" selectColor="light" :options="options" />

    <Input v-model="modelV" inputLabel="Login" error="Поле обязательно" />
    <Search v-model="modelV" placeholder="Search..." />
    <Button disabled>Sign In</Button>
    <Button button-color="default" disabled>Default</Button>
    <Button :iconRight="IconPlus">Add</Button>

    <Checkbox v-model="modelVal" disabled>Text</Checkbox>

    <Link href="https://translate.google.com/" target="_blank">Моя ссылка</Link> -->

    <!-- <Select selectColor="light" /> -->
  </div>
</template>

<style lang="scss"></style>
