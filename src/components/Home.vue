<template>
  <div>
    <luna-header></luna-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  components: {
    lunaHeader: Header
  }
};
</script>
