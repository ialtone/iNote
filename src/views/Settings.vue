<script setup>
import { ref } from 'vue';
import S from '../components/Switch.vue';

let markdown = ref($settings.getsettingsData().markdown)

function markdown_change(evnet) {
    if (evnet.target.tagName === 'INPUT') return
    $settings.updatemarkdown()
}
// console.log(value1.value)

</script>

<template>
    <div class="parent">
        <div class="Markdown">是否使用Markdown<S v-model="markdown" @click="markdown_change" ></S></div>
    </div>
</template>

<style scoped>
.parent {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-top: 40px;
    width: 600px;
}

.Markdown {
    grid-area: 1 / 1 / 2 / 2;
    font-size: 30px;
    margin-left: 60px;
    padding-left: 12px;
    border-radius: 15px;
}

.Markdown:hover {
    background-color: rgb(241, 241, 241);
}
</style>