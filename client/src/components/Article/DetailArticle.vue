<template>
    <div class="col-md-8" style="margin: 0 auto;">
        <div class="card mb-4">
            <img class="card-img-top" v-bind:src="oneArticle.image" alt="Card image cap" style="height: 550px;">
            <div class="card-body">
                <h2 class="card-title">{{ oneArticle.title }}</h2>
                <p class="card-text">{{ oneArticle.description }}</p>
                <router-link :to="`/`">
                    <button type="button" class="btn btn-primary">Back</button>
                </router-link>
            </div>
            <div class="card-footer text-muted" style="color: black;">
                Posted on {{ oneArticle.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ oneArticle.userId.name }}
            </div>
        </div>
    
        <div>
            <h3 style="color: white;">All Comments</h3>
            <div class="card text-center" v-for="(comment, i) in oneArticle.comments" v-bind:key="i">
                <div class="card-header">
                    <strong>Posted By: {{ comment.name }} </strong>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ comment.comment }}</h5>
                    <a class="btn btn-danger" @click="deleteComment(comment._id)" v-if="comment.userId == userLogin && token || oneArticle.userId == userLogin && token">Delete Comment</a>
                </div>
                <div class="card-footer text-muted">
                    {{ comment.date | moment("dddd, MMMM Do YYYY, h:mm a") }}
                </div>
            </div>
            <br>
            <div class="input-group mb-3" v-if="token">
                <input type="text" class="form-control" placeholder="Write your comment here.." aria-label="Recipient's username" aria-describedby="button-addon2" v-model="comment">
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" id="button-addon2" @click="addComment">Comment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                oneArticle: "",
                baseUrl: "https://blog-tdd.andresudi.club",
                actions: "",
                token: localStorage.getItem("token"),
                userLogin: localStorage.getItem("id"),
                comment: ""
            };
        },
        methods: {
            showDetail() {
                axios({
                        method: "GET",
                        url: this.baseUrl + `/articles/${this.$route.params.id}`,
                        headers: {
                            token: this.token
                        }
                    })
                    .then(data => {
                        this.oneArticle = data.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
    
            addComment() {
                axios({
                        method: "PUT",
                        url: `${this.baseUrl}/articles/comment/${this.$route.params.id}`,
                        headers: {
                            token: this.token
                        },
                        data: {
                            comment: this.comment
                        }
                    })
                    .then(result => {
                        this.actions = result;
                        this.$router.push(`/${this.$route.params.id}`);
                        this.comment = ''
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
    
            deleteComment(idComment) {
                console.log(idComment);
    
                axios({
                        method: "PUT",
                        url: `${this.baseUrl}/articles/comment/${this.$route.params.id}/${idComment}/delete`,
                        headers: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        console.log("masuk delete comment");
                        console.log(result);
                        this.actions = result;
                        this.$router.push(`/${this.$route.params.id}`);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        created() {
            this.showDetail();
            this.token = localStorage.getItem("token")
            this.userLogin = localStorage.getItem("id")
        },
        watch: {
            actions: function(newData, oldData) {
                if (newData) {
                    this.showDetail();
                }
                console.log(oldData);
            },
            "$route.params.id": function() {
                this.showDetail();
            }
        }
    };
</script>

<style>
    
</style>
