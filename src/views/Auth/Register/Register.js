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
      error: '',
      loading: false,
      register:true,
      show1: false,
      full_name: '',
      phone_number: '',
      email_address: '',
      password: '',
      address: ''
    }
},
computed: {

},

    methods: {
    async Register(){

       const full_name = this.full_name;
       const email_address = this.email_address;
      const phone_number = this.phone_number;
      const address = this.address;
      const password = this.password

       const resData = {
        "full_name": full_name,
        "email_address": email_address,
        "phone_number": phone_number,
        "address": address,
        "password": password
    }


      try {
        this.loading = true
        await axios.post(`${url}/create-account`, resData)
        this.loading = false
        this.register = false

      } catch (error) {
        this.errorAlert = true
        this.error = error.response.data.error;
      }

     }
}

}

