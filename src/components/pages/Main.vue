<template>
  <main class="luna-container">
    <luna-editor></luna-editor>
    <luna-post v-for="post in posts" :key="post.id" :post="post"></luna-post>
  </main>
</template>

<script>
import Post from "../post/Post";
import Editor from "../post/Editor";

import * as postService from "../../services/postService";

export default {
  components: {
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
