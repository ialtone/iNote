<script setup>
import { ref } from 'vue';
import S from '../components/Switch.vue';

let markdown = ref($settings.getsettingsData().markdown)
let watchget = ref($settings.getsettingsData().watchget)
let wysiwyg, ir, sv = false
switch (watchget.value) {
    case "wysiwyg":
        wysiwyg = true
        break;
    case "ir":
        ir = true
        break;
    case "sv":
        sv = true
        break;
    default:
        break;
}

//watchget div显示
let Watchgetif = ref(markdown)
//Markdown触发事件
function markdown_change(event) {
    if (event.target.tagName === 'INPUT') return
    Watchgetif.value = !Watchgetif.value
    $settings.updatemarkdown()
}

function watchget_change(methods) {
    $settings.updatewatchget(methods)
}
</script>

<template>
    <div class="parent">
        <div class="Markdown">是否使用Markdown<S v-model="markdown" @click="markdown_change"></S></div>
        <div class="radio-inputs" v-if="Watchgetif">
            <label class="radio">
                <input type="radio" name="radio" @click="watchget_change('wysiwyg')" :checked="wysiwyg">
                <span class="name">所见即所得</span>
            </label>
            <label class="radio">
                <input type="radio" name="radio" @click="watchget_change('ir')" :checked="ir">
                <span class="name">即时渲染</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio" @click="watchget_change('sv')" :checked="sv">
                <span class="name">分屏预览</span>
            </label>
        </div>

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

.radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    left: 150px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s, visibility 0.3s;
    width: 300px;
    border-radius: 0.5rem;
    background-color: #EEE;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    font-size: 14px;
}

.radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
}

.radio-inputs .radio input {
    display: none;
}

.radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.name {
    background-color: #fff;
    font-weight: 600;
}

.Markdown+.radio-inputs:hover,
.Markdown:hover+.radio-inputs {
    opacity: 1;
    visibility: visible;
}
</style>