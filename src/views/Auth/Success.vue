<template>
       <div>
      <section class="section-login">
                <div class="full-width-row">
                    <div class="col-1-of-2-picture picture-col">
                        <banner-component></banner-component>
                    </div>
                    <div class="col-1-of-2-form form-col2">     
                                <div class="justify-center">
 <img src="../../assets/logo-3.png" alt="" class="brand-logo2">
                        <div class="Form-heading" style="text-align:center;padding-top:15%;">
                            <v-icon class="success-icon">mdi-check-circle</v-icon>
                            <h1 class="header-text">Account Created</h1>
                            <p class="sub-text">aliasgbolly@gmail.com</p>
                            <br>
                            <p style="font-size:14px;color:#969696">Please check your inbox, a confirmation mail has been sent your email address for verification,</p>
                            <br><br>
                            <p><a style="font-size:14px;color:#969696" :href= "url + 'user/login'">Login into your Account</a> | <a style="font-size:14px;color:#969696" :href= "url"> Privacy Policy </a></p>
                        </div>
                    
                                </div>
                    </div>
                </div>
            </section>
       </div>
</template>

<script>
import BannerComponent from "./BannerComponent.vue"
export default {
    components: {
        'banner-component': BannerComponent,
      },
    data(){
        return{
        }
    }
}
</script>

<style src = "../sass/user/app.scss" lang="scss"></style>

<style scoped>
.app {
    font-family: 'Encode Sans', sans-serif;
    font-weight: 400;
    line-height: 1.3;
     margin: 0px;
    padding: 0px;
        background: white;
}
</style>




