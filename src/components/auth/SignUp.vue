<template>
  <main class="luna-container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            Sign up
          </div>
          <div class="card-body">
            <form action="">
              <div class="form-group">
                <input
                  type="email"
                  v-model="email"
                  placeholder="Email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="username"
                  placeholder="Username"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  @keyup.enter="signUp"
                  v-model="password"
                  placeholder="Password"
                  class="form-control"
                />
              </div>
              <button
                type="button"
                @click="signUp"
                class="btn btn-primary col-12"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            Have an account? <router-link to="/auth/login">Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from "firebase";

import * as databaseService from "../../services/databaseService";

export default {
  data: function() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    async signUp() {
      if (
        !this.email.length ||
        !this.username.length ||
        !this.password.length
      ) {
        alert("Please fill in all the fields.");
        return;
      }

      let credential = null;
      credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
        });

      if (credential) {
        // Add the username
        let user = credential.user;
        let username = this.username;

        try {
          await user.updateProfile({ displayName: this.username });
        } catch (error) {
          console.log("profile failed");
          console.log(error.message);
          return;
        }

        // Push the uid and username into db
        const userObject = {
          name: username
        };
        await databaseService.postObjectWithKey("user", user.uid, userObject);

        // Finish the signup
        user = firebase.auth().currentUser;
        alert("Successfully signed up, " + user.displayName + "!");
        location.replace("/");
      }
    }
  },
  created() {
    firebase.auth().signOut();
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
