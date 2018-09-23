<template>
    <div class="col-md-8">
        <div class="container">
            <v-layout row wrap>
                <v-card class="color">
                    <v-card-title>
                        <span class="headline">Edit Article</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex>
                                    <v-text-field v-model="title" label="Title" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea v-model="description" rows="20" label="Content Article"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat v-on:click="editArticle">Save</v-btn>
                        <v-btn color="blue darken-1" flat to="/myarticle">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                title: '',
                description: '',
                image: '',
                baseUrl: 'http://localhost:3000',
                detailArticle: []
            }
        },
    
        methods: {
            editArticle() {
                axios({
                        method: 'PUT',
                        url: `${this.baseUrl}/articles/${this.$route.params.id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            title: this.title,
                            description: this.description,
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        this.$router.push('/myarticle')
                    }).catch((err) => {
                        console.log(err);
                    });
            },
    
            getOneArticle() {
                console.log('masuok get one');
                axios({
                        method: 'GET',
                        url: `${this.baseUrl}/articles/${this.$route.params.id}`
                    })
                    .then((result) => {
                        this.title = result.data.data.title
                        this.description = result.data.data.description
                        console.log(this.title);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        created() {
            this.getOneArticle()
        },
        watch: {
            "$route.params.id": function() {
                console.log('ooooooooooo', this.$route.params.id);
                this.getOneArticle()
            },
        }
    }
</script>

<style scoped>
    .color {
        background-color: white;
    }
</style>
