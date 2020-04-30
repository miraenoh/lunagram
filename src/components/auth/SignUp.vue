<template>
  <main class="luna-container">
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
          <button type="button" @click="signUp" class="btn btn-primary col-12">
            Sign up
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from "firebase";

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
        user
          .updateProfile({
            displayName: this.username
          })
          .then(() => {
            user = firebase.auth().currentUser;
            alert("Successfully signed up, " + user.displayName + "!");
            location.replace("/");
          })
          .catch((error) => {
            console.log("profile failed");
            console.log(error.message);
          });
      }
    }
  },
  created() {
    firebase.auth().signOut();
  }
};
</script>
