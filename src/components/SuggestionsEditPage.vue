<template>
  <v-container>
    <v-textarea
      v-model="suggestionsText"
      label="サジェスト候補を編集 (改行区切り)"
      outlined
    ></v-textarea>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

// v-model を使うための props と emits を定義
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// テキストエリアの表示用 computed プロパティ
// 配列を改行区切りの文字列に変換
const suggestionsText = computed({
  get: () => props.modelValue.join('\n'),
  set: (value) => {
    // 改行区切りの文字列を配列に変換して emit
    // 空行はフィルタリングする
    const newSuggestions = value.split('\n').filter(s => s.trim() !== '');
    emit('update:modelValue', newSuggestions);
  },
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>