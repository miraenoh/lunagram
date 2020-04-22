<template>
  <div class="card">
    <div class="card-body">
      <a href>{{ post.userName }}</a>
    </div>
    <img class="card-img" :src="post.imgSrc" alt="image" />
    <div class="card-body">
      <a href>{{ post.userName }}</a>
      {{ post.caption }}
      <br />
      <!-- TODO Implement n days ago -->
      <time class="luna-date-text">{{ dateString }}</time>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      //   TODO When there's no posts
      default: function() {
        return {
          userName: "ananymous",
          imgSrc:
            "https://images.unsplash.com/photo-1563432057907-b6c11bf80702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
          caption: "my sample post",
          date: "APRIL 21"
        };
      }
    }
  },
  computed: {
    dateString() {
      return new Date(this.post.date).toDateString();
    }
  }
};
</script>

<style scoped>
.luna-date-text {
  font-size: 11px;
  color: #8e8e8e;
}

.card-img {
  border-radius: 0;
}
</style>