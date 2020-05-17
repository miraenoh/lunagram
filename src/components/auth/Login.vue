<template>
  <main class="luna-container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            Login
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
                  type="password"
                  @keyup.enter="login"
                  v-model="password"
                  placeholder="Password"
                  class="form-control"
                />
              </div>
              <button
                type="button"
                @click="login"
                class="btn btn-primary col-12"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            Don't have an account?
            <router-link to="/auth/signup">Sign up</router-link>
          </div>
        </div>
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
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((credentials) => {
          alert("Hello, " + credentials.user.displayName + "!");
          location.replace("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  },
  mounted() {
    firebase.auth().signOut();
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
