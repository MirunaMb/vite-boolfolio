<script>
import { store } from '../../data/store';
import axios from 'axios';
import ProjectCard from './ProjectCard.vue';

export default {
    data() {
        return {
            projects: [],
            pagination: {
                next: null,
                prev: null,
                links: null,
            },
        };
    },

    props: {
        type_id: Number,
    },

    components: { ProjectCard },

    created() {
        this.fetchProjects(); // Chiamiamo la funzione al momento della creazione del componente
    },

    methods: {
        fetchProjects(uri = store.api.baseUrl + 'project-by-type/' + this.type_id) {
            axios.get(uri)
                .then((response) => {
                    this.projects = response.data.data;
                    this.pagination.links = response.data.links;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<template>
    <div class="container">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li v-for="link in pagination.links" :key="link.label" @click="fetchProjects(link.url)" class="page-item">
                    <a class="page-link" href="#" v-html="link.label"></a>
                    <!-- v-htlm interpreta html in vue -->

                </li>
            </ul>
        </nav>
        <div class="row row-cols-3 g-4">
            <ProjectCard v-for="project in projects" :isDetail="false" :project="project" />

        </div>
    </div>
</template>

<style lang="scss" scoped></style>