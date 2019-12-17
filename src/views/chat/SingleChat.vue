<template>
  <div class="single-chat">
    <div class="header">
      <i class="iconfont icon-mjiantou-copy" @click="back()"></i>
      <span>树杰</span>
      <i class="iconfont icon-sangedian" @click="goChatDetail()"></i>
    </div>
    <div :class="['content',btnStatus.smileVisible?'btn-up':'',btnStatus.addVisible?'btn-up':'']">
      <div class="wrapper">
        <ul>
          <li
            :class="['dialogue',item.from==='me'?'self':'']"
            v-for="(item,index) in contents.items"
            :key="index"
          >
            <div class="head">
              <img :src="item.from==='him'?contents.himPic:contents.myPic" />
            </div>
            <div class="word" v-show="item.type==='text'">{{item.content}}</div>
            <div class="img-wrapper" v-show="item.type==='img'">
              <img :src="item.content" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['footer',btnStatus.smileVisible?'btn-up':'',btnStatus.addVisible?'btn-up':'']">
      <div class="btn-wrapper">
        <i
          class="iconfont icon-yuyin"
          v-show="btnStatus.inputVisible"
          @click="btnStatus.inputVisible = !btnStatus.inputVisible"
        ></i>
        <i
          class="iconfont icon-yuyin"
          v-show="!btnStatus.inputVisible"
          @click="btnStatus.inputVisible = !btnStatus.inputVisible"
        ></i>
        <input type="text" v-model="input" v-show="btnStatus.inputVisible" />
        <input type="button" v-show="!btnStatus.inputVisible" value="按住 说话" />
        <i class="iconfont icon-biaoqing" @click="showEmoji"></i>
        <i class="iconfont icon-add2" @click="showAddContent"></i>
      </div>
      <div class="content-wrapper">
        <Picker
          set="emojione"
          :showSearch="false"
          @select="addEmoji"
          v-show="btnStatus.smileVisible"
        />
        <div class="add-content" v-show="btnStatus.addVisible">
          <div class="card" v-for="(icon,index) in addIcons" :key="index">
            <div class="icon-wrapper">
              <i :class="['iconfont', icon.icon]"></i>
            </div>
            <div class="icon-name">{{icon.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
export default {
  components: {
    Picker
  },
  data() {
    return {
      roomId: this.$route.params.roomId,
      userId: "123",
      btnStatus: {
        inputVisible: true,
        smileVisible: false,
        addVisible: false
      },
      input: "",
      addIcons: [
        {
          name: "照片",
          icon: "icon-zhaopian"
        },
        {
          name: "拍摄",
          icon: "icon-paishe_A_Facet"
        },
        {
          name: "视频通话",
          icon: "icon-shipintonghua"
        },
        {
          name: "位置",
          icon: "icon-weizhi"
        },
        {
          name: "红包",
          icon: "icon-hongbao"
        },
        {
          name: "转账",
          icon: "icon-zhuanzhang"
        },
        {
          name: "语音输入",
          icon: "icon-combinedshapecopy"
        },
        {
          name: "收藏",
          icon: "icon-shoucang"
        }
      ],
      contents: {
        roomId: 1,
        type: "single-chat",
        to: "shujie",
        himPic: require("./assets/head.jpg"),
        myPic: require("./assets/head2.jpg"),
        items: [
          {
            id: 1,
            date: "2019-12-10 12:10:23",
            type: "text",
            content: "今晚吃啥今晚吃啥今晚吃啥今晚吃啥今晚吃啥今晚吃啥",
            from: "him"
          },
          {
            id: 2,
            date: "2019-12-10 12:11:30",
            type: "text",
            content: "吃素三鲜",
            from: "me"
          },
          {
            id: 3,
            date: "2019-12-10 12:13:48",
            type: "text",
            content: "晚上还去健身吗",
            from: "me"
          },
          {
            id: 4,
            date: "2019-12-10 12:14:23",
            type: "text",
            content: "去啊~",
            from: "him"
          },
          {
            id: 4,
            date: "2019-12-10 12:14:23",
            type: "img",
            content: require("./assets/head3.jpg"),
            from: "him"
          },
          {
            id: 5,
            date: "2019-12-10 12:13:48",
            type: "text",
            content: "你吉他弹的好垃圾哦",
            from: "me"
          },
          {
            id: 6,
            date: "2019-12-10 12:14:23",
            type: "text",
            content: "谢谢夸奖 嘻嘻(#^.^#)",
            from: "him"
          },
          {
            id: 7,
            date: "2019-12-10 12:14:23",
            type: "img",
            content: require("./assets/head3.jpg"),
            from: "me"
          },
          {
            id: 8,
            date: "2019-12-10 12:14:23",
            type: "text",
            content: "谢谢夸奖 嘻嘻(#^.^#)",
            from: "him"
          }
        ]
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addEmoji(emoji) {
      console.log("emoji :", emoji);
      //   let emoji = `<emoji :emoji="{ id: 'santa', skin: 3 }" :size="16" />`;
      //   this.input += emoji;
      //   console.log("input :", this.input);
    },
    showEmoji() {
      this.btnStatus.smileVisible = !this.btnStatus.smileVisible;
      this.btnStatus.addVisible = false;
    },
    showAddContent() {
      this.btnStatus.addVisible = !this.btnStatus.addVisible;
      this.btnStatus.smileVisible = false;
    },
    goChatDetail() {
      //   this.$router.push({path:"chat-detail/" + this.userId});
      this.$router.push({ name: "SingleChatDetail", params: { userId: 123 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.single-chat {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #eeeeee;
  .header {
    width: 100%;
    height: 3rem;
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    z-index: 99;
    background-color: #eeeeee;
    border-bottom: 1px solid #e0e0e0;
    i {
      font-size: 1.2rem;
      margin: 0 1rem;
    }
  }
  .content {
    width: 100%;
    background-color: #eeeeee;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 1s;
    .wrapper {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 3rem;
      padding-bottom: 3rem;
      ul {
        margin: 0;
        padding: 0;
      }
    }

    .dialogue {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .head {
        width: 20%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        padding: 0.8rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3rem;
        }
      }
      .word {
        max-width: 60%;
        box-sizing: border-box;
        margin-top: 1rem;
        padding: 0.5rem 0.8rem;
        word-wrap: wrap;
        text-align: left;
        background-color: #fff;
        border-radius: 0.5rem;
        border: 1px solid #eeeeee;
      }
      .img-wrapper {
        max-width: 60%;
        height: width;
        box-sizing: border-box;
        margin-top: 0.5rem;
        padding: 1rem;
        padding-left: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3rem;
        }
      }
    }
  }
  .footer {
    width: 100%;
    z-index: 99;
    // bottom: 5rem;
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: absolute;
    .btn-wrapper {
      width: 100%;
      height: 3rem;
      position: fixed;
      z-index: 99;
      bottom: 0;
      background-color: #eeeeee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border-top: 1px solid #e0e0e0;
      transition: 0.5s;
      i {
        font-size: 1.5rem;
        margin: 0 0.5rem;
      }
      .icon-add2 {
        font-size: 1.7rem;
        margin-left: 0;
      }
      input {
        width: 75%;
        height: 2rem;
        outline-style: none;
        border: 0px;
        border-radius: 0.2rem;
      }
    }
    .content-wrapper {
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 0;
      transition: 0.5s;
      .emoji-mart {
        width: 100% !important;
        border-radius: 0;
        transition: 0.5s;
      }
      .add-content {
        width: 100%;
        height: 0;
        background-color: #eeeeee;
        transition: 0.5s;
        border-top: 1px solid #e0e0e0;
        display: grid;
        grid: 1fr 1fr /1fr 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
        .card {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .icon-wrapper {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 1rem;
            padding: 1rem;
            background-color: #fff;
            i {
              font-size: 1.5rem;
              color: #616161;
            }
          }
          .icon-name {
            padding-top: 0.3rem;
            text-align: center;
            font-size: 0.6rem;
            color: #616161;
          }
        }
      }
    }
  }
}
.self {
  flex-direction: row-reverse;
  align-items: flex-start;
  .word {
    text-align: right !important;
  }
}
.btn-up {
  .btn-wrapper {
    bottom: 15rem !important;
  }
  .content-wrapper {
    height: 15rem !important;
  }
  .add-content {
    height: 15rem !important;
  }
  .wrapper {
    padding-bottom: 18rem !important;
  }
}
</style>