<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <!-- Blog Post -->
    <div class="card mb-4" v-for="(article, i) in show" :key="i">
      <img class="card-img-top" v-bind:src="article.image" alt="Card image cap" style="height: 450px;">
      <div class="card-body">
        <h2 class="card-title">{{ article.title }}</h2>
        <p class="card-text">{{ article.description.slice(0,200) }}....</p>
        <router-link :to="`/${article._id}`">
          <button class="btn btn-primary">Read More &rarr;</button>
        </router-link>
      </div>
      <div class="card-footer text-muted">
        Posted on {{ article.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ article.userId.name }}
      </div>
    </div>
  
    <!-- Pagination -->
    <ul class="pagination justify-content-center mb-4">
      <li class="page-item">
        <a class="page-link" v-if="counter > 0" @click="previous">&larr; Newer</a>
      </li>
      <li class="page-item">
        <a class="page-link" v-if="articles.length-2 > counter" @click="next">Older &rarr;</a>
      </li>
    </ul>
  
  </div>
  
  <!-- Sidebar Widgets Column -->
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        baseUrl: "https://blog-tdd.andresudi.club",
        articles: [],
        show: [],
        counter: 0
      };
    },
    methods: {
      allArticle() {
        axios({
            method: 'GET',
            url: `${this.baseUrl}/articles`,
          })
          .then((data) => {
            this.articles = data.data.data
            this.show = []
            this.articles.forEach((element, index) => {
              if (index < this.counter + 2 && index >= this.counter) {
                this.show.push(element)
              }
            })
          })
          .catch((err) => {
            console.log(err);
          })
      },
      next() {
        this.counter += 2
      },
      previous() {
        this.counter -= 2
      }
    },
    created() {
      this.allArticle()
    },
  
    watch: {
      counter() {
        this.allArticle()
      }
    }
  };
</script>

<style>
  .card-body {
    color: black;
  }
</style>
