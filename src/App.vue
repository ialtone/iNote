<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navigator from './components/Navigator.vue'
import fold from './components/fold.vue'
import Icon from './components/Icon.vue'
import OneWord from './components/OneWord.vue'

const router = useRouter()

const pages = reactive([
  {
    name: '便签',
    icon: 'pencil',
    path: '/'
  },
  {
    name: '设置',
    icon: 'setting',
    path: '/settings'
  },
  {
    name: '我的',
    icon: 'my',
    path: '/my'
  },
  {
    name: '关于',
    icon: 'info',
    path: '/about'
  }
])
const defaultIndex = 0

const changePage = (pageIndex) => {
  router.push(pages[pageIndex].path)
}

const closeWindow = () => {
  $app.close()
}
</script>

<template>
  <div class="container">
    <div class="side-panel">
      <h1 class="app-title">i笔记</h1>
      <Navigator class="navigator" :pages="pages" :defaultIndex="defaultIndex" @selected="changePage"></Navigator>
      <OneWord class="oneword"></OneWord>
      <fold class="fold"></fold>
    </div>
    <div class="status-bar">
      <Icon class="close-button" name="close" color="black" selectedColor="red" @click="closeWindow"></Icon>
    </div>
    <div class="content-panel">
      <router-view></router-view>
    </div>
  </div>
  <be-notifications />
</template>

<style scoped>
.container {
  display: inline;
  background-color: white;
}

.side-panel {
  float: left;

  height: 100%;
  width: 200px;

  background-color: #f3f3f3;

  -webkit-app-region: drag;
  /* 允许用户进行窗口拖动 */
}


.app-title {
  height: 49px;

  margin-top: 40px;

  font-size: 27px;
  text-align: center;

  color: black;
}

.navigator {
  -webkit-app-region: no-drag;
  /* 禁止拖动 */
}

.fold {
  -webkit-app-region: no-drag;
  width: 100%;
  height: 100%
}

.oneword {
  position: fixed;
  width: 190px;
  margin-top: 30px;
  margin-left: 10px;
  /* transform: scale(0.5); */
}

.content-panel {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;

  height: 100%;
  width: calc(100% - 200px);

  background-color: #f9f9f9;
  overflow: auto;
}

.status-bar {
  float: right;
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  height: 45px;
  width: calc(100% - 200px);

  background-color: #f9f9f9;

  -webkit-app-region: drag;
}

.close-button {
  width: 23px;
  height: 23px;
  margin-right: 18px;
  margin-top: 15px;
  float: right;

  -webkit-app-region: no-drag;
}
</style>