<script lang="ts" setup>
import { AuthWrap } from "@/widgets";
import { SignUpForm } from "@/features";
import SignUpPreview from "@/shared/assets/img/sign-up-preview.svg";
</script>

<template>
  <AuthWrap>
    <SignUpForm />
    <template #image>
      <img :src="SignUpPreview" alt="Auth" />
    </template>
  </AuthWrap>
</template>

<style lang="scss"></style>
