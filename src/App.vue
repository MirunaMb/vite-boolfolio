<script>
import ProjectList from "./components/projects/ProjectList.vue";

import axios from 'axios';
export default {
  data() {
    return {
      title: "App",
      projects: [],

      api: {
        baseUrl: 'http://127.0.0.1:8000/api/',
      }
    }
  },

  components: {
    ProjectList,
  },

  methods: {
    fetchProjects(uri = this.api.baseUrl + 'projects') {
      axios.get(uri)
        .then((response) => {
          this.projects = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },


  created() {
    this.fetchProjects();
  }

};
</script>

<template>
  <h1>{{ title }}</h1>
  <ProjectList :projects="projects" />
  <ProjectCard />
</template>

<style lang="scss" scoped></style>