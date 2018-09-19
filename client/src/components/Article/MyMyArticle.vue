<template>
    <div class="col-md-7">
        <div v-for="(article, i) in articles" :key="i" class="card mb-4">
            <img class="card-img-top" v-bind:src="article.image" alt="Card image cap">
            <div class="card-body">
                <h2 class="card-title">{{ article.title }}</h2>
                <p class="card-text">{{ article.description }}</p>
                <button type="button" class="btn btn-success" style="margin-right: 5px;">Edit</button>
                <button type="button" class="btn btn-danger" @click="deleteArticle(article)">Delete</button>
            </div>
            <div class="card-footer text-muted" style="color: black;">
                Posted on {{ article.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ article.userId.name }}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import swal from 'sweetalert'
    
    export default {
        data() {
            return {
                token: localStorage.getItem("token"),
                articles: [],
                baseUrl: "http://localhost:3000",
                actions: ''
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
                        console.log(data.data.data);
                        this.articles = data.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
    
            deleteArticle(article) {
                axios({
                        method: 'DELETE',
                        url: this.baseUrl + `/articles/${article._id}`,
                        headers: {
                            token: this.token
                        }
                    })
                    .then((result) => {
    
    
                        swal(result.data.message, '', 'success')
                        this.actions = result
    
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        created() {
            this.myArticle()
        },
        watch: {
            "$route.params.id": function() {
                this.myArticle()
            },
            actions: function(newData, oldData) {
                console.log('=====>>>>>', newData);
                console.log('xxxxxx', oldData)
                if (newData) {
                    this.myArticle()
                }
            }
        }
    };
</script>

<style>
    
</style>
