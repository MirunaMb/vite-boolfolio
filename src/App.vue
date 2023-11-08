<script>
import NavbarUi from "./components/ui/NavbarUi.vue";

export default {
  data() {
    return {
    };
  },

  components: {
    NavbarUi
  },
};
</script>

<template>
  <NavbarUi />
  <router-view></router-view>
</template>


<style lang="scss" scoped></style>