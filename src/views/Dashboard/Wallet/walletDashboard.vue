<template>
	<div>
		<v-card flat class="wallet-content-panel">
			<div class="fund-wallet-div hidden-sm-and-down">
				<v-btn
					@click="openFundWallet(true)"
					depressed
					dark
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Fund Wallet</v-btn
				>

			</div>

			<div
				class="wallet-content-panel-wallet-balance"
			
			>
				<p class="wallet-content-panel-wallet-balance-header">
				Wallet Balance
				</p>
				<h3 class="wallet-content-panel-wallet-balance-amount">
				₦{{getUser.account_balance}}.00
				</h3>

				<p class="wallet-content-panel-wallet-balance-daily">
					 Wallet ID: <span style="text-transform:uppercase">{{getUser.account_number}}</span>
				</p>
			</div>
           	<v-btn
				 @click="refresh(true)"
				class="focus-btn"
				style="color:#1c1c1c"
				color="white"
				dark
				small
				absolute
				bottom
				left
				fab
			>
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
			<v-btn
				 @click="openFundWallet(true)"
				class="hidden-md-and-up focus-btn"
				style="color:#1c1c1c"
				color="white"
				dark
				small
				absolute
				bottom
				right
				fab
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-card>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
         props:{
	fundWallet: Boolean,
   },
	data() {
		return {};
	}, 
	computed: {
      ...mapGetters(['getUser'])

    },

	methods: {
	openFundWallet(status){
        this.$emit('setShowFundWallet', status)
		},
		refresh(){
			  this.$emit('setRefresh')
		}
	},


	created() {}
};
</script>

<style scoped></style>
