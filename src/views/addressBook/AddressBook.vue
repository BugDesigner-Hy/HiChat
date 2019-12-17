<template>
  <div class="address-book">
    <div class="header">
      <i class="iconfont icon-icon_tianjiahaoyou"></i>
      <div class="title">通讯录</div>
      <div class="search">
        <input type="text" placeholder="搜索" />
        <i class="iconfont icon-suosou"></i>
      </div>
    </div>
    <div class="section">
      <div class="block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xindepengyou" />
        </svg>
        <div class="name">新的朋友</div>
      </div>
      <div class="block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qunliao1" />
        </svg>
        <div class="name">群聊</div>
      </div>
      <div class="block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqian" />
        </svg>
        <div class="name">标签</div>
      </div>
      <div class="block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gongzhonghaotubiao" />
        </svg>
        <div class="name">公众号</div>
      </div>
      <van-index-bar :index-list="addressBook.indexList">
        <div class="cell-wrapper" v-for="(user,index) in addressBook.items" :key="index">
          <van-index-anchor :index="user.index" />
          <van-cell value v-for="(cell,index) in user.contents" :key="index">
            <template slot="title">
              <img :src="cell.header" alt />
              <span class="custom-title">{{cell.name}}</span>
            </template>
          </van-cell>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressBook: {
        indexList: [
          "☆",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "Z",
          "#"
        ],
        items: [
          {
            index: "☆",
            contents: [
              {
                header: require("../chat/assets/head.jpg"),
                name: "树杰"
              },
              {
                header: require("../chat/assets/head3.jpg"),
                name: "廉妈"
              }
            ]
          },
          {
            index: "B",
            contents: [
              {
                header: require("../chat/assets/head2.jpg"),
                name: "B树杰"
              },
              {
                header: require("../chat/assets/head.jpg"),
                name: "B廉妈"
              }
            ]
          },
          {
            index: "C",
            contents: [
              {
                header: require("../chat/assets/head2.jpg"),
                name: "C树杰"
              },
              {
                header: require("../chat/assets/head3.jpg"),
                name: "C廉妈"
              }
            ]
          },
          {
            index: "Z",
            contents: [
              {
                header: require("../chat/assets/head.jpg"),
                name: "Z树杰"
              },
              {
                header: require("../chat/assets/head3.jpg"),
                name: "Z廉妈"
              }
            ]
          },
          {
            index: "#",
            contents: [
              {
                header: require("../chat/assets/head2.jpg"),
                name: "#树杰"
              },
              {
                header: require("../chat/assets/head.jpg"),
                name: "#廉妈"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.address-book {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #eeeeee;
  .header {
    width: 100%;
    height: 6.5rem;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    .icon-icon_tianjiahaoyou {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      font-size: 1.5rem;
    }
    .title {
      width: 100%;
      height: 2rem;
      margin-top: 1.2rem;
      font-size: 1.2rem;
      font-weight: 500;
      text-align: center;
    }
    .search {
      position: absolute;
      bottom: 0.8rem;
      width: 100%;
      display: flex;
      justify-content: center;
      input {
        width: 95%;
        height: 1.7rem;
        box-sizing: border-box;
        padding: 0 1rem;
        border-radius: 0.1rem;
        border: 1px solid #9e9e9e;
        outline: none;
        font-size: 0.9rem;
      }
      i {
        position: absolute;
        font-size: 0.9rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #9e9e9e;
        opacity: 0.8;
      }
    }
  }
  .section {
    width: inherit;
    // height: 100%;
    // background-color: rgb(214, 151, 151);
    padding-bottom: 4rem;
    .block {
      width: inherit;
      height: 3.5rem;
      background-color: #fff;
      // text-align: left;
      box-sizing: border-box;
      padding-left: 0.8rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0;
      // border-bottom: 1px solid #eeeeee;
      .icon {
        width: 2.5rem;
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
    }
    .van-index-bar {
      width: inherit;
      height: 100%;
      /deep/.van-index-bar__sidebar {
        height: 60%;
        margin-top: 5rem;
        .van-index-bar__index {
          padding: 0.5rem 0;
          padding-right: 0.2rem;
        }
      }
      /deep/.van-index-anchor {
        display: flex;
        align-items: center;
        font-size: 0.8rem !important;
        line-height: 1.5rem !important;
        color: #4d4747;
        background-color: #eeeeee;
      }
      .van-cell {
        height: 3.5rem;
        padding-left: 0.8rem;
        .van-cell__title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 2.2rem;
            height: width;
            margin-right: 0.8rem;
            border-radius: 0.3rem;
          }
        }
      }
    }
  }
}
</style>