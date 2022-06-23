<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="deleteIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派 + 编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- router-link 是一个组件，如果三级联动的路由跳转都用声明式导航，创建过多的组件实例，会造成卡顿的现象 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  
                  v-show="currentIndex == index"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- router-link 是一个组件，如果三级联动的路由跳转都用声明式导航，创建过多的组件实例，会造成卡顿的现象 -->
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- router-link 是一个组件，如果三级联动的路由跳转都用声明式导航，创建过多的组件实例，会造成卡顿的现象 -->
                          <!-- <router-link to="search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">摊摊超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 最好的引入方式，按需引入
// 节流
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类的索引
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让 show 属性值变为 false
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  methods: {
    // 鼠标进入修改响应式数据 currentIndex 属性值
    changeIndex: throttle(function (index) {
      // 使用节流
      // index：鼠标移上某一个一级分类的元素索引值
      this.currentIndex = index;
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类 h3，都会触发鼠标进入事件
      // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分 h3 触发了
    }, 50),
    // changeIndex(index){ // 未使用节流
    //   this.currentIndex = index
    // },
    deleteIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航 + 事件委派
      // 利用事件委派存在一些问题：1、点击的一定是 a 标签 2、如何获取参数【1、2、3级分类的产品】

      // 第一个问题：把子节点当中 a 标签，加上自定义属性 data-categoryName，其余子节点是没有的
      // 节点有一个 dataset 属性，可以获取节点的自定属性与属性值
      // dataset 只能读取有 :data- 前缀的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果标签身上拥有 categoryName 一定是 a 标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类的 a 标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断，如果路由跳转的时候，带有 params 参数，也得一并带过去
        location.params = this.$route.params;
        // 整理完参数
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
  computed: {
    // ...mapState({
    //   // 右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    //   // 注入一个参数 state，其实即为大仓库中的数据
    //   categoryList:state => state.home.categoryList
    // })
    ...mapState("home", ["categoryList"]), // 开启命名空间
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      // overflow: hidden;
      z-index: 999;

      // 鼠标悬浮显示背景颜色
      .cur {
        background: rgb(235, 187, 187);
        color: #fff;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    a:hover{
      cursor: pointer;
      font-weight: bold;
    }
    // 过度动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.25s linear;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>