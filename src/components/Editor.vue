<template>
  <div class="card">
    <div class="card-header bg-white">
      <div class="row luna-header justify-content-between align-items-center">
        <span class="luna-editor-title">New Post</span>
        <button class="btn">Share</button>
      </div>
    </div>
    <div class="row card-body form-group">
      <div class="col-sm-4">
        <!-- Preview -->
        <img v-if="tempImgUrl" :src="tempImgUrl" class="card-img" />
        <!-- Uploader -->
        <div v-else class="card-img bg-light luna-image-uploader" @click="$refs.file.click()">
          <!-- TODO Cancel image button -->
          <input type="file" accept="image/png, image/jpeg" ref="file" class="form-control-file" id @change="onFileChange" />
          <luna-icon-plus class="luna-icon-plus" />
        </div>
      </div>
      <div class="col-sm-8">
        <div class="luna-caption-container">
          <textarea type="text" class="form-control" v-model="caption" placeholder="Wite a caption..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconPlus from "./icons/IconPlus";

export default {
  data: function() {
    return {
      tempImgUrl: null,
      caption: ""
    };
  },
  components: {
    lunaIconPlus: IconPlus
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.tempImgUrl = URL.createObjectURL(file);
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