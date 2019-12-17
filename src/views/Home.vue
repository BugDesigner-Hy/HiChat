<template>
  <div id="home">
    <!-- <transition name="van-slide-right">
      <router-view />
    </transition> -->
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/chat" name="chat" info="48">
        <!-- <room-dot></room-dot> -->
        <span>嗨~</span>
        <!-- slot-scope="props" -->
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="icon.chat"></van-icon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/address-book" name="address-book">
        <span>通讯录</span>
        <!-- slot-scope="props" -->
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="icon.contacts"></van-icon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/find" name="find" dot>
        <span>发现</span>
        <!-- slot-scope="props" -->
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="icon.find"></van-icon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/about-me" name="about-me">
        <span>我</span>
        <!-- slot-scope="props" -->
        <van-icon class="iconfont" class-prefix="icon" slot="icon" :name="icon.aboutMe"></van-icon>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "chat",
      icon: {
        chat: "liaotian",
        contacts: "contacts",
        find: "faxian1",
        aboutMe: "wo"
      }
    };
  },
  mounted(){
    this.$router.push('/chat')
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .van-tabbar {
    z-index: 999;
    height: 3.8rem;
    background-color: #f5f5f5;
    .van-tabbar-item {
      .van-tabbar-item__icon {
        i {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
