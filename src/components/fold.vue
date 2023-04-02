<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue';

const notify = inject("notify")
const router = useRouter()

//打开文件
const openfile = () => {
    let path = router.currentRoute.value.fullPath;  //获取当前路由
    let slice = path.substring(1, 7)
    if (slice == 'editor' || slice == 'markdo') {
        notify({
            "type": 'info',
            "title": '提示',
            "message": '请返回主界面打开哦！ 😘',
            "position": 'bottom-right',
            "animation": 'rotation',
        })
    } else {
        let markdown = $settings.getsettingsData().markdown
        if (markdown == true) { router.push('/markdown/-2') } else {
            router.push('/editor/-2')
        }
    }

}
//文件另存为
const savefile = () => {
    let path = router.currentRoute.value.fullPath;  //获取当前路由
    let slice = path.substring(1, 7)
    if (slice == 'editor' || slice == 'markdo') {
        const pathslice = path.lastIndexOf("/");
        let Index = path.slice(pathslice + 1);
        if (Index == -2) {
            notify({
                "type": 'info',
                "title": '提示',
                "message": '请先保存哦！ 😘',
                "position": 'bottom-right',
                "animation": 'rotation',
            })
        } else {
            let note = $data.getNotesSync()[Index]
            let text = note.title+"\n"+note.content
            $file.savefile(text);
        }

    } else {
        notify({
            "type": 'info',
            "title": '提示',
            "message": '请先打开笔记哦！ 😘',
            "position": 'bottom-right',
            "animation": 'rotation',
        })
    }
}   
</script>
<template>
    <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" />

            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
                <a>
                    <li @click="openfile">打开</li>
                </a>
                <a>
                    <li @click="savefile">另存为</li>
                </a>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
#menuToggle {
    display: block;
    position: relative;
    top: 465px;
    left: 30px;

    z-index: 1;

    -webkit-user-select: none;
    user-select: none;
}

#menuToggle a {
    text-decoration: none;
    color: #232323;

    transition: color 0.3s ease;
}

#menuToggle a:hover {
    color: tomato;
}


#menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0;
    /* hide this */
    z-index: 2;
    /* and place it over the hamburger */

    -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: #cdcdcd;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        opacity 0.55s ease;
}

#menuToggle span:first-child {
    transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked~span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu {
    position: absolute;
    width: 120px;
    margin: -270px 0 0 -60px;
    padding: 50px;
    padding-top: 20px;
    padding-left: 60px;
    padding-bottom: 155px;
    border-radius: 20px;

    background: #ededed;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: translate(-100%, 0);

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
}

#menu li {
    padding: 10px 0;
    font-size: 22px;
    margin-left: 35px;
    font-weight: bold;
    cursor: pointer;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked~ul {
    transform: none;
}
</style>