<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary">
        <v-app-bar-title>title</v-app-bar-title>
      </v-app-bar>
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { RouterView } from "vue-router";
import TextInputPage from "@/components/TextInputPage.vue"; // 新しいコンポーネントをインポート
</script>
