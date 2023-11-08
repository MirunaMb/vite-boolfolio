<script>
import ProjectCard from "../components/projects/ProjectCard.vue";
import axios from "axios";
import { store } from '../data/store';
export default {
    data() {
        return {
            project: Object,
            title: "Dettaglio project"
        };
    },

    components: {
        ProjectCard,
    },
    created() {
        console.log(store.api.baseUrl + 'projects/' + this.$route.params.id)
        axios.get(store.api.baseUrl + 'projects/' + this.$route.params.id)
            .then((response) => {
                this.project = response.data;
                console.log(this.project);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
</script>

<template>
    <div class="container my-5">
        <h1 class="my-5">Dettaglio project</h1>
        <ProjectCard :project="project" :isDetail="true" v-if="project" />
    </div>
</template>

<style lang="scss" scoped></style>