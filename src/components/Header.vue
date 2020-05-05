<template>
  <nav class="navbar sticky-top">
    <div class="luna-container">
      <!-- TODO navbar logo link -->
      <a href>
        <img src="../assets/nav_logo.png" alt />
      </a>
      <!-- Temp -->
      <div>
        <span @click="logout" class="padded-text">logout</span>
        <span class="padded-text">{{ username }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  data: function() {
    return {
      username: ""
    };
  },
  methods: {
    logout() {
      let user = firebase.auth().currentUser;
      if (user) {
        firebase.auth().signOut();
      } else {
        alert("You're not logged in now!");
      }
    }
  },
  created() {
    let user = firebase.auth().currentUser;
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
