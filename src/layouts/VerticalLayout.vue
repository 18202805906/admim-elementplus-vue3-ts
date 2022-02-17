<template>
<el-container class="layout">
    <l-header v-model:collapse="collapse" :bread-crumb="parentMenus" class="layout-header__fixed">
      <template #logo>
        <l-logo style="margin: 0 20px 0 0"></l-logo>
      </template>
    </l-header>
    <el-container class="layout-main" style="padding-top: 60px">
      <l-sider :menus="menus" :theme="theme" v-model:collapse="collapse" :open-keys="openeds" :selected-keys="curtMenuKey"></l-sider>
      <div class="app-scroll-wrap">
        <l-bread-crumb :data="parentMenus" v-model:collapse="collapse" />
        <el-main class="app-main">
          <router-view #default="{ Component }">
            <transition mode="out-in" name="fade-transform">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <l-footer></l-footer>
      </div>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { computed, ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, Router, RouteLocation  } from 'vue-router';
import LSider from '@/layouts/components/LSider.vue';
import LLogo from '@/layouts/components/LLogo.vue';
import LFooter from '@/layouts/components/LFooter.vue';
import LHeader from '@/layouts/components/LHeader.vue';
import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';
import { convertToTree } from '@/utils';
import { getStorage } from '@/utils/storage';
function getActiveRoute(activeMenuPath: string, router: Router, activeRoutes: RouteLocation [] = []) {
  let activeRoute = router.resolve(activeMenuPath);
  activeRoutes.unshift(activeRoute);
  let activeMenu = activeRoute.meta?.activeMenu;
  return activeMenu && activeMenu !== activeMenuPath  ? getActiveRoute(activeMenu, router, activeRoutes) : activeRoutes;
}
export default defineComponent({
  name: 'vertical-layout',
  components: {
    LSider,
    LFooter,
    LHeader,
    LLogo,
    LBreadCrumb
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const theme = computed(() => store.state.theme);
    const activeMenu = computed(() => route.meta?.activeMenu || '');
    const matchedRoutes = computed(() => {
      let matched = [...route.matched];
        if (activeMenu.value) {
          let activeRoutes = getActiveRoute(activeMenu.value, router);
          matched.splice(matched.length - 1, 0, ...activeRoutes);
        }
        return matched;
    });
    const curtMenuKey = computed(() => {
      return activeMenu.value ? activeMenu.value : route.path;
    });
    const parentMenus = computed(() => {
      const parentMenus = matchedRoutes.value
          .filter((item) => item.meta?.title)
          .map((item) => ({
            icon: item.meta.icon,
            title: item.meta.title,
            url: item.path
          }));
        return parentMenus;
    });
    const openeds = computed(() => {
     return !collapse.value ? [] : parentMenus.value.map((item) => item.url);
    });
    let userInfo = getStorage('userinfo');
    if (userInfo) {
      store.commit('user/SET_USERINFO', userInfo);
    } else {
      router.push('/login');
    }
    let menus = getStorage('menus') || [];
    menus = convertToTree({ data: menus });
    let collapse = ref(false);
    return {
      theme,
      menus,
      collapse,
      curtMenuKey,
      openeds,
      parentMenus
    };
  }
});
</script>
<style lang="less" scoped>
@import '../assets/styles/layout.less';
</style>
