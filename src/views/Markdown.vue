<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { inject } from 'vue';

const notify = inject("notify")

MdEditor.config({ editorConfig: { renderDelay: 20 } })

const toolbars = ['italic', 'underline', 'bold', 'strikeThrough', '-', 'sub', 'sup', 'task', '-', 'link', 'image', 'table', '-', 'mermaid', 'emoji', '=', 'catalog'];
let note = reactive({ title: '', content: '' })

const route = useRoute()
const router = useRouter()

const index = route.params.index
onMounted(async function () {
    if (index == -1) return
    if (index == -2) {
        let file = $file.openfile()
        if (file == false) {
            router.back()
        } else {
            note.content = file
        }
        return
    }
    let data = (await $data.getNotes())[index]
    note.title = data.title
    note.content = data.content
})

const back = () => {
    router.back()
}

const save = () => {
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
}

</script>
<template>
    <div class="container">
        <div class="title-container">
            <input class="title" v-model="note.title" spellcheck="false" placeholder="输入标题..." />
        </div>
        <div class="content-container">
            <md-editor v-model="note.content" :toolbars="toolbars" spellcheck="false" style="height: 600px;" />
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

/* .tinput {
    grid-area: 1 / 1 / 2 / 2;
    border: none;
    outline: none;
    border-right: 1px solid rgb(148, 146, 146);
    resize: none;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
}

.toutput {
    grid-area: 1 / 2 / 2 / 3;
    text-align: left;
    overflow: scroll;
    overflow-x: hidden;
    margin-left: 1.5rem;
} */

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