<template>
    <!-- Sidebar Widgets Column -->
    <div class="col-md-4">
    
        <!-- Search Widget
        <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                              <button class="btn btn-secondary" type="button">Search Article</button>
                            </span>
                </div>
            </div>
        </div> -->
    
        <!-- Categories Widget -->
        <div class="card my-4">
            <h5 class="card-header">List Of All Articles</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="list-unstyled mb-0">
                            <li v-for="(lists, i) in listMyArticles" :key="i">
                                <router-link :to="`/${lists._id}`">
                                    <a href="#">{{ lists.title }}</a>
                                </router-link>
                            </li>
                        </ul>
                    </div>
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
      listMyArticles: [],
      baseUrl: "https://blog-tdd.andresudi.club"
    };
  },
  methods: {
    listMy() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/articles/`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          console.log(data.data.data);

          this.listMyArticles = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.listMy();
  },
  watch: {}
};
</script>

<style>
</style>
