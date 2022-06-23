<template>
  <div class="floorBanner">
    <!-- 轮播图 -->
    <div class="swiper-container" ref="myCarousel">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
// 引入 Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  // 使用 watch 来实例化 swiper 的目的就是便于封装全局的轮播组件
  watch: {
    list: {
      // 立即监听，不管数据有没有变化，一开始就监听一次
      immediate: true,
      handler() {
        // 只能监听到数据已经有了，但是 v-for 动态渲染结构我们还是没有办法确定，因此还是得需要 nextTick
        this.$nextTick(() => {
          // 第一个参数：可以是字符串 | 真实的 DOM 节点
          new Swiper(".swiper-container", {
          // var mySwiper = new Swiper(this.$refs.myCarousel, {
            loop: true, // 循环模式选项
            autoplay: true, // 自动切换
            disableOnInteraction: false,
            //  pauseOnMouseEnter: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小圆圈的时候也切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>