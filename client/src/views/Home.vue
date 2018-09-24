<template>
  <div class="container">
    <br>
    <br>
    <br>
    <Carousel></Carousel>
    <v-layout align-center>
      <v-flex>
        <h4 class="display-3" style="color: white;">Welcome to LUGO-Blog</h4>
        <span class="subheading" style="color: white;">In Anime We Trust</span>
        <h3 style="color: white;">Happy reading!</h3>
      </v-flex>
    </v-layout>
    <img src="http://www.zaktebbal.com/images/fire.gif?crc=4136673659" alt="" sizes="" srcset="">
    <br>
    <br>
    <br>
    <div class="row">
      <SideBar></SideBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import ArticleCard from '@/components/Article/ArticleCard'
  import Carousel from '@/components/Carousel'
  import SideBar from '@/components/SideBar'
  import DetailArticle from '@/components/Article/DetailArticle'
  export default {
    name: 'home',
    components: {
      ArticleCard,
      Carousel,
      SideBar,
      DetailArticle
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
