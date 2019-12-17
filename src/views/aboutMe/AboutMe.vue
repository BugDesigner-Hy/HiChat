<template>
  <div class="about-me">
    <div class="header">
      <i class="iconfont icon-paishe_A_Facet"></i>
      <div class="img-wrapper">
        <img src="../chat/assets/head.jpg" alt />
      </div>
      <div class="info">
        <div class="name">海洋</div>
        <div class="wx-number">
          微信号: hy18811435711
          <div class="detail">
            <i class="iconfont icon-erweima"></i>
            <i class="iconfont icon-iconfontyoujianto"></i>
          </div>
        </div>
      </div>
    </div>
    <div :class="['block',item.union?'union':'']" v-for="(item,index) in compontents" :key="index">
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
      compontents: [
        {
          icon: "icon-zhifu",
          name: "支付",
          union: false
        },
        {
          icon: "icon-shoucang2",
          name: "收藏",
          union: true
        },
        {
          icon: "icon-xiangce",
          name: "相册",
          union: true
        },
        {
          icon: "icon-qiabao",
          name: "卡包",
          union: true
        },
        {
          icon: "icon-biaoqing1",
          name: "表情",
          union: true
        },
        {
          icon: "icon-shezhi",
          name: "设置",
          union: false
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.about-me {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #eeeeee;
  .header {
    width: inherit;
    height: 8rem;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-top: 1.5rem;
    .icon-paishe_A_Facet {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.2rem;
    }
    .img-wrapper {
      width: 3.5rem;
      height: width;
      margin: 1rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.3rem;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .name {
        padding: 0.5rem 0;
        padding-top: 0;
        font-size: 1.5rem;
        letter-spacing: 0.2rem;
        margin-top: -0.3rem;
      }
      .wx-number {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 0.9rem;
        color: #9e9e9e;
        .detail {
          position: absolute;
          right: 1rem;
          i {
            margin-left: 0.5rem;
            font-size: 0.8rem;
          }
        }
      }
    }
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
    margin: 1rem 0;
    // margin-bottom: 1rem;
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
      // margin-top: -0.1rem;
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