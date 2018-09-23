<template>
    <div class="col-md-4">
        <router-link to="/myarticle/create">
            <button class="btn btn-secondary" type="button">Create Article</button>
        </router-link>
        <div class="card my-4">
            <h5 class="card-header">List Of My Articles</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="list-unstyled mb-0">
                            <li v-for="(lists, i) in listMyArticles" :key="i">
                                <router-link :to="`/myarticle/${lists._id}`">
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
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    listMy() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/articles/myarticle`,
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
  watch: {
      
  }
};
</script>

<style>
</style>
