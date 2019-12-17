<template>
  <div class="find">
    <div class="header">发现</div>
    <div :class="['block',item.union?'union':'']" v-for="(item,index) in findInfos" :key="index">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#'+item.icon" />
      </svg>
      <div class="name">{{item.name}}</div>
      <i class="iconfont icon-iconfontyoujianto"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      findInfos: [
        {
          icon: "icon-pengyouquanicon",
          name: "朋友圈",
          union: false
        },
        {
          icon: "icon-saoyisao1",
          name: "扫一扫",
          union: true
        },
        {
          icon: "icon-yaoyiyao",
          name: "摇一摇",
          union: false
        },
        {
          icon: "icon-chazhao",
          name: "搜一搜",
          union: false
        },
        {
          icon: "icon-gouwu",
          name: "购物",
          union: true
        },
        {
          icon: "icon-ziyuan",
          name: "游戏",
          union: false
        },
        {
          icon: "icon-xiaochengxu",
          name: "小程序",
          union: false
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.find {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #eeeeee;
  .header {
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
  }
  .block {
    width: inherit;
    height: 3.2rem;
    background-color: #fff;
    // text-align: left;
    box-sizing: border-box;
    padding-left: 0.8rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // margin: 1rem 0;
    margin-bottom: 1rem;
    .icon {
      width: 1.5rem;
      height: width;
      margin-right: 0.8rem;
    }
    .name {
      width: inherit;
      height: inherit;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 1rem;
      border-bottom: 1px solid #eeeeee;
    }
    .icon-iconfontyoujianto {
      position: absolute;
      right: 1rem;
      font-size: 0.8rem;
      color: #bdbdbd;
    }
  }
}
.union {
  margin: 0 !important;
}
</style>