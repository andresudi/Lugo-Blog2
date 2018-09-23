<template>
    <v-container fluid>
        <div class="row bapak" style="margin-top: 70px; position: relative;">
            <SideBarArticle></SideBarArticle>
            <router-view></router-view>
        </div>
    </v-container>
</template>

<script>
    import SideBarArticle from '@/components/Article/SideBarArticle'
    import CreateArticle from '@/components/Article/CreateArticle'
    import MyMyArticle from '@/components/Article/MyMyArticle'
    import EditArticle from '@/components/Article/EditArticle'
    export default {
        name: 'MyArticle',
        components: {
            SideBarArticle,
            CreateArticle,
            MyMyArticle,
            EditArticle
        },
        data() {
            return {
                isLogin: '',
                detail: ''
            }
        },
        created() {

        },
    }
</script>

<style>
    .bapak {
        min-height: 670px;
    }
</style>
