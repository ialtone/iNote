<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: {  //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
        type: [Number, String, Boolean],
    }
})
let checked = props.modelValue
</script>
<template>
    <div class="container">
        <label class="switch">
            <input type="checkbox" :checked="checked">
            <span class="slider"></span>
        </label>
    </div>
</template>
<style scoped>
body {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #f1f2f3;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.container {
    margin: 8px 10px -6px 0;
    display: inline;
    float: right;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #5c34ee;
}

input:focus+.slider {
    box-shadow: 0 0 1px #5c34ee;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>