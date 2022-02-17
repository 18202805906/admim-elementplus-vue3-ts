<template>
  <el-header class="layout-header" :style="{ background: themeColor }">
    <div class="header-left">
      <slot name="logo"></slot>
      <!-- <i class="trigger" :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleCollapse" /> -->
      <slot name="breadCrumb"></slot>
    </div>
    <div class="header-right r-nw-fe-c ">
      <el-tooltip content="首页">
        <i class="el-icon-house quick"  @click="$router.push('/home')"/>
      </el-tooltip>
      <el-tooltip :content="`有${count}未读消息`">
        <el-badge :value="Number(count)" :max="99" class="quick" style="margin-bottom: -8px;">
          <el-icon :size="22" >
            <message></message>
          </el-icon>
        </el-badge>
      </el-tooltip>
      <el-tooltip content="API文档">
        <el-icon :size="22"  class="quick">
            <document @click="goToApi"></document>
        </el-icon>
      </el-tooltip>
      <!-- <el-tooltip content="切换主题">
        <l-theme-picker class="quick" ref="theme" @themeChange="(val)=>{themeColor = val}"></l-theme-picker>
      </el-tooltip> -->
      <el-dropdown  @command="handleClick"> 
        
        <span class="user r-w-c-c" >
          <el-avatar :size="25" ><el-icon> <UserFilled /></el-icon></el-avatar>
          <span style="margin-left: 10px; vertical-align: middle; color: #fff">
            {{ userInfo.username }}
            <el-icon :size="22" class="quick" style="margin-left: 5px; font-size: 10px">
                <caretBottom></caretBottom>
            </el-icon>
          </span> 
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item command="person"><el-icon :size="13"><edit /></el-icon>修改密码 </el-dropdown-item>
            <el-dropdown-item command="logout"> <el-icon :size="13"><switchButton /></el-icon>退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      
    </div>
    <l-personal-edit v-model="visiblePsd"></l-personal-edit>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';
import { getStorage } from '@/utils/storage';
import { useStore } from 'vuex';
import { logout } from '@/router';
// import LThemePicker from './module/LThemePicker.vue';
import LPersonalEdit from './module/LPersonalEdit.vue';
import config from '@/config';

export default defineComponent({
  components: {
    LPersonalEdit,
    // LThemePicker
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    breadCrumb: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    let store = useStore();
    let state = reactive({
      count: getStorage('count') || 0,
      visiblePsd: false,
      themeColor: getStorage('el:themeColor') || config.themeColor
    });
    let userInfo = computed(() => store.state.user.userinfo);
    function handleClick(  key:  string ) {
      switch (key) {
        case 'person':
          state.visiblePsd = true;
          break;
        case 'logout':
          ElMessageBox.confirm('您确定要退出吗？','提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }).then(() => {
            logout();
          });
          break;
      }
    }
    function goToApi() {
      alert('开发中!');
    }
    // 关闭修改密码弹框
    function changeVisiblePsd(val: boolean) {
      state.visiblePsd = val;
    }
    return {
      ...toRefs(state),
      userInfo,
      handleClick,
      goToApi,
      changeVisiblePsd
    };
  }
});
</script>

<style lang="less" scoped>
.layout-header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10));
  z-index: 11;
}
.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  .quick {
    margin-right: 20px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
.nav-menu {
  position: relative;
  margin-right: 30px;
  cursor: pointer;
  width: 100px;
  height: 100%;
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  background-color: rgba(#fff, 0.2);
  .arrow {
    transition: all 0.8s ease 0s;
  }
  .rotate {
    transform: rotate(180deg);
  }
}
.drawer {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(rgb(39, 30, 30), 0.6);
}
</style>
