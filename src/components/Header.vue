<template>
  <nav class="navbar sticky-top">
    <div class="luna-container">
      <!-- TODO navbar logo link -->
      <router-link to="/">
        <a>
          <img src="../assets/nav_logo.png" />
        </a>
      </router-link>
      <div>
        <span @click="logout" class="padded-text">logout</span>
        <user-link :user-name="username" class="padded-text" />
        <!--         <router-link :to="username">
          <span class="padded-text">{{ username }}</span>
        </router-link> -->
      </div>
    </div>
  </nav>
</template>

<script>
import * as authService from "../services/authService";

import UserLink from "./user/UserLink";

export default {
  components: {
    userLink: UserLink
  },
  data: function() {
    return {
      username: ""
    };
  },
  methods: {
    logout() {
      let user = authService.getCurrentUser();
      if (user) {
        authService.logOut();
      } else {
        alert("You're not logged in now!");
      }
    }
  },
  created() {
    let user = authService.getCurrentUser();
    if (user) {
      this.username = user.displayName;
    } else {
      this.$router.push("/auth/login");
    }
  }
};
</script>

<style scoped>
nav {
  background-color: white;
  height: 54px;
  border: solid var(--luna-lightgray);
  border-width: 0px 0px 1px 0px;
  z-index: 1;
}

/* Temporary */
.luna-container {
  display: flex;
  justify-content: space-between;
}
.padded-text {
  padding-left: 20px;
}
span {
  font-weight: 600;
  cursor: pointer;
}
</style>
