<script lang="ts" setup>
import { AuthWrap } from "@/widgets";
import { SignInForm } from "@/features";
import SignInPreview from "@/shared/assets/img/sign-in-preview.svg";
</script>

<template>
  <AuthWrap>
    <SignInForm />
    <template #image>
      <img :src="SignInPreview" alt="Auth" width="605" height="412" />
    </template>
  </AuthWrap>
</template>

<style lang="scss"></style>
