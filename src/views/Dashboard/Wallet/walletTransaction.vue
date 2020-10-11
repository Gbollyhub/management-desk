<template>
	<div class="wallet-transaction">
		<v-card class="wallet-transaction-card" flat>
					<v-row>
						<v-col @click="toWallet2Wallet" class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-wallet</v-icon>
								<p class="wallet-title">Wallet to Wallet</p>
							</div>
						</v-col>
						<v-col @click="toWallet2Bank" class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-bank-transfer</v-icon>
								<p class="wallet-title">Wallet to Bank</p>
							</div>
						</v-col>
						<v-col @click="toAirtime" class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-cards</v-icon>
								<p class="wallet-title">Buy Airtime</p>
							</div>
						</v-col>
						<v-col class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-receipt</v-icon>
								<p class="wallet-title">Pay Bills</p>
								<p style="font-size:10px;color:#F6AD34">Coming soon</p>
							</div>
						</v-col>
						<v-col class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-cash-multiple</v-icon>
								<p class="wallet-title">Apply for Loan</p>
								<p style="font-size:10px;color:#F6AD34">Coming soon</p>
							</div>
						</v-col>
						<v-col class="wallet-transaction-card-col" cols="12" sm="6" md="4">
							<div class="wallet-transaction-card-div">
								<v-icon style="font-size:60px;margin-bottom:10px">mdi-card-plus</v-icon>
								<p class="wallet-title">Savings</p>
								<p style="font-size:10px;color:#F6AD34">Coming soon</p>
							</div>
						</v-col>
					</v-row>

					<div v-if="getTransactions.length > 0">
						<table>
							<thead>
								<tr>
									<th>S/N</th>
									<th>Ref_ID</th>
									<th>Details</th>
									<th style="text-align:right">Debit/Credit</th>
									<th style="text-align:right">Balance</th>
								</tr>
							</thead>

							<tbody v-for="(transaction, index) in getTransactions.slice(0,5)" :key="transaction._id">
								<tr>
									<td>{{index}}</td>
									<td>{{ transaction.ref_id }}</td>
									<td>
										<v-icon
											
											:color="transaction.transaction_type == 'Debit' ? '#bd161c' : '#74e379'"
											style="margin-right:10px;font-size:30px"
										>{{ transaction.transaction_type == 'Debit' ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline' }}</v-icon>
										{{ `${transaction.transaction_type} - ${transaction.details}` }}
										<br />
										<span style="margin-left:38px;color:#ababab;font-size:13px;">{{ transaction.createdAt }}</span>
									</td>
									<td
										:style="{textAlign: alignRight }
										">
										<span
											:style="{ color: transaction.transaction_type == 'Debit' ? '#bd161c' : '#74e379'}"
										>
											{{transaction.transaction_type == 'Debit' ? ' - ' : ' + '}}
											₦{{transaction.amount}}
										</span>
									</td>
									<td style="text-align:right">₦{{transaction.account_balance}}</td>
								</tr>
							</tbody>
						</table>

						<br />
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								href="/transactions"
								style="font-weight:600"
								text
								depressed
								dark
								class="focus-btn"
								color="#1c1c1c"
							>See all</v-btn>
						</v-card-actions>
					</div>
					<div v-else class="empty-cart">
							<v-icon class="empty-cart-icon">mdi-folder-open</v-icon>
							<p class="empty-cart-text">Oops!! No transaction found</p>
						</div>
					<!-- end of walle transactions -->
				</v-card>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
	data() {
		return {
			alignRight: 'right',
			transactions:[
				{
				  type: 'Debit',
				  amount: '3000',
				  balance: '4000',
				  created_at : '2th',
				  status_details: 'info'
				  
				}
			]
		};
	},
	computed: {
      ...mapGetters(['getTransactions'])
    },

	methods: {
		formatMoney(money) {
			let response = new Intl.NumberFormat('en-IN', {
				maximumSignificantDigits: 3
			}).format(money);
			return `${this.currency} ${response}`;
		},

		toWallet2Wallet() {
			return this.$emit('toWallet2Wallet');
		},

		toWallet2Bank() {
			return this.$emit('toWallet2Bank');
		},

		toAirtime() {
			return this.$emit('toAirtime');
		},

		toCommission2Wallet() {
			return this.$emit('toCommission2Wallet');
		},

		toCommission2Bank() {
			return this.$emit('toCommission2Bank');
		},

		setActiveWallet(walletType) {
			return this.$emit('setActiveWallet', walletType);
		}
	},

};
</script>


<style scoped>
.app {
	font-family: 'Encode Sans', sans-serif;
	font-weight: 400;
	line-height: 1.3;
	margin: 0px;
	padding: 0px;
	background-color: white;
}

.empty-cart {
	text-align: center;
	margin-top: 80px;
}

.empty-cart-icon {
	font-size: 150px;
	color: #dddddd;
	margin-bottom: 15px;
}
.empty-cart-text {
	font-size: 18px;
	font-weight: 500px;
	color: #dddddd;
}
#scroll::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: #f5f5f5;
	height: 5px;
}

#scroll::-webkit-scrollbar {
	width: 5px;
	background-color: #f5f5f5;
	height: 5px;
}

#scroll::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #bd161c;
	height: 5px;
}
.table-div {
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
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
	background: #ffffff;
	color: rgb(107, 107, 107);
	border-bottom: 0.5px solid #efefef;
	padding: 15px;
	font-size: 13px;
}
td {
	color: rgb(54, 54, 54);
	border-bottom: 0.5px solid #efefef;
	padding: 15px;
	transition: all 0.2s;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 13px;
}
tr {
	background: transparent;
}
tr:hover {
	background: rgb(255, 252, 252);
}
</style>
