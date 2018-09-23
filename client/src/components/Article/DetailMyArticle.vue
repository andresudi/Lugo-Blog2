<template>
    <div class="col-md-7" style="margin: 0 auto;">
        <div class="card mb-4">
            <img class="card-img-top" v-bind:src="oneArticle.image" alt="Card image cap" style="height: 550px;">
            <div class="card-body">
                <h2 class="card-title">{{ oneArticle.title }}</h2>
                <p class="card-text">{{ oneArticle.description }}</p>
                <router-link :to="`/myarticle/edit/${oneArticle._id}`">
                    <button type="button" class="btn btn-success" style="margin-right: 5px;">Edit</button>
                </router-link>
                <button type="button" class="btn btn-danger" @click="deleteArticle(oneArticle)" style="margin-right: 5px;">Delete</button>
                <router-link :to="`/myarticle/`">
                    <button type="button" class="btn btn-primary">Back</button>
                </router-link>
            </div>
            <div class="card-footer text-muted" style="color: black;">
                Posted on {{ oneArticle.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ oneArticle.userId.name }}
            </div>
        </div>
    
        <div class="card text-center">
            <div class="card-header">
                Featured
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
        <br>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Write your comment here.." aria-label="Recipient's username" aria-describedby="button-addon2" v-model="comment">
            <div class="input-group-append">
                <button class="btn btn-success" type="button" id="button-addon2" @click="addComment">Comment</button>
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
                oneArticle: '',
                baseUrl: "http://localhost:3000",
                actions: '',
                token: localStorage.getItem("token"),
                comment: '',
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
            deleteArticle() {
    
                axios({
                        method: "DELETE",
                        url: this.baseUrl + `/articles/${this.$route.params.id}`,
                        headers: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        swal(result.data.message, "", "success");
                        this.$router.push('/myarticle')
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
    
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
    
            addComment() {
                axios({
                        method: 'PUT',
                        url: `${this.baseUrl}/articles/comment/${this.$route.params.id}`,
                        headers: {
                            token: this.token
                        },
                        data: {
                            comment: this.comment
                        },
                    })
                    .then((result) => {
                        this.actions = result
                        this.$router.push(`/myarticle/${this.$route.params.id}`)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        created() {
            this.showDetail();
        },
        watch: {
            actions: function(newData, oldData) {
                if (newData) {
                    this.showDetail()
                }
                console.log(oldData)
            }
        }
    };
</script>

<style>
    
</style>
