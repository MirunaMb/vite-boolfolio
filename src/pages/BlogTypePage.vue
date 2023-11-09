<script>

import ProjectTypeList from '../components/projects/ProjectTypeList.vue';

import { store } from '../data/store';
import axios from 'axios';
export default {
    data() {
        return {
            type: {
                id: '',
                name: '',
                color: '',
            }
        };
    },


    components: { ProjectTypeList },


    created() {
        axios.get(store.api.baseUrl + 'type/' + this.$route.params.type_id).then((response) => {
            this.type = response.data;
        });
    }
};
</script>

<template>
    <div class="container">
        <h1 class="my-5">Projects by type
            <span class="badge mx-1" :style="{ backgroundColor: type.color }">{{ type.name }}</span>
        </h1>
        <ProjectTypeList />
        <!-- usa la lista -->
    </div>
</template>

<style lang="scss" scoped></style>