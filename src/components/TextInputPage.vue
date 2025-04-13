<template>
  <v-container>
    <v-textarea
      v-model="input"
      label="入力してください"
      outlined
      @input="handleInput"
      @keydown="handleKeydown"
    ></v-textarea>
    <v-list v-if="filteredSuggestions.length > 0">
      <v-list-item
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        :class="{ 'v-list-item--active': index === activeSuggestionIndex }"
      >
        <v-list-item-title>{{ suggestion }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

// グローバル変数として word_separator を定義
const word_separator = /([\s,()]+)/; // 区切り文字をスペース、カンマ、括弧に変更

// Props と Emits を定義 (v-model サポート)
const props = defineProps({
  suggestions: {
    type: Array,
    required: true,
  },
  modelValue: { // v-model 用の prop
    type: String,
    default: '', // デフォルト値を空文字に
  },
});

const emit = defineEmits(['update:modelValue']); // v-model 用の emit

const input = ref(props.modelValue); // 内部状態として input を維持し、props.modelValue で初期化
const filteredSuggestions = ref([]);
const activeSuggestionIndex = ref(-1); // 現在選択中のサジェストのインデックス

// テキストエリアの入力イベントハンドラ
const handleInput = () => {
  emit('update:modelValue', input.value); // 内部の input の変更を emit
  updateSuggestions(); // サジェストを更新
};

// 入力に基づいてサジェストを更新 (内部の input を参照)
const updateSuggestions = () => {
  if (!input.value) {
    filteredSuggestions.value = [];
    activeSuggestionIndex.value = -1;
    return;
  }

  // 入力をスペースや記号で分割し、最後の単語と区切り文字を取得
  const parts = input.value.split(word_separator);
  const lastWord = parts[parts.length - 1].toLowerCase();

  // 最後の単語に基づいてサジェストを更新
  filteredSuggestions.value = lastWord
    ? props.suggestions.filter((word) => word.toLowerCase().includes(lastWord))
    : [];
  activeSuggestionIndex.value = -1; // サジェストが更新されたら選択をリセット
};

// サジェストをクリックしたときに入力に反映 (内部の input を更新)
const selectSuggestion = (suggestion) => {
  const parts = input.value.split(word_separator);

  // 最後の単語をサジェストに置き換え
  parts[parts.length - 1] = suggestion;

  // 再構築して入力に反映（区切り文字を保持）
  input.value = parts.join("");
  emit('update:modelValue', input.value); // 変更を emit
  filteredSuggestions.value = [];
  activeSuggestionIndex.value = -1;
  updateSuggestions(); // サジェストを更新
};

// キーボードイベントを処理
const handleKeydown = (event) => {
  if (filteredSuggestions.value.length === 0) return;

  if (event.key === "ArrowDown") {
    // 下キーで次のサジェストを選択
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value + 1) % filteredSuggestions.value.length;
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    // 上キーで前のサジェストを選択
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value - 1 + filteredSuggestions.value.length) %
      filteredSuggestions.value.length;
    event.preventDefault();
  } else if (event.key === "Enter" && activeSuggestionIndex.value !== -1) {
    // Enterキーで現在選択中のサジェストを確定
    selectSuggestion(filteredSuggestions.value[activeSuggestionIndex.value]);
    event.preventDefault();
  }
};

// props.modelValue が外部から変更された場合に内部の input を更新する
watch(() => props.modelValue, (newValue) => {
  if (newValue !== input.value) { // 無限ループを防ぐ
    input.value = newValue;
    updateSuggestions(); // 外部からの変更でもサジェストを更新
  }
});

// 初期表示時にサジェストを更新
updateSuggestions();

</script>

<style scoped>
.v-list-item--active {
  background-color: #e0e0e0; /* 選択中のアイテムの背景色 */
}
</style>
