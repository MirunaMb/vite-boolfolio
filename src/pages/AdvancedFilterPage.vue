<script>
import { store } from '../data/store';
import axios from 'axios';
import ProjectCard from '../components/projects/ProjectCard.vue';

export default {
    data() {
        return {
            filteredProjects: [],
            types: [],
            technologies: [],
        };
    },
    components: { ProjectCard },


    methods: {
        fetchProjects() {
            const activeTypes = [];
            const activeTechnologies = [];

            this.types.forEach((type) => {
                if (type.active) activeTypes.push(type.id);
            });
            this.technologies.forEach((technology) => {
                if (technology.active) activeTechnologies.push(technology.id);
            });

            // console.log(activeTypes);
            console.log(activeTechnologies);

            axios.get(store.api.baseUrl + 'get-projects-by-filters', {
                params: {
                    activeTypes,
                    activeTechnologies
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
        fetchTechnologies() {
            axios.get(store.api.baseUrl + 'technology')
                .then((response) => {
                    this.technologies = response.data.map((technology) => {
                        return {
                            ...technology,
                            active: false
                        }
                    });
                    console.log(this.technologies);
                })
                .catch((error) => {
                    console.error(error);
                });
        },


        getBadgeTechnology(technology) {
            if (technology.name_technologies === 'Tecnologia1') {
                return 'badge-red';
            }
            else if (technology.name_technologies === 'Tecnologia2') {
                return 'badge-blue';
            }
            else {
                return 'badge-green';
            }
        },


        toggleType(type) {
            type.active = !type.active;
            this.fetchProjects();
        },
        toggleTechnology(technology) {
            technology.active = !technology.active;
            this.fetchProjects();
        }
    },

    created() {
        this.fetchTechnologies();
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
                <span v-for="technology in technologies" :key="technology.id" class="badge mx-1 clickable"
                    :class="[getBadgeTechnology(technology), { 'disabled': !technology.active }]"
                    @click="toggleTechnology(technology)">
                    {{ technology.name_technologies }}
                </span>


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

.badge-red {
    background-color: red;
    color: white;
}

.badge-blue {
    background-color: blue;
    color: white;
}

.badge-green {
    background-color: green;
    color: white;
}
</style>