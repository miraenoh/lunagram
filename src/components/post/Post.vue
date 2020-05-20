<template>
  <div class="card">
    <div class="card-body">
      <luna-user-link :user-name="post.userName" />
    </div>
    <img class="card-img" :src="post.imgSrc" alt="image" />
    <luna-comment :comment="post" class="card-body" />
  </div>
</template>

<script>
import UserLink from "../user/UserLink";
import Comment from "./Comment";

export default {
  components: {
    lunaUserLink: UserLink,
    lunaComment: Comment
  },
  props: {
    post: {
      type: Object,
      default: function() {
        return {
          id: "randomstring",
          userId: "randomstring",
          userName: "ananymous",
          imgSrc:
            "https://images.unsplash.com/photo-1563432057907-b6c11bf80702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
          caption: "my sample post",
          date: "APRIL 21"
        };
      }
    }
  }
};
</script>

<style scoped>
.card-img {
  border-radius: 0;
}
</style>
