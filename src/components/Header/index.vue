<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>摊摊卖欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!userName">
            <span>请&nbsp;</span>
            <!-- 声明式导航:务必要有 to 属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的摊摊</a>
          <a href="###">摊摊会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注摊摊卖</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    // 搜索按钮的回调函数：需要向 search 路由进行跳转
    goSearch() {
      // 路由传递参数：
      // 第一种：字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种：对象
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        query: this.$route.query,
      };
      this.$router.push(location);
      this.keyword = "";
      // #region 面试题
      /* 面试题1：路由参数(对象写法) path 是否可以结合 params 参数一起使用 */
      // 答：路由传递传参的时候，对象的写法可以是name、path形式，但是 path 这种写法不能与 params 参数一起使用
      // this.$router.push({path:'/search',params: {keyword: this.keyword},query:{k : this.keyword.toUpperCase()}})
      /* 面试题2：如何指定 params 参数可传可不传？ */
      // 如果路由要求传递 params 参数，但是不传递 params 参数，发现 URL 会有问题
      // 如何指定 params 参数可传可不传，在配置路由的时候，在占位的后面加上一个问号【params可以传递或者不传递】
      // this.$router.push({name:'search',query:{k: this.keyword.toUpperCase()}})
      /* 面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？ */
      // 使用 undefined 解决：params 参数可以传递或传递的是空的字符串
      // this.$router.push({name:'search',params: {keyword: '' || undefined},query:{k : this.keyword.toUpperCase()}})
      /* 面试题4：路由组件能不能传递props数据? */
      // 可以，有三种写法：
      // 布尔类型：若布尔值为真，就会将该路由组件收到的所有params参数作为路由组件的属性
      // 对象写法：额外的给路由组件传递一些 props
      // 函数写法：可以 params参数、query参数，通过 props 传递给路由组件
      // this.$router.push({name:'search',params: {keyword: this.keyword},query:{k : this.keyword.toUpperCase()}})
      // #endregion
    },
    // 退出登录
    async logout() {
      // 退出登录需要做的事情
      // 1. 需要发起请求，通知服务器退出登录
      // 2. 清除项目中的数据【userInfo、token】
      try {
        // 如果退出成功，回到首页
        await this.$store.dispatch("user/userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped lang='less'>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
          .register:hover {
            cursor: pointer;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>