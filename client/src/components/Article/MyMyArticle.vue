<template>
    <div class="col-md-8">
             <div class="row">
                <div class="col-md-6" v-for="(article, i) in articles" :key="i">
                    <div class="card mb-4">
                        <img class="card-img-top" v-bind:src="article.image" alt="Card image cap" style="height: 320px;">
                        <div class="card-body">
                            <h2 class="card-title">{{ article.title }}</h2>
                            <router-link :to="`/myarticle/edit/${article._id}`">
                                <button type="button" class="btn btn-success" style="margin-right: 5px;">Edit</button>
                            </router-link>
                            <button type="button" class="btn btn-danger" @click="deleteArticle(article)" style="margin-right: 5px;">Delete</button>
                            <router-link :to="`/myarticle/${article ._id}`">
                                <button type="button" class="btn btn-warning">Show Detail</button>
                            </router-link>
                        </div>
                        <div class="card-footer text-muted" style="color: black;">
                            Posted on {{ article.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from "axios";
    import swal from "sweetalert";
    
    export default {
        data() {
            return {
                token: localStorage.getItem("token"),
                articles: [],
                baseUrl: "https://blog-tdd.andresudi.club",
                actions: ""
            };
        },
        methods: {
            myArticle() {
                axios({
                        method: "GET",
                        url: this.baseUrl + "/articles/myarticle",
                        headers: {
                            token: this.token
                        }
                    })
                    .then(data => {
                        this.articles = data.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
    
            deleteArticle(article) {
                axios({
                        method: "DELETE",
                        url: this.baseUrl + `/articles/${article._id}`,
                        headers: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        swal(result.data.message, "", "success");
                        this.actions = result;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        created() {
            this.myArticle();
        },
        watch: {
            actions: function(newData, oldData) {
                if (newData) {
                    this.myArticle();
                }
                console.log(oldData);
            }
        }
    };
</script>

<style>

</style>
