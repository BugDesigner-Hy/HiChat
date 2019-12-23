<template>
  <div class="chat">
    <div class="header">
      <i class="iconfont icon-add" @click="menuVisible = !menuVisible"></i>
      <!-- <div class="title">嗨聊({{totalUnread}})</div> -->
      <div class="title">嗨聊</div>
      <div class="search">
        <input type="text" placeholder="搜索" />
        <i class="iconfont icon-suosou"></i>
      </div>
      <div class="menu" v-show="menuVisible">
        <ul>
          <li>
            <i class="iconfont icon-qunliao"></i>
            <div class="btn">发起群聊</div>
          </li>
          <li>
            <i class="iconfont icon-add1"></i>
            <div class="btn">添加朋友</div>
          </li>
          <li>
            <i class="iconfont icon-saoyisao"></i>
            <div class="btn">扫一扫</div>
          </li>
          <li>
            <i class="iconfont icon-shoufukuan"></i>
            <div class="btn">收付款</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="section">
          <van-swipe-cell v-for="(room,index) in rooms" :key="index" style="width:100%;">
            <li class="room" @click="()=>enterRoom(room)">
              <div class="room-head">
                <div class="room-dot" v-show="room.unread>0 && room.disturb"></div>
                <div class="room-info" v-show="room.unread>0 && !room.disturb">{{room.unread}}</div>
                <img :src="room.head" />
              </div>
              <div class="room-content">
                <div class="room-name">{{room.title}}</div>
                <div class="room-date">{{room.modifyDate}}</div>
                <div class="room-quiet" v-show="room.disturb">
                  <i class="iconfont icon-miandarao"></i>
                </div>
                <div class="room-word">
                  <span>[{{room.unread}}条]</span>

                  {{room.lastword}}
                </div>
              </div>
            </li>
            <template slot="right">
              <van-button square type="danger" text="删 除" />
              <van-button square color="#9e9e9e" text="免打扰" />
            </template>
          </van-swipe-cell>
        </ul>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getCurUser } from "../../api/test";
import { getSingleChat, getRooms } from "../../api/room";
export default {
  data() {
    return {
      totalUnread: "",
      isLoading: false,
      menuVisible: false,
      curUser: "",
      rooms: [
        // {
        //   id: "1",
        //   type: "all",
        //   head: require("./assets/head.jpg"),
        //   name: "上分小伙伴",
        //   lastUser: "小明",
        //   lastWord: "连胜了",
        //   status: "unread",
        //   isDisturb: true,
        //   unread: 10,
        //   modifyDate: "下午2:24"
        // },
      ]
    };
  },
  mounted() {
    // this.messages=this.$store.state.messages;
    getCurUser().then(res => {
      console.log("curUser :", res);
      this.curUser = res.data;
      getRooms(this.curUser.id).then(res => {
        console.log("rooms :", res);
        this.rooms = res.data;
        this.rooms.forEach(room => {
          room.head = require("./assets/head2.jpg");
          let obj = this.getLastWord(room.title);
          room.unread = obj.unread;
          room.lastword = obj.lastword;
          // room.status = "unread";
        });
      });
    });
    // this.countUnread();
    // console.log("messages :", this.messages);
  },
  // computed: {
  //   messages() {
  //     console.log("messages :", this.$store.state.messages);
  //     return this.$store.state.messages;
  //   }
  // },
  methods: {
    countUnread() {
      this.totalUnread = this.rooms.reduce((a, b) => {
        let tmp = {
          unread: a.unread + b.unread
        };
        return tmp;
      }).unread;
      console.log("totalUnread :", this.totalUnread);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    enterRoom(room) {
      this.$router.push("single-chat/" + room.id);
    },
    getLastWord(title) {
      let messages = this.$store.state.messages;
      console.log('chat--msg :', messages);
      let words = [];
      messages.forEach(msg => {
        if (msg.from === title) {
          console.log('push :', msg);
          words.push(msg.content);
        }
      });
      console.log("words :", words);
      let obj = {
        lastword: words[words.length - 1],
        unread: words.length
      };
      return obj;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  .header {
    width: 100%;
    height: 6.5rem;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    .icon-add {
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
    .menu {
      position: absolute;
      background-color: rgba(51, 51, 51, 0.8);
      top: 3rem;
      right: 0.5rem;
      width: 8rem;
      z-index: 99;
      border-radius: 0.4rem;
      ul {
        list-style: none;
        width: inherit;
        li {
          width: inherit;
          height: 2.5rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          padding: 1rem;
          padding-left: 0.8rem;
          color: #fff;
          font-size: 0.9rem;
          transition: 0.3s;
          cursor: pointer;

          &:hover {
            background-color: rgba(51, 51, 51, 0.9);
          }
          & > .iconfont {
            width: 30%;
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .btn {
            width: 70%;
            height: inherit;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #9e9e9e;
          }
        }
      }
    }
  }
  .section {
    width: 100%;
    height: 90%;
    margin: 0;
    padding: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    overflow: scroll;

    .room {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      // border-bottom: 1px solid #9e9e9e;
      // &::after {
      //   content: "";
      //   width: 80%;
      //   height: 1px;
      //   position: absolute;
      //   bottom: 0px;
      //   right: 0;
      //   background-color: #9e9e9e;
      // }
      .room-head {
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
      .room-content {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        // border-bottom: 1px solid #eeeeee;
        position: relative;
        .room-name {
          width: 100%;
          height: 50%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          box-sizing: border-box;
          padding-top: 0.7rem;
        }
        .room-word {
          width: 100%;
          height: 50%;
          color: #9e9e9e;
          font-size: 0.8rem;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          box-sizing: border-box;
          padding-top: 0.5rem;
          padding-bottom: 1.4rem;
        }
        .room-date {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          color: #9e9e9e;
          font-size: 0.5rem;
        }
        .room-quiet {
          position: absolute;
          bottom: 0.7rem;
          right: 0.7rem;
          i {
            color: #9e9e9e;
            font-size: 1rem;
          }
        }
      }
    }

    .room + div > .van-button {
      height: inherit;
      width: 4.5rem;
      // width: 2rem;
    }
  }

  .section::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
  .section::-webkit-scrollbar-thumb {
    background-color: rgba(158, 158, 158, 0);
  }
}
</style>