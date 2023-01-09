<template>
    <div :class="['input-complete', isFocused && 'focus']">
        <div class="icon-search">
            <IconSearch />
        </div>
        <div class="d-flex">
            <template v-if="listSelected.length">
                <SelectedItem 
                v-for="item in listSelected"
                :key="item[keyId]"
                :keyName="keyName"
                :item="item"
                @onRemoveItem="onRemoveItem(item)"
                />
            </template>
        <input 
        v-if="!checkMaxChoice"
        type="text"
        :placeholder="placeholder"
        v-model="keyWord"
        @input="onInputSearch"
        @focus="isFocused = true"
        />
        </div>
        <DropdownMenu 
        v-if="showDropdown"
        :options="options"
        :keyId="keyId"
        :keyName="keyName"
        :listSelected="listSelected"
        @onSelectItem="onSelectItem"
        />
    </div>
</template>

<script>
import IconSearch from '../Icons/IconSearch.vue';
import SelectedItem from './SelectedItem.vue';
import DropdownMenu from './DropdownMenu.vue'
export default {
    name: 'InputAutocomplete',
    components: {
        IconSearch,
        SelectedItem,
        DropdownMenu
    },
    data() {
        return {
           keyWord: "",
           isFocused: false 
        };
    },

    mounted() {
    },
    computed: {
        showDropdown() {
            return this.isFocused && this.keyWord.length;
        },
        checkMaxChoice() {
            return this.maxChoice && this.listSelected.length === this.maxChoice;
        }
    },
    methods: {
        onInputSearch() {
            this.$emit("input", this.keyWord);
        },
        onSelectItem(item) {
            if (!this.checkMaxChoice) {
                this.keyWord = "";
                this.isFocused = false;
                this.onInputSearch();
                this.$emit("onSelectItem", item);
            }
        },
        onRemoveItem(item) {
            this.$emit("onRemoveItem", item);
        }
    },
    props: {
        listSelected: {
            type: Array,
            default: () => [],
        },
        maxChoice: {
            type: Number,
            required: false,
        },
        placeholder: { 
            type: String,
            default: () => "Tìm Kiếm"
        },
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: () => "",
        },
        keyId: {
            type: String,
            default: () => "id",
        },
        keyName: {
            type: String,
            default: () => "name"
        }
    }
};
</script>

<style scoped>
.input-complete {
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    gap: 8px;
    font-size: 14px;
    line-height: 20px;
    min-height: 48px;
    width: 90vw;
    background: rgba(230, 249, 255, 0.2);
    position: relative;
}
.input-complete.focus {
    border: 1px solid #1991d2;
}
.icon-search {
    height: 32px;
    display: flex;
    align-items: center;
}
.d-flex {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    align-content: center;
}
.d-flex > input {
    outline: none;
    border: none;
    width: 200px;
    height: 32px;
    background: transparent;
}
.d-flex > input::placeholder {
    color: #bfbfbf;
}
</style>