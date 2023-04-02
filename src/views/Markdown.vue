<script setup>
import { onMounted, reactive, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Vditor from 'vditor';
import 'vditor/dist/index.css';
const vditor = ref(null);

const notify = inject("notify")

let watchget = ref($settings.getsettingsData().watchget)
let note = reactive({ title: '', content: '' })

const route = useRoute()
const router = useRouter()

const index = route.params.index

onMounted(
    async function () {
        let data;

        if (index != -1 && index != -2) {
            data = (await $data.getNotes())[index]
            note.title = data.title
            note.content = data.content
        }

        vditor.value = new Vditor('vditor', {
            "mode": watchget.value,
            "preview": {
                "mode": "both"
            },
            //不进行缓存
            cache: {
                enable: false
            },
            height: 620,
            toolbar: [],
            after: () => {
                vditor.value.setValue(note.content)
            },
        });

        let savebtn = document.getElementById('save');
        savebtn.addEventListener('click', () => {
            note.content = vditor.value.getValue()
            if (index == -1) { // 路径为-1则表示新建便签
                $data.insertOne({ ...note })
            } else if (index == -2) {
                $data.insertOne({ ...note });
                router.push('/editor/' + $data.getIndex())
            }
            else {
                $data.updateOne(index, { ...note })
            }
            notify({
                "type": 'success',
                "title": '成功',
                "message": '保存成功！ 😘',
                "position": 'bottom-right',
                "animation": 'rotation',
            })
        })
        // -1 新建 -2 打开
        if (index == -1) return
        if (index == -2) {
            let file = $file.openfile()
            if (file == false) {
                router.back()
            } else {
                note.title = ''
                note.content = file
            }
            return
        }
    })

const back = () => {
    router.back()
}

// let save = () => {
//     if (index == -1) { // 路径为-1则表示新建便签
//         $data.insertOne({ ...note })
//     } else if (index == -2) {
//         $data.insertOne({ ...note });
//         router.push('/editor/' + $data.getIndex())
//     }
//     else {
//         $data.updateOne(index, { ...note })
//     }
//     notify({
//         "type": 'success',
//         "title": '成功',
//         "message": '保存成功！ 😘',
//         "position": 'bottom-right',
//         "animation": 'rotation',
//     })
// }
</script>
<template>
    <div class="container">
        <div class="title-container">
            <!-- <input> -->
            <input class="title" v-model="note.title" spellcheck="false" placeholder="输入标题..." />
        </div>
        <div class="content-container">
            <div id="vditor"></div>
        </div>
        <div class="button-container">
            <button class="button-left" id="cancel" @click="back">取消</button>
            <button class="button-right" id="save" @click="save">保存</button>
        </div>
    </div>
</template>
<style scoped>
.container {
    overflow-y: hidden;
}

.title-container {
    margin-top: 5px;
    margin-left: 0px;
    margin-right: 0px;
    text-align: center;
}

.title {
    width: calc(100% - 30px);
    height: 50px;

    text-align: center;
    font-size: 23px;
    font-weight: bold;

    border: none;
    outline: none;
    border-radius: 10px;
    background-color: white;
}

.content-container {
    margin-top: 15px;
    margin-right: 15px;
    margin-left: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 180px);

    /* text-align: center; */
    border-radius: 10px;
    background-color: white;

    /* display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px; */

    font-size: 17px;
    font-family: "微软雅黑";
}

.web-editor-pre {
    width: 100%;
    min-height: 600px;
    box-shadow: none;
}

.button-container {
    float: right;
    margin-top: 15px;
}

button {
    border: none;
    border-radius: 10px;
    color: white;
    padding: 8px 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: auto 5px;
    transition: 0.1s;
}

.button-right {
    margin-right: 15px;
}

#cancel {
    background-color: #cccccc;
}

#cancel:hover {
    background-color: #999999;
}

#save {
    background-color: #fcc000;
}

#save:hover {
    background-color: #d4a827;
}
</style>