<script>

import ProjectList from '../components/projects/ProjectList.vue';

import { store } from '../data/store';
import axios from 'axios';
export default {
    data() {
        return {
            type: null,
        };
    },


    components: { ProjectList },

    methods: {
        fetchType(endpoint = store.api.baseUrl + 'type/' + this.$route.params.type_id) {
            axios.get(endpoint).then((response) => {
                this.type = response.data;
            })
                .catch((error) => {
                    this.$router.push({ name: 'not-found' });
                });
        }

    },

    created() {
        this.fetchType();
    },

    //beforeRouteUpdate va solo per per le page
    beforeRouteUpdate(to) {
        this.fetchType(store.api.baseUrl + 'type/' + to.params.type_id);
        // console.log(to.params.type_id);
    }

};
</script>

<template>
    <div class="container">
        <h1 class="my-5">Projects by type
            <span v-if="type && type.id" class="badge mx-1" :style="{ backgroundColor: type.color }">{{ type.name }}</span>
        </h1>
        <ProjectList :key="type.id" :type_id="type ? type.id : null" v-if="type" />
        <!-- usa la lista -->
    </div>
</template>

<style lang="scss" scoped></style>