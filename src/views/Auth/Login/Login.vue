<template>
<div>
          <section class="section-login">
                <div class="full-width-row">
                    <div class="col-1-of-2-form form-col">
                    <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        fixed
                        top
                        color="green"
                    ></v-progress-linear>

         <div class="justify-center">

                        <div class="Form-heading">
                            <h1 class="header-text">Login into Your Account</h1>
                            <!-- <p class="sub-text">Enter your credentials to login.</p> -->
                        </div>
                        <br>
                         <v-alert dismissible v-if="errorAlert" type="error">{{error}}</v-alert>
                        <form  @submit.prevent = "login">
                         <v-row justify="center">
                                <v-col cols="12">
                                    <v-text-field required v-model="user.email_address" color="#add642" label="Email Address" solo></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                     <v-text-field required v-model="user.password" color="#add642" type="password" label="Password" solo></v-text-field>
                                </v-col>
                                </v-row>
                                
                       <br>
                        <router-link to="/create-account"> <p style="font-size:14px;color:#969696">Not a user? Click to create an account</p></router-link>
                       <br>
                       <v-card-actions>
                           <v-btn
                           block
                           type="submit"
                                style="text-transform:none;font-weight:700" depressed
                                class="large-block-btn-red" dark large 
                                color="#add642">Login</v-btn>
                       </v-card-actions>
                        </form> 
         </div>                           
                    </div>
                     <div class="col-1-of-2-picture picture-col">
                    <banner-component></banner-component>
                       </div>
                </div>
            </section>
</div>
</template>

<script src ="./Login.js"></script>

<style src = "../../sass/user/app.scss" lang="scss"></style>

<style scoped>
.app {
   font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    line-height: 1.3;
     margin: 0px;
    padding: 0px;
        background: white;
}

a {
    color: #3d3d3d;
    text-decoration: none;
}
</style>
