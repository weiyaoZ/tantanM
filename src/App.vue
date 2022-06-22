<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header />
    <!-- 路由展示符 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在 Login、Register 时隐藏-->
    <!-- 使用路由原信息来决定 Footer 组件是否显示 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        // 通知 Vuex 发请求，获取数据，存储于仓库中，
        // this.$store.dispatch('categoryList')
        await this.$store.dispatch("home/getCategoryList"); // 开启命名空间
      } catch (error) {
        alert(error.message)
      }
    },
  },
};
</script>

<style>
</style>
