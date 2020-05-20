<template>
  <main class="luna-container">
    <div v-if="isModalShown" class="luna-modal">
      <luna-post-whole
        :pid="pid"
        :username="pUsername"
        class="luna-modal-content"
        v-click-outside="removePostModal"
      />
    </div>
    <div v-if="uid">
      <header>
        <h2 class="font-weight-light">
          {{ username }}
        </h2>
      </header>
      <div class="row">
        <div class="col-4" v-for="post in posts" :key="post.id">
          <div class="luna-square">
            <img :src="post.imgSrc" class="luna-square-img" @click="showPostModal(post)" />
          </div>
        </div>
      </div>
    </div>
    <luna-broken v-else-if="uid === false" />
  </main>
</template>

<script>
import Broken from "./Broken";
import PostWhole from "../post/PostWhole";

import { LUNA_CLOUD_FUNCTIONS_URL } from "../../properties";

import * as databaseService from "../../services/databaseService";
import * as postService from "../../services/postService";

import ClickOutside from "vue-click-outside";

export default {
  components: {
    lunaBroken: Broken,
    lunaPostWhole: PostWhole
  },
  data: function() {
    return {
      uid: null,
      username: null,
      posts: null,
      isModalShown: false,
      isClicked: false,
      pid: null, // For post modal
      pUsername: null
    };
  },
  props: ["id"],
  directives: {
    ClickOutside
  },
  methods: {
    updateUid() {
      // Check if a user by the username exists
      const username = this.id;
      const url = LUNA_CLOUD_FUNCTIONS_URL.concat("/getUserByUsername");
      this.$http
        .get(url, {
          params: {
            username: username
          }
        })
        .then((res) => {
          this.uid = res.data;
          this.username = this.id;
        })
        .catch((error) => {
          this.uid = false;
        });
    },
    showPostModal(post) {
      // Set data for the post modal
      this.pid = post.id;
      this.pUsername = post.userName;

      // Show post modal
      this.isModalShown = true;
      this.isClicked = true;
    },
    removePostModal() {
      if (this.isClicked) {
        this.isClicked = false;
      } else {
        // Clear the data and remove the modal
        this.pid = null;
        this.pusername = null;

        this.isModalShown = false;
      }
    }
  },
  created() {
    this.updateUid();
  },
  watch: {
    id: function() {
      this.updateUid();
    },
    uid: function() {
      if (this.uid) {
        postService.getPostListsByUid(this.uid).then((res) => {
          this.posts = res;
        });
      }
    }
  }
};
</script>

<style scoped>
header {
  margin-bottom: 30px;
}

img {
  cursor: pointer;
}

@media (min-width: 601px) {
  img {
    padding: 15px;
  }
}

.col-4 {
  padding: 0;
}
</style>
