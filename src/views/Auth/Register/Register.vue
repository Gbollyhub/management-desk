<template>
   <div>
          <section class="section-login">
                <div class="full-width-row">
                    <div class="col-1-of-2-picture picture-col">
                    <banner-component></banner-component>
                       </div>
                    <div class="col-1-of-2-form form-col">
                    <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        fixed
                        top
                        color="green"
                    ></v-progress-linear>

         <div v-if="register" class="justify-center">
                        <div class="Form-heading">
                            <h1 class="header-text">Create account for your Business</h1>
                            <!-- <p class="sub-text">Enter your credentials to create an account.</p> -->
                        </div>
                        <br>
                         <v-alert dismissible v-if="errorAlert" type="error">{{error}}</v-alert>
                        <form  @submit.prevent = "Login">
                         <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="full_name" color="#add642" placeholder="Company Name" solo></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="email_address" color="#add642" placeholder="Company Email Address" solo ></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="phone_number" color="#add642" placeholder="Company Phone Number" solo></v-text-field>
                                </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="address" color="#add642" placeholder="Company Address" solo></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="password" type="password" color="#add642" placeholder="Password" solo></v-text-field>
                                </v-col>
                                </v-row>
                                
                       <br>
                        <router-link to="/login"> <p style="font-size:14px;color:#969696">Already have an account? Login</p></router-link>
                       <br>
                       <v-card-actions>
                           <v-btn 
                           block
                                @click="Register"
                                style="text-transform:none;font-weight:700" depressed
                                class="large-block-btn-red" dark large 
                                color="#add642">Create Account</v-btn>
                       </v-card-actions>
                        </form> 
         </div>                           
                 
                  <div v-else class="justify-center">
 <img src="../../../assets/logo-3.png" alt="" class="brand-logo2">
                        <div class="Form-heading" style="text-align:center;padding-top:15%;">
                            <v-icon class="success-icon">mdi-check-circle</v-icon>
                            <h1 class="header-text">Account Created</h1>
                            <p class="sub-text">{{email_address}}</p>
                            <br>                            <br><br>
                       <router-link to="/login"> <p style="font-size:14px;color:#969696">Login into your Account</p></router-link>
                        </div>
                    
                                </div>
                 
                    </div>
                    
                </div>
            </section>
    </div>
</template>

<script src ="./Register.js"></script>

<style src = "../../sass/user/app.scss" lang="scss"></style>

<style scoped>
.app {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.3;
     margin: 0px;
    padding: 0px;
        background: white;
}

a{
    text-decoration: none;
}

</style>
