<script>
import ProjectCard from './ProjectCard.vue';
import { store } from '../../data/store';
import axios from 'axios';

export default {
  props: {
    type_id: {
      type: Number,
    },
  },
  data() {
    return {
      types: [],  // Corretta la dichiarazione del nome della proprietà
      projects: [],
      api: {
        baseUrl: 'http://127.0.0.1:8000/api/',
      },
      pagination: {
        next: null,
        prev: null,
        links: null,
      },
    };
  },
  components: {
    ProjectCard,
  },
  created() {
    this.fetchTypes();  // Richiama il metodo corretto
    this.fetchProjects();
  },
  methods: {
    fetchProjects(uri = this.endpoint) {
      axios.get(uri)
        .then((response) => {
          this.projects = response.data.data;
          this.pagination.links = response.data.links;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchTypes() {
      axios.get(store.api.baseUrl + 'type')
        .then((response) => {
          this.types = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  computed: {
    endpoint() {
      return this.type_id ?
        store.api.baseUrl + 'project-by-type/' + this.type_id :
        this.api.baseUrl + 'projects';
    },
  },
};
</script>
<template>
  <div>
    <router-link v-for="type in types" :key="type.id" :to="{
      name: 'blog-type',
      params: {
        type_id: type.id
      },
    }" class="badge mx-1" :style="{ backgroundColor: type.color }">
      {{ type.name }}
    </router-link>

    <div class="container">
      <h2>ProjectList</h2>
      <div class="row row-cols-3 g-4">
        <ProjectCard v-for="project in projects" :key="project.id" :isDetail="false" :project="project" />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-for="link in pagination.links" :key="link.label" @click="fetchProjects(link.url)" class="page-item">
          <a class="page-link" href="#" v-html="link.label"></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
