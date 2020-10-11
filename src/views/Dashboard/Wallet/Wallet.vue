<template>
	<div class="app">

					<app-wallet-wallet v-show="wallet2wallet" @closeModal = "closeModal"></app-wallet-wallet>
					<app-wallet-bank v-show="wallet2bank" @closeModal2 = "closeModal2"></app-wallet-bank>
					<app-airtime v-show="airtime" @closeModal3 = "closeModal3"></app-airtime>
						<div class="wallet-modal" v-show="pinModal">
				<div class="wallet-modal-div">
			<div v-show="pinView">
				<div class="top-nav">
					<p class="wallet-modal-header">
						<v-icon color="#1c1c1c" style="font-size:30px;margin-right:10px"
							>mdi-apps</v-icon
						>
						Create a PIN
					</p>
				</div>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert">Please make sure your Pin match</p>
				<form>
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="New PIN"
						v-model="pin"
						oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
						maxlength="4"
					/>

					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Confirm PIN"
						v-model="confirm_pin"
						oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
						maxlength="4"
					/>
					<br />
					<div style="text-align:right">
						<v-btn
						@click="setPin"
							depressed
							dark
							class="focus-btn"
							color="#F6AD34"
						>
							Set PIN
						</v-btn>
					</div>
				</form>
			</div>
				<div v-show="successView">
   <div class="justify-center">
                        <div class="Form-heading" style="text-align:center;padding-top:30%;">
                            <v-icon class="success-icon" style="font-size:40px">mdi-check-circle</v-icon>
							<br>
                            <h1 class="header-text" style="font-size:20px">{{success}}</h1>
                        </div>
						<br><br>
						<v-btn
						@click="closePinView"
					depressed
					dark
					block
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Close</v-btn>
						
                                </div>
		</div>
		<div v-show="failedView">
   <div class="justify-center">
                        <div class="Form-heading" style="text-align:center;padding-top:30%;">
                            <v-icon style="color:#BD161C;font-size:100px">mdi-alert-circle</v-icon>
							<br>
                            <h1 class="header-text" style="text-transform:capitalize;font-size:20px">{{error}}</h1>
		                    <br><br>
							<v-btn
							@click="toPinView"
					depressed
					dark
					block
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Try Again</v-btn>
                        </div>
                    
                                </div>
		</div>
	</div></div>

			<!-- fund wallet -->
			<transition name="slide-x-reverse-transition">
				<div class="fund-modal" v-show="showWallet">
					<div class="fund-bar">
						<v-btn
							@click="showWallet = false"
							small
							style="background:#F8E8E8"
							class="modal-close focus-btn"
							color="#F6AD34"
							icon
							><v-icon>mdi-close</v-icon></v-btn
						>
						<app-fund-wallet></app-fund-wallet>
					</div>
				</div>
			</transition>

			<div class="dashboard-row">
				<div class="dashboard-col-1">
					<app-sidenav></app-sidenav>
				</div>

				<div class="dashboard-col-2">
					<app-topnav></app-topnav>
					<div class="wallet-content">

						<!-- wallet dashboard -->
						<app-wallet-dashboard
						:fundWallet = "showWallet"
						@setShowFundWallet = "setShowFundWallet"
						@setRefresh = "setRefresh"
						>
						</app-wallet-dashboard>

						<!-- walle transactions -->
						<app-wallet-transaction
						@toWallet2Bank = "toWallet2Bank"
						@toAirtime = "toAirtime"
						@toWallet2Wallet = "toWallet2Wallet"
						></app-wallet-transaction>
					</div>
				</div>
			</div>
		</div>
</template>

<script src="./Wallet.js"></script>


<style src="../../sass/user/app.scss" lang="scss"></style>

<style scoped>
.app {
	font-family: 'Encode Sans', sans-serif;
	font-weight: 400;
	line-height: 1.3;
	margin: 0px;
	padding: 0px;
	background-color: white;
}

table {
	min-width: 100%;
	border-collapse: collapse;
	margin: 0 auto;
	border-radius: 10px;

}

/* Zebra striping */
/* tr:nth-of-type(odd) {
	background: #eee;
	} */

th {
    background: #fcfafa;
    color: rgb(107, 107, 107);
    border-bottom: 0.5px solid #efefef;
    padding: 15px ;
}
td{
     color: rgb(54, 54, 54);
    border-bottom: 0.5px solid #efefef;
    padding: 15px ;
    transition: all .2s;
}
tr{
    background: transparent;
}
tr:hover{
  background: rgb(255, 252, 252);
}
</style>
