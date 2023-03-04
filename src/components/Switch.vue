<script setup>
import { computed, ref, nextTick } from 'vue'
const props = defineProps({
    modelValue: {  //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
        type: [Number, String, Boolean],
    },
    trueValue: { //switch 打开时的值 可以自定义组件打开的时的值 
        type: [Number, String, Boolean],
        default: true,
    },
    falseValue: { //    switch 关闭时的值  可以自定义组件关闭的时的值 
        type: [Number, String, Boolean],
        default: true,
    }
})
const emits = defineEmits(['update:modelValue', 'change'])

//获取input元素
const input = ref(null)
//判断当前组件是否是打开状态
const checked = computed(() => {
    //因为可以自定义打开和关闭的值 所以这里必须判断 v-model绑定的值 === 组件自定义打开的值
    return props.modelValue === props.trueValue
})
//input事件 获取当前input事件
const handleInput = () => {
    nextTick(() => {
        const val = input.value.checked
        emits("update:modelValue", val); // 开关点击后的状态传给v-model  
        emits("change", val); //给组件增加change 事件
    })
};
</script>

<template>
    <div class="container" :class="{ 'is-checked': checked }">
        <label class="switch" for="checkbox">
            <input type="checkbox" id="checkbox" ref="input" :checked="checked" @change="handleInput"
                :true-value="trueValue" :false-value="falseValue" />
            <div class="slider round"></div>
        </label>
    </div>
</template>

<style scoped>
.container {
    margin: 6px 10px auto;
    display: inline;
    float: right;
}

.switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
}

.switch input {
    display: none;
    z-index: 1;
}

.slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
}

.slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
}

input:checked+.slider {
    background-color: #5c34ee;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;

}

.slider.round:before {
    border-radius: 50%;
}

/* general styling */
html,
body {
    height: 100%;
    margin: 0;
}

body {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #f1f2f3;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
</style>