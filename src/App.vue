<template>
  <div id="app">
    <transition name="van-slide-right">
      <router-view />
    </transition>
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
    background-color: #eeeeee;
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
