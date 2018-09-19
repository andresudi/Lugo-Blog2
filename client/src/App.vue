<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";

  export default {
    name: "App",
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
       
      };
    }
  };
</script>

<style>
  body {
    background-color: black;
    background-attachment: fixed;
  }
  
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
