<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
    data() {
        return {

        };
    },
    props: {
        project: Object
    },

    // components: {
    //   MyComponent,
    // },
    methods: {
        getBadgeTechnology(technology) {
            //   come dare colore a technology
            if (technology.name_technologies === 'Tecnologia1') {
                return 'badge-red';
            } else if (technology.name_technologies === 'Tecnologia2') {
                return 'badge-blue';
            } else {
                return 'badge-green';
            }
        },
    },
};
</script>

<template>
    <div class="col">
        <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-start">
                <span class="badge" :style="{ backgroundColor: project.type.color }">
                    {{ project.type.name }}
                </span>

                <span class="badge" v-for="technology in project.technologies" :class="getBadgeTechnology(technology)">
                    {{ technology.name_technologies }}
                </span>
            </div>
            <div class="card-body">
                <h4>{{ project.title }}</h4>
            </div>

            <div class="card-footer">
                <router-link :to="{
                    name: 'project-detail',
                    params: {
                        id: project.id
                    }
                }" class="btn btn-primary">Vedi</router-link>
            </div>

        </div>
    </div>
</template>
  
<style lang="scss" scoped>
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