<template>
  <div>
    <luna-user-link :user-name="comment.userName" />
    {{ comment.caption }}
    <br />
    <!-- TODO Implement n days ago -->
    <time class="luna-date-text">{{ dateString }}</time>
  </div>
</template>

<script>
import UserLink from "../user/UserLink";

export default {
  props: ["comment"],
  components: {
      lunaUserLink: UserLink
  },
  computed: {
    dateString() {
      return new Date(this.comment.date).toDateString();
    }
  }
};
</script>

<style scoped>
.luna-date-text {
  font-size: 11px;
  color: #8e8e8e;
}
</style>
