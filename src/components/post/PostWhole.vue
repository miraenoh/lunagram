<template>
  <main class="luna-container">
    <div v-if="isLoaded" class="card">
      <div class="row no-gutters">
        <div class="col-md-7">
          <img :src="post.imgSrc" class="card-img" ref="image" alt="..." />
        </div>
        <div class="col-md-5">
          <ul class="list-group list-group-flush d-flex flex-column" :style="lunaPostContentStyles">
            <li class="list-group-item">
              <luna-user-link :user-name="post.userName" />
            </li>
            <li class="list-group-item flex-grow-1 overflow-auto">
              <!-- This part automatically becomes scrollable for future comment updates -->
              <luna-comment :comment="post" class="luna-comment" />
            </li>
            <li class="list-group-item ">
              Add a comment...
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </main>
</template>

<script>
import UserLink from "../user/UserLink";
import Comment from "./Comment";

import * as databaseService from "../../services/databaseService";

export default {
  components: {
    lunaUserLink: UserLink,
    lunaComment: Comment
  },
  data: function() {
    return {
      isLoaded: false,
      imageHeight: 0,
      post: {
        id: "randomstring",
        userId: "randomstring",
        userName: "ananymous",
        imgSrc:
          "https://images.unsplash.com/photo-1563432057907-b6c11bf80702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        caption: "my sample post",
        date: "APRIL 21"
      }
    };
  },
  props: ["pid", "username"],
  created() {
    databaseService.readObject("post", this.pid).then((post) => {
      this.post = post;
      this.post.userName = this.username;
      this.isLoaded = true;
    });
  },
  updated: function() {
    this.imageHeight = this.$refs.image.clientHeight;
  },
  computed: {
    lunaPostContentStyles() {
      // Automatically adjust the height of the content section
      return {
        height: `${this.imageHeight - 1}px`
      };
    }
  }
};
</script>

<style scoped>
main {
  padding: 0;
}

.card {
  border: none;
}

.card-img {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.flex-column {
  height: 100%;
}

.list-group-item:first-child {
  border-top-right-radius: 0.25rem;
}

.list-group-item:last-child {
  border-bottom-right-radius: 0.25rem;
}

.list-group-item {
  padding: 1rem;
}

.luna-comment {
  margin-bottom: 1rem;
}
</style>
