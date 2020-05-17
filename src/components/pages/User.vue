<template>
  <main class="luna-container">
    <div v-if="uid">
      <header>
        <h2 class="font-weight-light">
          {{ username }}
        </h2>
      </header>
      <div class="row">
        <div class="col-4" v-for="post in posts" :key="post.id">
          <div class="luna-square">
            <img
              :src="post.imgSrc"
              class="luna-square w-100"
              @click="showPost(post)"
            />
          </div>
        </div>
      </div>
    </div>
    <luna-broken v-else-if="uid === false" />
  </main>
</template>

<script>
import Broken from "./Broken";

import { LUNA_CLOUD_FUNCTIONS_URL } from "../../properties";

import * as databaseService from "../../services/databaseService";
import * as postService from "../../services/postService";

export default {
  components: {
    lunaBroken: Broken
  },
  data: function() {
    return {
      uid: null,
      username: null,
      posts: null
    };
  },
  props: ["id"],
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
    showPost(post) {
      alert(post.caption);
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

.luna-square:before {
  content: "";
  display: block;
  padding-top: 100%;
}

img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  cursor: pointer;
  object-fit: cover;
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
