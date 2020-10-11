import {mapGetters} from 'vuex';
import BannerComponent from "../BannerComponent.vue"
import axios from 'axios'
import url from '../../../url'
export default {
    components: {
      'banner-component': BannerComponent
    },
    data(){
    return{
      errorAlert: false,
      error:'',
      show1: false,
      loading: false,
      user:{
        email_address: '',
        password: ''
      }
    }
},

methods: {
   async login(){
     const resData = {
       "email_address": this.user.email_address,
       "password": this.user.password
     }
     try{
       this.loading = true
      const user = await axios.post(`${url}/login`, resData)
      if (typeof window !== 'undefined') {

        localStorage.setItem('token', user.data.token);
        this.loading = false
        this.$router.push({path:'/'})
    }
     }
     catch(error){
      this.loading= false,
      this.errorAlert = true
      this.error = error.response.data.error;
     }
   
   }
}

}

