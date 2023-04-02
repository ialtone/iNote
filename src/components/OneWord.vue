<script setup>
import { ref } from 'vue'
import axios from 'axios';

const text_first = ref('')
const text_second = ref('')
let boder_hidden = ref('')
let str = ""
let num = Math.round(Math.random() * 2)
switch (num) {
    case 0:
        axios.get('https://v2.jinrishici.com/one.json').then((res) => {
            str = res.data.data.content;
            // console.log(str.slice(0, str.length / 2));
            // console.log(str.slice(str.length / 2));
            let i = 0;
            let j = str.length / 2
            setInterval(() => {
                if (i <= str.length / 2) {
                    // console.log(str[i]);
                    text_first.value = str.slice(0, i);
                    i++;
                }
            }, 200);
            setTimeout(() => {
                boder_hidden = ref({ "border": "none" })
                setInterval(() => {
                    if (j <= str.length) {
                        text_second.value = str.slice(str.length / 2, j);
                        j++;
                    }
                }, 200);
            }, (str.length / 2 + 2) * 200)
            clearInterval()
            clearTimeout()
        });
        break;
    case 1:
        axios.get('https://v1.jinrishici.com/all.json').then((res) => {
            str = res.data.content;
            let i = 0;
            let j = str.length / 2
            setInterval(() => {
                if (i <= str.length / 2) {
                    text_first.value = str.slice(0, i);
                    i++;
                }
            }, 200);
            setTimeout(() => {
                boder_hidden = ref({ "border": "none" })
                setInterval(() => {
                    if (j <= str.length) {
                        text_second.value = str.slice(str.length / 2, j);
                        j++;
                    }
                }, 200);
            }, (str.length / 2 + 2) * 200)
            clearInterval()
            clearTimeout()
        });
        break;
    case 2:
        axios.get('https://v1.hitokoto.cn/?encode=text').then((res) => {
            str = res.data;
            let i = 0;
            let j = str.length / 2
            setInterval(() => {
                if (i <= str.length / 2) {
                    // console.log(str[i]);
                    text_first.value = str.slice(0, i);
                    i++;
                }
            }, 200);
            setTimeout(() => {
                boder_hidden = ref({ "border": "none" })
                setInterval(() => {
                    if (j <= str.length) {
                        text_second.value = str.slice(str.length / 2, j);
                        j++;
                    }
                }, 200);
            }, (str.length / 2 + 2) * 200)
            clearInterval()
            clearTimeout()
        });
        break;
    default:
        text_first.value = "未知错误"
        break;
}
</script>

<template>
    <div>
        <p class="text" :style="boder_hidden">{{ text_first }}</p><br>
        &nbsp;&nbsp;&nbsp;&nbsp;<p class="text">{{ text_second }}</p>
    </div>
</template>
  
<style>
.text {
    display: inline-block;
    border-right: 2px solid #000;
    font-size: 18px;
    font-weight: bold;
    padding-right: 5px;
    margin: auto;
}

@keyframes blink {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>