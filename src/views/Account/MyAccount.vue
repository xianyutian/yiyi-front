<template>
<div class="page">
    <el-header >
      <div class="link">
        <router-link to="/home" style="font-size: 18px; color:#fff"> 
          <i class="iconfont icon-angle-left"></i> 返回网站首页
        </router-link>
      </div>
      <div class="toolbar" style="text-align: right">
        <div style="text-align: center;font-size: 18px">个人中心</div>
        <el-dropdown>
          <el-icon style="margin-left: 10px; margin-top: 5px">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
              <el-dropdown-item @click="dialogFormVisible = true">修改个人信息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  <el-container class="layout-container-demo" style="height:645px">

    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu @select="click" default-active='1'>
            <div>&nbsp;</div>
            <div style="margin-left: 30% ;">
              <el-avatar :size="80" :icon="UserFilled" />
            </div>
            <div>&nbsp;</div>
            <!-- 默认选中第一个菜单 -->
            <el-menu-item index="1">
              <el-icon>
                <Avatar />
              </el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <!-- route可以传路由对象实现跳转 -->
            <el-menu-item index="2" route="">
              <el-icon>
                <Star />
              </el-icon>
              <span><router-link to="/profile">收藏夹</router-link></span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
              <el-button class="button" text @click="dialogFormVisible = true" type="primary">修改</el-button>
              <el-dialog v-model="dialogFormVisible" title="个人信息修改" center>
                <el-form :model="myAccount">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="myAccount.username" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="myAccount.password" autocomplete="on" type="password" />
                  </el-form-item>
                  <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="myAccount.address" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmUpdate">确认</el-button>
                  </span>
                </template>
              </el-dialog>
            </div>
          </template>
          <el-row>
            <el-col v-for="(value, key, index) in myAccount" :key="key" :span="4" :offset="index > 0 ? 2 : 0">
              <el-card style="width: 220px;height: 450px;" :body-style="{ padding: '0px' }" v-if="index <= 3">
                <img :src="require('@/assets/images/' + key + '.jpg')" class="image" />
                <div style="padding: 15px">
                  <span style="font-size: 20px;">{{ key }}</span>
                  <div class="bottom">
                    <div class="time" v-if="key !== 'password'">{{ value }}</div>
                    <div v-else>
                      <el-input class="inputDeep" 
                      v-model="myAccount.password" 
                      type="password" 
                      show-password 
                      readonly="true"
                        style="width: 180px;">
                        </el-input>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </el-container>

  <CommonFooter></CommonFooter>
</div>
  


</template>

<script setup>
import { reactive, ref } from 'vue'
import { Avatar, Setting, Star, UserFilled, Hide } from '@element-plus/icons-vue'
import CommonFooter from '@/components/CommonFooter'
import { Back } from '@element-plus/icons-vue'
import {updateAccount} from '@/api/users.js'
import { useRouter } from 'vue-router'
import {getAccount} from '@/api/users.js'
//此处的data接收后端发送来的用户数据,是一个双向绑定的对象
/*
    data.uid
    data.username
    data.password
    data.address
*/
const router = useRouter();

let myAccount = reactive({
  uid: '1234567890',
  username: 'ltjj',
  password: 'tql',
  address: '神都是住在天上的',
  status: '',
  favouritesId: ''
})

if(!window.sessionStorage.getItem("isLocal")){
  getAccount(window.sessionStorage.getItem("uid")).then(data => {
    if(data.code !== 200)
      myAccount = data.data
    else
      alert(data.msg)
  })
}

// 用于监听对话框的渲染与否
const dialogFormVisible = ref(false)
// 对话框表单输入框的长度
const formLabelWidth = '140px'
function click(index) {
  // index=1:点击了个人中心(默认选项)
  // index=2:点击了收藏夹(这里可以直接用路由跳转,不然又要在再写一个专门用来展示收藏夹的页面,或者你可以直接把收藏夹的界面搬过来)

}

// 登出的事件，加到那个登出按钮的点击事件里面
const logout = () => {
  var con = confirm('确认登出吗？')
  if(con){
    window.sessionStorage.setItem("uid", "")
    window.sessionStorage.setItem("token", "")
    alert('您已登出！')
    // TODO 跳转到 /home
    router.push('/home')
  }
}

// 点击修改按钮,弹出修改对话框,点击确定后触发的函数
function confirmUpdate() {
  // 发送修改的请求
  let isLocal = window.sessionStorage.getItem("isLocal")
  if(isLocal){
    alert("修改成功！")
  } else {
    updateAccount(myAccount).then(data => {
      if(data.code !== 200)
        alert(data.msg)
      else
        alert("修改成功！")
    })
  }
  // 关闭对话框
  dialogFormVisible.value = false
}

</script>

<style scoped lang="less">
.page{
  background: #f5f5f5;
  height: 800px;
  .el-header {
    position: relative;
    background-color: #27BA9B;
    color: #fff;
    height: 100px;
    .link{
      color: #fff;
      float: left;
      margin-top: 32px;
      margin-left: 310px;
      .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .icon-angle-left:before {
        content: "<";
      }
    }
    .toolbar{
      float: left;
      display: inline-flex;
      margin-top: 30px;
      margin-left: 530px;
      width: 400px;
    }
  }
}
.layout-container-demo{
   width: 1240px;
   margin: 0 auto;
   position: relative;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #27BA9B;
  margin-top: 20px;
  height: 620px;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 20px;
  font-size: 18px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 98.5%;
  height: 96%;
  margin-top: 20px;
  margin-left: 10px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.time {
  font-size: 15px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 200px;
  height: 300px;
  display: block;
}

.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;

    .el-input__inner {
      cursor: default !important;
    }
  }
}
</style>
