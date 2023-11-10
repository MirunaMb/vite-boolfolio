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


    created() {
        axios.get(store.api.baseUrl + 'type/' + this.$route.params.type_id).then((response) => {
            this.type = response.data;
        })
            .catch((error) => {
                this.$router.push({ name: 'not-found' });
            });

    },
};
</script>

<template>
    <div class="container">
        <h1 class="my-5">Projects by type
            <span v-if="type && type.id" class="badge mx-1" :style="{ backgroundColor: type.color }">{{ type.name }}</span>
        </h1>
        <ProjectList :type_id="type ? type.id : null" v-if="type" />
        <!-- usa la lista -->
    </div>
</template>

<style lang="scss" scoped></style>