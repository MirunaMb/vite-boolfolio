<script>
import { store } from '../data/store';
import axios from 'axios';
import ProjectCard from '../components/projects/ProjectCard.vue';

export default {
    data() {
        return {
            filteredProjects: [],
            types: [],
        };
    },
    components: { ProjectCard },


    methods: {
        fetchProjects() {
            const activeTypes = [];

            this.types.forEach((type) => {
                if (type.active) activeTypes.push(type.id);
            });

            // console.log(activeTypes);

            axios.get(store.api.baseUrl + 'get-projects-by-filters', {
                params: {
                    activeTypes,
                },
            }).then((response) => {
                this.filteredProjects = response.data.data;
            });
        },


        //si usa il map per aggiungere uno stato active prima di metterlo dentro la variabile types
        fetchTypes() {
            axios.get(store.api.baseUrl + 'type')
                .then((response) => {
                    this.types = response.data.map((type) => {
                        return {
                            ...type,
                            active: false
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        toggleType(type) {
            type.active = !type.active;
            this.fetchProjects();
        }
    },

    created() {
        this.fetchTypes();
        this.fetchProjects();
    }

};
</script>

<template>
    <div class="container">
        <h1 class="my-5">Ricerca avanzata</h1>
        <div class="row">
            <div class="col-3">
                <h4>Seleziona il tipo</h4>

                <span v-for="type in types" :key="type.id" class="badge mx-1 clickable " :class="{ disabled: !type.active }"
                    @click="toggleType(type)" :style="{ backgroundColor: type.color }">
                    {{ type.name }}
                </span>

                <hr />
                <h4>Seleziona le technologie</h4>

            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-6">
                        <ProjectCard v-for="project in filteredProjects" key="project.id" :project="project"
                            :isDetail="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<style lang="scss" scoped>
.disabled {
    filter: grayscale(1);
}

.clickable {
    cursor: pointer;
}
</style>