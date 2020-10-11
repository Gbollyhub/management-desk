<template>
	<div>
		<div class="dashboard-top-nav">
			<div class="nav-div">
				<div class="nav-left-float">
					<p class="nav-header">
						<v-btn @click="goBack" icon class="focus-btn" style="display:inline-block;">
							<v-icon size="25">mdi-arrow-left</v-icon>
						</v-btn>
					</p>
				</div>
				<div class="nav-right-float">
					<v-btn @click="openNav" icon class="focus-btn hidden-md-and-up">
						<v-icon style="font-size:35px;" color="#8d8e91">mdi-menu</v-icon>
					</v-btn>
					<p class="nav-date hidden-sm-and-down">
						<v-btn class="focus-btn hidden-sm-and-down" icon @click="profilebar = true">
							<v-icon color="#ADB0B4">mdi-account-circle</v-icon>
						</v-btn>
		
					</p>
				</div>
			</div>
		</div>
		<transition name="slide-x-reverse-transition">
			<div class="profile-bar" v-show="profilebar">
				<p @click="close" class="close-btn">&#10006</p>
				<app-profile-bar></app-profile-bar>
			</div>
		</transition>
		<div id="mySidenav" class="sidenav">
			<a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>

			<div style="padding:0 30px">
				<!-- <img class="dashboard-logo" src="../../../../../public/asset/img/omni-logo.svg" alt="">
				<br><br>-->

				<div class="side-bar-heading">
					<h4 class="side-bar-header">{{getUser.full_name}}</h4>
					<p class="side-bar-sub">{{getUser.email_address}}</p>
				</div>
				<v-btn
					depressed
					style="font-weight:700; font-size:14px"
					dark
					block
					color="#F5A623"
				>{{getUser.account_number}}</v-btn>
				<br />
				<br />
				<nav class="navigation">
					<ul class="mainmenu">
						<li class="mainmenu-li">
							<a href="/">
								<v-icon class="nav-icon">mdi-home</v-icon>
							Overview
							</a>
						</li>
											
						<li class="mainmenu-li">
							<a href="/transactions">
								<v-icon class="nav-icon">mdi-bank-transfer</v-icon>
							Transactions
							</a>
						</li>
						<li class="mainmenu-li">
							<a href="/profile">
								<v-icon class="nav-icon">mdi-account</v-icon>
							Profile
							</a>
						</li>
						<li class="mainmenu-li">
							<a href="/settings">
								<v-icon class="nav-icon">mdi-cog</v-icon>
							Settings
							</a>
						</li>
						<li @click="logout" class="mainmenu-li">
							<a href=#>
								<v-icon class="nav-icon">mdi-power</v-icon>
							Logout
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios'
 import url from '../../url'
 import moment from 'moment'
 import Profilebar from './ProfileBar';
export default {
components: {
		'app-profile-bar': Profilebar
	},
	data: () => ({
		showServices: false,
		showProducts: false,
		profilebar: false,
		user: {}
	}),

	computed: {
      ...mapGetters(['getUser'])

	},
	  filters:{
   moment: function(date){
      return moment(date).format('MMMM Do YYYY');
   }
	  },
	created() {
	
	},

	methods: {
		  async logout(){
			// const token = localStorage.getItem('token');
			//   const operation = await axios.get(`${url}/logout`,{},{ headers: { 'Authorization': `Bearer ${token}` } },)
		  localStorage.removeItem('token')
		  location.reload()
		  },
		

		close() {
			this.profilebar = false;
		},
		toRoute(url) {
			window.location.assign(url);
		},
		toSelectProductPage() {
			window.location.assign(`select-product-type`);
		},
		toOverview() {
			window.location.assign(`overview`);
		},
		goBack() {
			window.history.back();
		},
		openNav() {
			document.getElementById('mySidenav').style.width = '100%';
		},

		closeNav() {
			document.getElementById('mySidenav').style.width = '0';
		},

		logoutUser() {
			axios(this.Url + '/user/logout/')
				.then(response => {
					if (!response.data == 200) {
						return (this.errorMessage = 'Could not logout');
					}
					localStorage.removeItem('token');
					window.location.href = this.Url;
				})
				.catch(error => {});
		}
	}
};
</script>

<style scoped>
.activeNav {
	background-color: white;
	border-radius: 20px;
	box-shadow: 0 6px 16px -7px rgba(0, 0, 0, 0.11);
}

.activeNav .mainmenu-li a {
	color: rgb(51, 51, 51);
}

.activeNav .mainmenu-li a .nav-icon {
	color: #bd161c;
}

.mainmenu {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
.mainmenu-li {
	margin-bottom: 5px;
	padding: 10px;
}
.mainmenu-li a {
	letter-spacing: 1px;
	color: #adb0b4;
	font-weight: 500;
	font-size: 15px;
	text-decoration: none;
}

.mainmenu-li a:hover {
	color: rgb(51, 51, 51);
}

.mainmenu-li a:hover .nav-icon {
	color: rgb(51, 51, 51);
}
.nav-icon {
	color: #adb0b4;
	font-size: 19px;
	margin-top: -3px;
	margin-right: 7px;
}

.submenu {
	margin-top: 10px;
	list-style-type: none;
}

.submenu-li {
	margin-bottom: 5px;
}

.submenu-li a {
	letter-spacing: 1px;
	color: #adb0b4;
	font-size: 12px;
	text-decoration: none;
}

.submenu-li a:hover {
	color: rgb(51, 51, 51);
}
.nav-arrow {
	color: #adb0b4;
	font-size: 15px;
	margin-top: -3px;
	margin-right: 7px;
}
.sidenav {
	height: 100%;
	width: 0;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	background-color: #fffbfb;
	overflow-x: hidden;
	transition: 0.5s;
	padding-top: 60px;
}

/* .sidenav a {
  padding: 8px 0 8px 0;
  text-decoration: none;
  font-size: 25px;
  color: #8d8e91;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #BD161C;
} */

.sidenav .closebtn {
	position: absolute;
	top: 0;
	right: 25px;
	font-size: 50px;
	margin-left: 50px;
	color: #adb0b4;
}

.profile-bar-header {
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
	box-shadow: -1px 0px 10px 1px rgba(0, 0, 0, 0.101) !important;
	display: block;
}
.user-photo {
	text-align: center;
}

.user-icon {
	height: 100px;
	margin-bottom: 20px;
}
.user-name {
	font-size: 15px;
	font-weight: 500;
}
.user-type {
	font-size: 13px;
	color: rgb(172, 172, 172);
}

input::placeholder {
	color: red;
	font-size: 1.2em;
	font-style: italic;
}
.close-btn {
	font-size: 20px;
	position: absolute;
	right: 30px;
	top: 35px;
	cursor: pointer;
}

@media screen and (max-height: 450px) {
	.sidenav {
		padding-top: 15px;
	}
	.sidenav a {
		font-size: 18px;
	}
}
</style>
