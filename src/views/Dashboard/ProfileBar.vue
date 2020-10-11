<template>
<div>
    <v-snackbar v-model="snackbar" right top color="success" :timeout="timeout">
		{{ message }}
		<v-btn text @click="snackbar = false">Close</v-btn>
	</v-snackbar>
  <h3 class="profile-bar-header">Update Profile</h3>
  <br>
   <div class="user-photo" >
        <v-alert dismissible v-show="errorAlert" type="error">{{error}}</v-alert>
                        <v-alert dismissible v-show="successAlert" type="success">{{success}}</v-alert>
    <br>
    <p class="user-name">{{getUser.full_name}}</p>
     <p class="user-type">{{getUser.email_address}}</p>
   </div>
   <div class="user-form">
    <v-text-field style="font-size:14px;"  color="#1b1b1b"  v-model="myData.first_name = getUser.full_name"  placeholder="First Name"></v-text-field>
    <v-text-field  style="font-size:14px;"  color="#1b1b1b" v-model="myData.email_address = getUser.email_address"  placeholder="Email Address" readonly></v-text-field>
     <v-text-field style="font-size:14px;"   color="#1b1b1b" v-model="myData.phone_number = getUser.phone_number"  placeholder="Phone Number"></v-text-field>
     <v-text-field style="font-size:14px;"   color="#1b1b1b" v-model="myData.address = getUser.address"  placeholder="Bvn"></v-text-field>
     <!-- <v-text-field v-show="false"  style="font-size:14px;"  color="#1b1b1b" v-model="myData.user_id = getUserDetailFromStore.id" :type="'hidden'" placeholder=""></v-text-field> -->
     <br>
     <!-- <v-btn style="margin-right:20px;" color="#BD161C" outlined>More</v-btn> -->
     <v-btn color="#BD161C" @click="editProfile" dark>Update</v-btn>
   </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex';
import url from '../../url'
    export default {
        data(){
            return{
                  success: '',
            successAlert: false,
            error: '',
            errorAlert: false,
              myData:{
                  first_name: "",
                  phone_number: "",
                  email_address: "",
                  bvn: ""
                },
              snackbar: false,
            message: '',
			timeout: 2000,
			user:{},
            }
        },

		computed: {
                  ...mapGetters(['getUser']),

                baseURl: function () {
                    return window.baseURL + "/api/user/";
                },

                Url: function () {
                    return window.baseURL;
				},

				imageUrl: function () {
					return window.baseURL + "/images/users/";
				},

		},

		created() {
			
		},

        methods:{
			async editProfile () {
                 const token = localStorage.getItem('token');
                 const _id = this.getUser._id
                 const full_name = this.full_name
                 const phone_number = this.phone_number
            const resData = {
                "_id": this.getUser._id,
              "full_name": this.myData.full_name,
              "phone_number": this.myData.phone_number
            }
                  try {
                await axios.patch(`${url}/update-account`, resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
            this.successAlert = true;
            this.success = 'Profile changed successfully';
            } catch (error) {
                console.log(error)
                this.errorAlert = true;
                this.error = error.message;
            }
            },

            close(){
                let newState = false
             this.$emit('profilebar', newState);
            },

        },

    }

</script>

<style scoped>
.profile-bar-header{
    font-weight: 500px;
    font-size: 20px;
}
.profile-bar {
    width: 25%;
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px 30px;
    z-index: 9999;
    background-color: white;
    height: 100vh;
    box-shadow:  -1px 0px 10px 1px rgba(0, 0, 0, 0.101) !important;
    display: block;
}
.user-photo{
    text-align: center;
}

.user-icon{
  height: 100px;
  margin-bottom: 20px;
}
.user-name{
    font-size: 15px;
    font-weight: 500;
}
.user-type{
    font-size: 13px;
    color: rgb(172, 172, 172);
}

input::placeholder { color: red; font-size: 1.2em; font-style: italic; }
.close-btn {
    font-size: 20px;
    position: absolute;
    right: 30px;
    top: 35px;
}
</style>
