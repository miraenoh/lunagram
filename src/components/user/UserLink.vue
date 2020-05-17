<template>
  <router-link :to="userName">
    <a>{{ userName }}</a>
  </router-link>
</template>

<script>
export default {
  props: ["userName"]
};
</script>
