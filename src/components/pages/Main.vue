<template>
  <main class="luna-container">
    <div class="row">
      <div class="col-lg-8 col-12">
        <luna-editor></luna-editor>
        <luna-post
          v-for="post in posts"
          :key="post.id"
          :post="post"
        ></luna-post>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header bg-white">
            user info
          </div>
          <div class="card-body">
            <span v-if="user">
              you're logged in as {{ user.displayName }}.
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Post from "../post/Post";
import Editor from "../post/Editor";

import * as authService from "../../services/authService";
import * as postService from "../../services/postService";

export default {
  components: {
    lunaPost: Post,
    lunaEditor: Editor
  },
  data: function() {
    return {
      user: null,
      posts: null
    };
  },
  created() {
    this.user = authService.getCurrentUser();
  },
  mounted() {
    postService.getAllPosts().then((res) => {
      this.posts = res;
    });
  }
};
</script>

<style scoped>
@media (max-width: 991px) {
  .col-4 {
    display: none;
  }
}
</style>
