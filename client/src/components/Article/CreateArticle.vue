<template>
    <div class="col-md-8"> 
        <div class="container">
            <v-layout row wrap>
                <v-card class="color">
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex>
                                    <v-text-field v-model="title" label="Title" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea rows="20" v-model="description" label="Content Article"></v-textarea>
                                </v-flex>
                                <input v-on:change="getImage" type="file">
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat v-on:click="addArticle">Save</v-btn>
                        <v-btn color="blue darken-1" flat v-on:click="cancel">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </div>
    </div>
</template>

<script scoped>
    import axios from 'axios'
    import swal from 'sweetalert'
    export default {
        data: () => ({
            title: '',
            description: '',
            image: '',
            baseUrl: 'http://localhost:3000'
        }),
    
        methods: {
            addArticle: function() {
                let formdata = new FormData()
                formdata.append('image', this.image)
                axios.post(`${this.baseUrl}/articles/upload`, formdata)
                    .then((result) => {
                        axios({
                                method: 'POST',
                                url: this.baseUrl + '/articles',
                                headers: {
                                    token: localStorage.getItem('token')
                                },
                                data: {
                                    title: this.title,
                                    description: this.description,
                                    image: result.data.link
                                }
                            })
                            .then((data) => {
                                console.log(data);
                                this.$router.push('/myarticle')
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    })
                    .catch((err) => {
                        swal(err.message)
                    });
            },
    
            getImage(image) {
                console.log(image);
                this.image = image.target.files[0]
            },
            cancel() {
                this.$router.push('/myarticle')
            }
        }
    }
</script>

<style scoped>
    .color {
        background-color: white;
    }
</style>
