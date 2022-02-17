<template>
  <span>
    <el-color-picker
      v-model="themeColor"
      size="mini"
      :predefine="['#409EFF', '#67C23A', '#E6A23C', '#f5222d', '#11a983', '#13c2c2', '#6959CD', '#434f5d']"
      class="theme-picker"
      popper-class="theme-picker-dropdown"
      title="换肤"
      @change="themeChange"
    />
  </span>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import config from '@/config';
import { setStorage, getStorage } from '@/utils/storage';
const version = require('element-plus/package.json').version; // element-plus version from node_modules
const ORIGINAL_THEME = '#409EFF'; // default color

export default defineComponent({
  name: 'themePicker',
  setup(props, {emit}) {
    let themeColor = ref(config.themeColor);
    let chalk = '';
    // const emit = defineEmits(['themeChange']);
    onMounted(() => {
      themeColor.value = getStorage('el:themeColor') || config.themeColor;
      themeChange(themeColor.value);
    });
    const store = useStore();
    const themeChange = async (val: string) => {
      emit('themeChange', val);
      setStorage('el:themeColor', val);
      store.commit('SET_THEMECOLOR', val);
      const oldVal = chalk ? themeColor.value : ORIGINAL_THEME;
      console.log(oldVal, themeColor.value, val, chalk);
      if (typeof val !== 'string') return;
      const themeCluster = getThemeCluster(val.replace('#', ''));
      const originalCluster = getThemeCluster(oldVal.replace('#', ''));
      const $message = ElMessage({
        message: '更换主题中...',
        customClass: 'theme-message',
        type: 'success',
        duration: 10,
        icon: 'el-icon-loading'
      });

      const getHandler = (id: string) => {
        return () => {
          const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''));
          const newStyle = updateStyle(chalk, originalCluster, themeCluster);
          let styleTag = document.getElementById(id);

          // this.test = newStyle;

          if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.setAttribute('id', id);
          }
          document.getElementsByTagName('head')[0].insertBefore(styleTag, null);
          styleTag.innerText = newStyle;
        };
      };

      if (!chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css `;
        // const url=`${process.env.BASE_URL}theme/index.css`;
        await getCSSString(url);
      }
      const chalkHandler = getHandler('chalk-style');

      chalkHandler();

      const styles = [].slice.call(document.querySelectorAll('style')).filter((style: any) => {
        const text = style.innerText;
        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
      });

      styles.forEach((style: any) => {
        const { innerText } = style;
        if (typeof innerText !== 'string') return;
        style.innerText = updateStyle(innerText, originalCluster, themeCluster);
      });
      $message.close();
    };
    const getThemeCluster = (theme: string) => {
      const tintColor = (color: string, tint: number) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
        }
      };

      const shadeColor = (color: string, shade: number) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    };
    const updateStyle = (style: any, oldCluster: any[], newCluster: string[]) => {
      let newStyle = style;
      oldCluster.forEach((color: string | RegExp, index: string | number) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
      });
      return newStyle;
    };

    const getCSSString = (url: string) => {
      return new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            resolve();
          }
        };
        xhr.open('GET', url);
        xhr.send();
      });
    };
    return {
      themeColor,
      themeChange
    };
  }
});
</script>

<style>
.theme-picker {
  /* float: left; */
  margin-top: 7px;
  vertical-align: middle;
}

.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 20px !important;
  width: 20px !important;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
