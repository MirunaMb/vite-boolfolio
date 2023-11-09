<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
    data() {
        return {
            projects: [], //al inizio avremmo una lista di projects,quindi un array
        };
    },
    //Sto facendo la chiamata per avere i  tipi dei progetti
    //La chiamata va fatta in rotte api ,backend
    //Concatenazione tra:
    //store.api.baseUrl =variabile store
    //i  tipi dei progetti
    //nome del parametro con l'id this.$route.params.type_id
    created() {
        console.log(store.api.baseUrl + 'project-by-type/' + this.$route.params.type_id);
    },

};
</script>

<template>
    <div class="container">
        <h1 class="my-5">Projects by type nome_type</h1>

    </div>
</template>

<style lang="scss" scoped></style>