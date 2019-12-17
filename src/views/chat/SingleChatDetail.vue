<template>
  <div class="chat-detail">
    <div class="header">
      <i class="iconfont icon-mjiantou-copy" @click="back()"></i>
      <span>聊天详情</span>
    </div>
    <div class="user">
      <div class="img-wrapper">
        <img src="./assets/head.jpg" alt />
        <div class="user-name">树杰</div>
      </div>
    </div>
    <div class="block">
      查找聊天内容
      <i class="iconfont icon-iconfontyoujianto"></i>
    </div>
    <div class="block union">
      消息免打扰
      <van-switch v-model="miandaraoChecked" size="1.4rem" active-color="#07c160" />
    </div>
    <div class="block union">
      置顶聊天
      <van-switch v-model="zhidingChecked" size="1.4rem" active-color="#07c160" />
    </div>
    <div class="block union">
      强提醒
      <van-switch v-model="qiangtixingChecked" size="1.4rem" active-color="#07c160" />
    </div>
    <div class="block">
      设置当前聊天背景
      <i class="iconfont icon-iconfontyoujianto"></i>
    </div>
    <div class="block">清空聊天记录</div>
    <div class="block">
      投诉
      <i class="iconfont icon-iconfontyoujianto"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      miandaraoChecked: false,
      zhidingChecked: true,
      qiangtixingChecked: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-detail {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  position: absolute;
  .header {
    width: inherit;
    height: 3rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: #eeeeee;
    border-bottom: 1px solid #e0e0e0;
    i {
      position: absolute;
      left: 1rem;
      font-size: 1.2rem;
    }
  }
  .user {
    width: inherit;
    height: 6rem;
    background-color: #fff;
    .img-wrapper {
      width: 5.5rem;
      height: width;
      box-sizing: border-box;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
      }
    }
  }
  .block {
    width: inherit;
    height: 3rem;
    background-color: #fff;
    // text-align: left;
    box-sizing: border-box;
    padding-left: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
    border-bottom: 1px solid #eeeeee;
    i {
      font-size: 0.8rem;
      margin-right: 0.8rem;
    }
    .van-switch {
      margin-right: 0.8rem;
      box-shadow: 0 0 5px rgb(73, 70, 70);
    }
  }
}
.union {
  margin: 0 !important;
}
</style>