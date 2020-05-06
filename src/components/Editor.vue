<template>
  <div class="card">
    <div class="card-header bg-white">
      <div class="row luna-header justify-content-between align-items-center">
        <span class="luna-editor-title">New Post</span>
        <div>
          <!-- TODO change bootstrap primary color -->
          <div
            class="spinner-border spinner-border-sm text-primary"
            role="status"
            v-if="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <button class="btn" @click="uploadPost">Share</button>
        </div>
      </div>
    </div>
    <div class="row card-body form-group">
      <div class="col-sm-4">
        <!-- Preview -->
        <img v-if="tempimgSrc" :src="tempimgSrc" class="card-img" />
        <!-- Uploader -->
        <div
          v-else
          class="card-img bg-light luna-image-uploader"
          @click="$refs.file.click()"
        >
          <!-- TODO Cancel image button -->
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref="file"
            class="form-control-file"
            id
            @change="onFileChange"
          />
          <luna-icon-plus class="luna-icon-plus" />
        </div>
      </div>
      <div class="col-sm-8">
        <div class="luna-caption-container">
          <textarea
            type="text"
            class="form-control"
            v-model="post.caption"
            placeholder="Wite a caption..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

import * as postService from "../services/postService";

import IconPlus from "./icons/IconPlus";

export default {
  data: function() {
    return {
      post: {
        userId: null,
        caption: "",
        imgSrc: [],
        date: null
      },
      selectedFile: null,
      tempimgSrc: "",
      loading: false
    };
  },
  components: {
    lunaIconPlus: IconPlus
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.selectedFile = file;
      this.tempimgSrc = URL.createObjectURL(file);
    },
    async uploadPost() {
      if (this.selectedFile === null) {
        return alert("Please select an image.");
      }

      this.loading = true;

      // Upload the selected image to Firebase storage
      this.post.date = new Date().getTime();
      this.post.imgSrc.push(
        await postService.uploadFile("posts", this.selectedFile, this.post.date)
      );

      // Post with the imgSrc we just received
      this.post.userId = firebase.auth().currentUser.uid;
      let key = await postService.postObject("post", this.post);

      this.loading = false;
      location.reload(true);
    }
  }
};
</script>

<style scoped>
.luna-header {
  padding-left: 20px;
  padding-right: 7px;
}

.luna-editor-title {
  font-weight: 600;
}

.form-group {
  margin-bottom: 0;
}

.luna-image-uploader {
  height: 150px;
  border-color: var(--luna-lightgray);
  border-width: 2px;
  border-style: dashed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-control-file {
  display: none;
}

.luna-icon-plus {
  width: 60%;
  height: 60%;
  color: var(--luna-lightgray);
  margin: auto;
}

.luna-caption-container {
  height: 100%;
}

.form-control {
  font-size: inherit;
  border-color: var(--luna-lightgray);
}

.form-control:focus {
  border-color: var(--luna-lightgray);
  background-color: var(--light);
  box-shadow: none;
}

textarea.form-control {
  resize: none;
  height: 100%;
}

::placeholder {
  color: var(--luna-lightgray);
}

.btn {
  /* position: absolute;
    right: 20px;
    bottom: 20px; */
  font-size: inherit;
  color: var(--luna-primary);
  font-weight: 600;
  box-shadow: none;
}
</style>
