<template>
  <nav class="navbar sticky-top">
    <div class="luna-container">
      <!-- TODO navbar logo link -->
      <a href>
        <img src="../assets/nav_logo.png" alt />
      </a>
      <!-- Temp -->
      <div>
        <span @click="checkState" class="padded-text">state</span>
        <span @click="logout" class="padded-text">logout</span>
        <router-link to="login" class="padded-text">login</router-link>
        <router-link to="signup" class="padded-text">sign up</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  data: function() {
    return {
      isUser: false,
      user: ""
    };
  },
  methods: {
    checkState() {
      let user = firebase.auth().currentUser;
      if (user) {
        alert("You're currently logged in as " + user.displayName + ".");
      } else {
        alert("You're currently NOT logged in.");
      }
    },
    logout() {
      let user = firebase.auth().currentUser;
      if (user) {
        firebase.auth().signOut();
        alert("You're successfully logged out. Bye, " + user.displayName + "!");
      } else {
        alert("You're not logged in now!");
      }
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
