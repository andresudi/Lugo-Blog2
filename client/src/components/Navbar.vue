<template>
    <div>
        <nav class="navbar navbar-expand-lg fixed-top bg-danger">
            <div class="container">
                <a>
                    <v-btn type="button" small color="error" to='/' tag='span' style="margin-right: 10px;"><strong>Home</strong></v-btn>
                </a>
                <a flat class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </a>
                <v-btn type="button" small color="error" to='/myarticle' style="color: white;"><strong>My Article</strong></v-btn>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
    
    
                        <li v-if="!token" class="nav-item dropdown">
                            <a flat class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">
                                <strong>Register</strong>
                            </a>
                            <div v-if="!token" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                <form class="px-4 py-3">
    
                                    <div class="form-group">
                                        <label for="exampleDropdownFormName1">Name</label>
                                        <input type="text" class="form-control" id="exampleDropdownFormName1" placeholder="john doe" v-model="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="password" required>
                                    </div>
                                    <button type="button" @click="register" class="btn btn-success">Register</button>
                                </form>
                                <div class="dropdown-divider"></div>
                                <div v-if="errorRegister" class="alert alert-danger" role="alert">
                                    {{errorRegister}}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                </div>
                                <a class="dropdown-item" href="#">Already have an account ? Login</a>
                            </div>
                        </li>
    
    
    
                        <li class="nav-item dropdown">
                            <a flat v-if="!token" class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">
                                <strong>Login</strong>
                            </a>
                            <div v-if="!token" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
    
                                <form class="px-4 py-3">
                                    <div class="form-group">
                                        <label for="exampleDropdownFormEmail2">Email address</label>
                                        <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" v-model="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormPassword2">Password</label>
                                        <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password" v-model="password" required>
                                    </div>
                                    <button type="button" @click="login" class="btn btn-success"><strong>Log In</strong></button>
                                </form>
                                <div class="dropdown-divider"></div>
                                <div v-if="errorLogin" class="alert alert-danger" role="alert">
                                    {{errorLogin}}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                </div>
                                <a class="dropdown-item" href="#">Don't have an account ? Register</a>
                            </div>
                        </li>
    
    
                        <li v-if="token" class="nav-item dropdown">
                            <a>
                                <button type="button" class="btn btn-danger" flat @click="logout"><strong>Log Out</strong></button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    // import router from '@/router'
    import axios from "axios";
    import swal from "sweetalert";
    export default {
        data() {
            return {
                name: "",
                email: "",
                password: "",
                baseUrl: "http://localhost:3000",
                token: false,
                isLogin: "",
                errorLogin: "",
                errorRegister: ""
            };
        },
        methods: {
            register() {
                event.preventDefault();
                axios({
                        method: "POST",
                        url: this.baseUrl + "/users/register",
                        data: {
                            name: this.name,
                            email: this.email,
                            password: this.password
                        }
                    })
                    .then(result => {
                        console.log(result.data.data);
                        this.name = "";
                        this.email = "";
                        this.password = "";
                        this.success = true;
                        swal(
                            `Hallo ${result.data.data.name}!`,
                            "Please login now...",
                            "success"
                        );
                    })
                    .catch(err => {
                        console.log("masuuuuk eror", err.response.data.message);
                        this.errorRegister = err.response.data.message;
                    });
            },
            login() {
                event.preventDefault();
                axios({
                        method: "POST",
                        url: this.baseUrl + "/users/login",
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    .then(data => {
                        let token = data.data.token;
                        localStorage.setItem("token", token);
                        this.token = true;
                        this.email = "";
                        this.password = "";
                        swal("Login Successfully!", "Welcome to Lugo Blog!", "success");
                    })
                    .catch(err => {
                        this.errorLogin = err.response.data.message;
                    });
            },
            logout() {
                localStorage.clear();
                this.token = false;
                this.isLogin = "";
                this.errorLogin = "";
                this.errRegister = "";
                this.$router.push('/')
            }
        }
    };
</script>

<style scoped>
    * {
        color: black;
        /* position:  */
    }
    
    .navbar {
        position: fixed;
        /* margin-bottom: 1000px; */
        max-height: 80px;
    }
</style>

