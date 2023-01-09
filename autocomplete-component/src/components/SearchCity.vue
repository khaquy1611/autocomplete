<template>
  <div class="page-layout">
    <div class="title">Tìm kiếm thành phố (max 3)</div>
    <InputAutoComplete 
    placeholder="Nhập tên thành phố để tìm kiếm"
    v-model="keywords"
    :options="listOptions"
    :keyId="keyId"
    :keyName="keyName"
    :maxChoice="3"
    :listSelected="selectedCities"
    @onSelectItem = "onSelectItem"
    @onRemoveItem = "onRemoveItem"
    />
  </div>
</template>

<script>
import InputAutoComplete from "./AutoComplete/InputAutoComplete.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SearchCity",

  data() {
    return {
      keywords: "",
      keyName: "name",
      keyId: "code",
      selectedCities: [],
    };
  },
  async created() {
    await this.fetchListCities();
  },
  mounted() {
    console.log(this.listOptions);
  },
  computed: {
    ...mapGetters("city", ["getCities"]),
    listOptions() {
      return (
        (this.keywords.length &&
          this.getCities.filter((c) =>
            c[this.keyName].toLowerCase().includes(this.keywords.toLowerCase())
          )) ||
        []
      );
    },
  },
  methods: {
    ...mapActions("city", ["fetchListCities"]),
    onSelectItem(item) {
      this.selectedCities.push(item);
    },
    onRemoveItem(item) {
      this.selectedCities = this.selectedCities.filter(
        (c) => c[this.keyId] !== item[this.keyId]
      );
    },
  },
  components: {
    InputAutoComplete,
  },
};
</script>

<style scoped>
.page-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.page-layout > .title {
  width: 100%;
}

:deep(.input-complete) {
  width: 100%;
}
</style>
