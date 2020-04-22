<template>
  <div id="app">
    <luna-header></luna-header>
    <main class="luna-container">
      <luna-editor></luna-editor>
      <luna-post v-for="post in posts" :key="post" :post="post"></luna-post>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";
import Post from "./components/Post";
import Editor from "./components/Editor";

import "./styles/luna-container";
import "./styles/universal";

export default {
  name: "App",
  components: {
    lunaHeader: Header,
    lunaPost: Post,
    lunaEditor: Editor
  },
  data: function() {
    return {
      posts: null
    };
  },
  mounted() {
    this.$http
      .get("https://lunagram-server.firebaseio.com/post.json")
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.unshift(data[key]);
        }
        console.log(resultArray);
        this.posts = resultArray;
      });
  }
};
</script>

<style scoped>
main {
  padding-top: 30px;
}
</style>
