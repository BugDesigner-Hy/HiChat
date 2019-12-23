<template>
  <div class="wrapper">
    <div class="login-form">
      <h1>HiChat(嗨聊)</h1>
      <div class="txtb">
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Username"
          :class="usernameInputFocus?'focus':''"
          @click="usernameInputFocus = true"
          @blur="usernameInputFocus = false"
        />
        <span data-placeholder="Username"></span>
      </div>
      <div class="txtb">
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
          :class="passwordInputFocus?'focus':''"
          @click="passwordInputFocus = true"
          @blur="passwordInputFocus = false"
        />
        <span data-placeholder="Password"></span>
      </div>
      <input type="submit" value="登录/注册" class="loginbtn" @click="login()" />
    </div>
  </div>
</template>

<script>
import { test, login } from "../api/test";
export default {
  data() {
    return {
      usernameInputFocus: false,
      passwordInputFocus: false,
      username: "",
      password: ""
    };
  },
  mounted() {
    // login(this.username, this.password).then(res => {
    //   console.log("res :", res);
    // });
  },
  methods: {
    login() {
      login(this.username, this.password).then(res => {
        console.log("res :", res);
        if (res.data.status === 200) {
          this.$notify({ type: "success", message: "登陆成功" });
          this.$router.push({ name: "Chat" });
        } else {
          this.$notify({ type: "danger", message: "登录失败" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #2979ff, #9c27b0);
  .login-form {
    width: 95%;
    height: 65%;
    box-sizing: border-box;
    background-color: #f1f1f1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    h1 {
      text-align: center;
      margin: 5rem 0;
    }
    .txtb {
      width: 80%;
      border-bottom: 1px solid #adadad;
      position: relative;
      margin: 1rem 0;
      input {
        font-style: 2rem;
        color: #333;
        border: none;
        width: 100%;
        outline: none;
        background: none;
        padding: 0 0.2rem;
        height: 2rem;
      }
      span::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0.1rem;
        left: 0;
        bottom: -0.1rem;
        background: linear-gradient(120deg, #2979ff, #9c27b0);
        transition: 0.5s;
      }
    }
    .loginbtn {
      display: block;
      width: 80%;
      height: 2.5rem;
      border: none;
      background: linear-gradient(120deg, #2979ff, #9c27b0, #2979ff);
      background-size: 200%;
      color: #fff;
      outline: none;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: 0.5s;
    }
    .loginbtn:hover {
      background-position: right;
    }
    .bottom-text {
      margin-top: 2rem;
      text-align: center;
      font-size: 1rem;
    }
  }
}

.focus + span::after {
  width: 100% !important;
}
</style>