<template>
    <v-container fluid>
        <div class="row" style="margin-top: 70px;">
            <SideBarArticle></SideBarArticle>
            <router-view></router-view>
        </div>
    </v-container>
</template>

<script>
    import SideBarArticle from '@/components/Article/SideBarArticle'
    import CreateArticle from '@/components/Article/CreateArticle'
    import MyMyArticle from '@/components/Article/MyMyArticle'
    export default {
        name: 'MyArticle',
        components: {
            SideBarArticle,
            CreateArticle,
            MyMyArticle
        },
        data() {
            return {
                isLogin: ''
            }
        },
        created() {

        }
    }
</script>

<style>
    
</style>
