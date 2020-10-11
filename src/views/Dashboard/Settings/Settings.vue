<template>
	<div class="app">
	
			<div class="dashboard-row">
				<div class="dashboard-col-1">
					<app-sidenav></app-sidenav>
				</div>
				<div class="dashboard-col-2">
					<app-topnav></app-topnav>
					<div class="fixed-sub-nav">
						<div class="fixed-nav-group">
							<div class="fixed-nav-header">
								<p class="fixed-sub-header">Settings</p>
							</div>
						</div>
					</div>
					<div class="create-product-content">
                         <v-alert dismissible v-show="errorAlert" type="error">{{error}}</v-alert>
                        <v-alert dismissible v-show="successAlert" type="success">{{success}}</v-alert>
						<v-row>
							<v-col cols="12" sm="6" md="6">
								<v-card class="profile-card" flat>
									<div class="profile-card-header">Change Password</div>
									<v-row>
										<v-col style="height:65px" cols="12">
											<v-text-field
												v-model="myData.oldPassword"
												:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
												:type="show1 ? 'text' : 'password'"
												name="input-10-1"
												placeholder="Old Password"
												@click:append="show1 = !show1"
												color="#A9EF54"
											></v-text-field>
										</v-col>
										<v-col style="height:65px" cols="12">
											<v-text-field
												v-model="myData.newPassword"
												:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
												:type="show2 ? 'text' : 'password'"
												name="input-10-1"
												placeholder="New Password"
												@click:append="show2 = !show2"
												color="#A9EF54"
											></v-text-field>
										</v-col>
										<v-col style="height:65px" cols="12">
											<v-text-field
												v-model="myData.confirmPassword"
												:append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
												:type="show3 ? 'text' : 'password'"
												name="input-10-1"
												placeholder="Confirm New Password"
												@click:append="show3 = !show3"
												color="#A9EF54"
											></v-text-field>
										</v-col>
									</v-row>
									<br /><br />
									<div style="text-align:right">
										<v-btn
											@click="changePassword()"
											depressed
											style="text-transform:none;color:white"
											class="focus-btn"
											color="#F6AD34"
											:disabled="allowPasswordChange"
										>
											Change Password
										</v-btn>
									</div>
								</v-card>
							</v-col>
						</v-row>
					</div>
				</div>
			</div>
	</div>
</template>

<script src="./Settings.js"></script>

<style src="../../sass/user/app.scss" lang="scss"></style>

<style scoped>
.app {
	font-family: 'Encode Sans', sans-serif;
	font-weight: 400;
	line-height: 1.3;
	margin: 0px;
	padding: 0px;
	background: white;
}

.profile-card {
	border-radius: 10px !important;
	padding: 30px;
	box-shadow: 0 7px 12px -8px rgba(0, 0, 0, 0.204) !important;
}

.profile-card-header {
	color: #F6AD34;
	border-bottom: 0.5px solid #d6d6d6;
	padding-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
}
</style>
