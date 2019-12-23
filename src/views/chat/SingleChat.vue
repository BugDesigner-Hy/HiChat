<template>
  <div class="single-chat">
    <div class="header">
      <i class="iconfont icon-mjiantou-copy" @click="back()"></i>
      <span>{{singleChat.to.username}}</span>
      <i class="iconfont icon-sangedian" @click="goChatDetail()"></i>
    </div>
    <div :class="['content',btnStatus.smileVisible?'btn-up':'',btnStatus.addVisible?'btn-up':'']">
      <div class="wrapper">
        <ul>
          <li
            :class="['dialogue',item.from===curUser.username?'self':'']"
            v-for="(item,index) in singleChat.messages"
            :key="index"
          >
            <div class="head">
              <img :src="item.from===curUser.username?singleChat.from.head:singleChat.to.head" />
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
        <input type="text" v-model="input" @keyup.enter="sendMsg" v-show="btnStatus.inputVisible" />
        <input type="button" v-show="!btnStatus.inputVisible" value="按住 说话" @click="talk" />
        <i class="iconfont icon-biaoqing" @click="showEmoji"></i>
        <i class="iconfont icon-add2" @click="showAddContent"></i>
      </div>
      <div class="content-wrapper">
        <!-- <Picker
          set="emojione"
          :showSearch="false"
          @select="addEmoji"
          v-show="btnStatus.smileVisible"
        />-->
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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCurUser } from "../../api/test";
import { getSingleChat, getRooms } from "../../api/room";
// import { Picker } from "emoji-mart-vue";
export default {
  components: {
    // Picker
  },
  data() {
    return {
      stompClient: "",
      roomId: this.$route.params.roomId,
      curUser: "",
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
      singleChat: {}
    };
  },
  mounted() {
    getCurUser().then(res => {
      this.curUser = res.data;
    });
    getSingleChat(this.roomId).then(res => {
      // console.log("SingleChat :", res.data);
      this.singleChat = res.data;
      this.singleChat.messages = this.getselfMsg(this.singleChat.to.username);
      this.singleChat.from.head = require("./assets/head2.jpg");
      this.singleChat.to.head = require("./assets/head.jpg");
      this.socketConnect();
    });
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
    },
    sendMsg() {
      let message = {
        id: 1,
        date: new Date(),
        type: "text",
        content: this.input,
        from: this.curUser.username,
        to: this.singleChat.to.username
      };
      this.singleChat.messages.push(message);
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
      this.input = "";
    },
    talk() {
      // let message = {
      //   id: 1,
      //   date: new Date(),
      //   type: "voice",
      //   content: this.input,
      //   from: this.curUser.username,
      //   to: this.singleChat.to.username
      // };
      // this.singleChat.messages.push(message);
      // this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    },
    socketConnect() {
      let socket = new SockJS("http://localhost:8083/api/single-chat");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        // console.log("Connected: " + frame);
        this.stompClient.subscribe(
          "/user/queue/chat/" + this.singleChat.to.username,
          res => {
            let message = JSON.parse(res.body);
            console.log("message :", message);
            // if (message.from != this.singleChat.to.username) return;
            this.singleChat.messages.push(message);
            this.$store.dispatch("addMessages", message);
          }
        );
      });
    },
    getselfMsg(title) {
      let messages = this.$store.state.messages;
      console.log('single-chat--msg :', messages);
      let words = [];
      messages.forEach(msg => {
        if (msg.from === title) {
          words.push(msg);
        }
      });
      return words;
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