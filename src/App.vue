<script>
import ProjectList from "./components/projects/ProjectList.vue";
import NavbarUi from "./components/ui/NavbarUi.vue";
import axios from 'axios';
export default {
  data() {
    return {
      title: "App",
      projects: [],
      pagination: {
        next: null,
        prev: null,
        links: null,
      },

      api: {
        baseUrl: 'http://127.0.0.1:8000/api/',
      },
    };
  },

  components: {
    ProjectList, NavbarUi
  },

  methods: {
    fetchProjects(uri = this.api.baseUrl + 'projects') {
      axios.get(uri)
        .then((response) => {
          this.projects = response.data.data;
          // this.pagination.prev = response.data.prev_page_url;
          // this.pagination.next = response.data.next_page_url;
          this.pagination.links = response.data.links;
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
  <NavbarUi />
  <router-view></router-view>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-for="link in pagination.links" :key="link.label" @click="fetchProjects(link.url)" class="page-item">
        <a class="page-link" href="#" v-html="link.label"></a>
        <!-- v-htlm interpreta html in vue -->

      </li>
    </ul>
  </nav>


  <h1>{{ title }}</h1>
  <ProjectList :projects="projects" />
  <!-- <div @click="fetchProjects(pagination.prev)">Prev Page</div>
  <div v-for="link in pagination.links" :key="link.label">
    <div @click="fetchProjects(link.url)">
      {{ link.label }}
    </div>
  </div>
  <div @click="fetchProjects(pagination.next)">Next Page</div> -->
</template>


<style lang="scss" scoped></style>