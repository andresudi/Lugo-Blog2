<template>
    <div id="app">
        <v-container row wrap>
            <v-carousel hide-delimiters>
                <v-carousel-item v-for="image in carouselImg" :src="image.imgsrc" :key="image.id">
                </v-carousel-item>
            </v-carousel>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                carouselImg: [{
                        imgsrc: "https://steamusercontent-a.akamaihd.net/ugc/823440303646988829/057D4CB42766804CD18CC5E9850FCC6B2C9B9388/",
                    },
                    {
                        imgsrc: 'https://media.giphy.com/media/MuOnsi1z8wQs8/giphy.gif',
                    },
                    {
                        imgsrc: 'https://lh3.googleusercontent.com/-j_cHxAHE1oQ/VcMN4P404GI/AAAAAAAAEDM/JIj1P_mcz04/w500-h317/2015%2B-%2B1',
                    },
                    {
                        imgsrc: 'https://vignette.wikia.nocookie.net/shingekinokyojin/images/5/51/Beast_Titan_throws_horse.gif/revision/latest?cb=20171010014401'
                    },
                    {
                        imgsrc: 'https://gifer.com/i/62OM.gif'
                    },
                    {
                        imgsrc: 'https://gifer.com/i/4R4P.gif'
                    },
                    {
                        imgsrc: 'https://media.giphy.com/media/H9RL1IKvsBi6c/giphy.gif'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
    }
    
    .inspire {
        height: 100vh;
    }
    
    .imageC {
        height: 100px;
    }
</style>
