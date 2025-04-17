<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab value="suggestedInput">補完入力</v-tab>
      <v-tab value="suggestionEdit">単語入力</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="suggestedInput">
        <TextInputPage :suggestions="suggestions" v-model="textInputContent" />
      </v-tabs-window-item>
      <v-tabs-window-item value="suggestionEdit">
        <SuggestionsEditPage v-model="suggestions" />
      </v-tabs-window-item>
    </v-tabs-window>
    <v-textarea label="suggestテキスト内容" v-model="textInputContent"></v-textarea>
  </v-container>
</template>

<script>
import TextInputPage from './TextInputPage.vue';
import SuggestionsEditPage from './SuggestionsEditPage.vue';

export default {
  components: {
    TextInputPage,
    SuggestionsEditPage,
  },
  data: () => ({
    tab: null,
    generation: "",
    products: [
      "製品1",
      "製品2",
      "製品3",
    ],
    product: [],
    itemsPerPage: 5,
    pages: [
      {value: 5, title: '5'},
      {value: 10, title: '10'},
      {value: 20, title: '20'},
      {value: -1, title: '$vuetify.dataFooter.itemsPerPageAll'},
    ],
    headers: [
      {title: '番号', alien: 'end', sortable: true, key: 'no'},
      {title: 'id', alien: 'start', sortable: true, key: 'id'},
      {title: 'ope', alien: 'start', sortable: true, key: 'ope'},
      {title: 'ver', alien: 'start', sortable: true, key: 'ver'},
    ],
    wafers: [
      {no:  1, id:  "XXX1", ope:  "YYY1", ver:  "1"},
      {no:  2, id:  "XXX2", ope:  "YYY2", ver:  "2"},
      {no:  3, id:  "XXX3", ope:  "YYY3", ver:  "3"},
      {no:  4, id:  "XXX4", ope:  "YYY4", ver:  "4"},
      {no:  5, id:  "XXX5", ope:  "YYY5", ver:  "5"},
      {no:  6, id:  "XXX6", ope:  "YYY6", ver:  "6"},
      {no:  7, id:  "XXX7", ope:  "YYY7", ver:  "7"},
      {no:  8, id:  "XXX8", ope:  "YYY8", ver:  "8"},
      {no:  9, id:  "XXX9", ope:  "YYY9", ver:  "9"},
      {no: 10, id: "XXX10", ope: "YYY10", ver: "10"},
    ],
    suggestions: ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"], // suggestionsデータを追加
    textInputContent: '', // TextInputPageの内容を保持するデータ
  }),
}
</script>
