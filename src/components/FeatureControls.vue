<template>
    <el-menu 
    :default-active="activeIndex" 
    class="el-menu-demo" 
    mode="horizontal" 
    @select="handleSelect"
    >
        <el-sub-menu index="1">
            <template #title><img src="../assets/coat/coat0.png">
                <div style="text-indent:1em">面料</div>
            </template>
            <el-menu-item index="1">
                <img src="../assets/coat/coat0.png">
                <div style="text-indent: 1em">面料1</div>
            </el-menu-item>
            <el-menu-item index="2">
                <img src="../assets/coat/coat1.jpg" >
                <div style="text-indent: 1em">面料2</div>
            </el-menu-item>
            <el-menu-item index="3">
                <img src="../assets/coat/coat2.jpg" >
                <div style="text-indent: 1em">面料3</div>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
            <template #title><img src="../assets/lining/lining.png">
                <div style="text-indent:1em">内衬</div>
            </template>
            <el-menu-item index="1">
                <img src="../assets/lining/lining0.png" >
                <div style="text-indent: 1em">内衬1</div>
            </el-menu-item>
            <el-menu-item index="2">
                <img src="../assets/lining/lining1.jpg" >
                <div style="text-indent: 1em">内衬2</div>
            </el-menu-item>
            <el-menu-item index="3">
                <img src="../assets/lining/lining2.jpg" >
                <div style="text-indent: 1em">内衬3</div>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
            <template #title><img src="../assets/tie/tie.png">
                <div style="text-indent: 1em">领带</div>
            </template>
            <el-menu-item index="1">
                <img src="../assets/tie/tie0.png" >
                <div style="text-indent: 1em">领带1</div>
            </el-menu-item>
            <el-menu-item index="2">
                <img src="../assets/tie/tie1.jpg" >
                <div style="text-indent: 1em">领带2</div>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>

</template>

<script setup>
import { ref, defineEmits } from 'vue';

const activeIndex = ref('1')

let a = 0, b = 0, c = 0;

let index = "";

const emit = defineEmits(['change']);

const handleSelect = (key, keyPath) => {

    if (keyPath[0] == '1') {
        a = parseInt(keyPath[1]) - 1;
    }
    else if (keyPath[0] == '2') {
        b = parseInt(keyPath[1]) - 1;
    }
    else if (keyPath[0] == '3') {
        c = parseInt(keyPath[1]) - 1;
    }
    else {
        a = 0;
        b = 0;
        c = 0;
    }

    index = "suit" + a + "" + b + "" + c;

    emit("change", index);

}
</script>

<style>
img {
    width: 30px;
    height: 30px;
}

el-menu-item {
    background-color: aliceblue;
}
</style>
