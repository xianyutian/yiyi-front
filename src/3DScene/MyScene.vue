<template>
    <div v-if="!isFinish" class="loading">
        <MyLoading></MyLoading>
    </div>
    <div v-show="isFinish" class="background">
        <div v-show="isFinish" class="scene" id="scene"></div>
        <div class="controls">
            <FeatureControls @change="changeTextures($event)"></FeatureControls>
        </div>
    </div>
   
</template>


<script setup>
import Base3d from '@/utils/base3d';
import { reactive, onMounted, ref } from 'vue';
import MyLoading from '../components/MyLoading.vue';
import FeatureControls from '../components/FeatureControls.vue';


let isFinish = ref(false);

function loadingFinish() {

    isFinish.value = true;
}

let data = reactive({
    base3d: {}
})


onMounted(() => {
    // let res = await api.get3dProductName()
    data.base3d = new Base3d('#scene', loadingFinish);

})



function changeTextures($event) {
    console.log($event);
    data.base3d.changeTexture($event);
}


</script>

<style scoped>
.background {
    /* margin: 0; */
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg_o.png");
    background-position: center;
    overflow: hidden;
    -webkit-background-size: cover;
    background-size: cover;
}

.controls{
    height: 50px;
}
</style>