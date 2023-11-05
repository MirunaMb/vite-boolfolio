<script>
import ProjectCard from './ProjectCard.vue';

export default {
  data() {
    return {
      title: "ProjecList"
    };
  },

  props: {
    projects: Array,
  },

  components: {
    ProjectCard,
  },
};
</script>

<template>
  <div class="container">
    <h2>ProjectList</h2>
    <div class="row row-cols-3 g-4">
      <ProjectCard v-for="project in projects" :project="project" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>