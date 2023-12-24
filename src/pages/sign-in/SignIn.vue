<script lang="ts" setup>
import { Input, Search } from "@/shared";
import { onMounted, ref } from "vue";

const modelV = ref("");
</script>

<template>
  Sign In
  {{ modelV }}
  <Input
    v-model="modelV"
    inputLabel="Login"
    error="Поле обязательно"
  />
  <Search v-model="modelV" placeholder="Search..." />
</template>

<style lang="scss"></style>
