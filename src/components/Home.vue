<template>
  <div>
    <luna-header></luna-header>
    <main class="luna-container">
      <luna-editor></luna-editor>
      <luna-post v-for="post in posts" :key="post.id" :post="post"></luna-post>
    </main>
  </div>
</template>

<script>
import Header from "./Header";
import Post from "./Post";
import Editor from "./Editor";

import * as postService from "../services/postService";

export default {
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
    postService.getAllPosts().then((res) => {
      this.posts = res;
    });
  }
};
</script>
