<template>
	
	<div class="app">
			<div class="dashboard-row">
				<div class="dashboard-col-1">
					<app-sidenav></app-sidenav>
				</div>
				<div class="dashboard-col-2">
					<app-topnav></app-topnav>
						<div  class="fixed-sub-nav">
							<div class="fixed-nav-group">
								<div class="fixed-nav-header">
									<p style="float:left" class="fixed-sub-header">
										Overview
									</p>

								</div>
							</div>
						</div>
					<div class="create-product-content">
<div class="summary-content">
			<v-slide-group show-arrows>
				 <v-slide-item>
					<v-card	:color="'#AAABDD'" class="ma-4 summary-card" flat>
						<div class="summary-row">
							<div class="summary-col-1">
								<div class="icon-div">
									<v-icon class="summary-icon" color="white">mdi-wallet</v-icon>
								</div>
							</div>
							<div class="summary-col-2">
								<h4 class="summary-title">
									Income
								</h4><br>
								<p class="summary-value">
									N{{getUser.account_balance}}
								</p>
							</div>
						</div>
					</v-card>
				</v-slide-item>
				<v-slide-item>
					<v-card	:color="'#FF7E89'" class="ma-4 summary-card" flat>
						<div class="summary-row">
							<div class="summary-col-1">
								<div class="icon-div">
									<v-icon class="summary-icon" color="white">mdi-basket</v-icon>
								</div>
							</div>
							<div class="summary-col-2">
								<h4 class="summary-title">
									Inventory
								</h4>
								<br>
								<p class="summary-value">
									{{getInventory.length}}
								</p>
							</div>
						</div>
					</v-card>
				</v-slide-item>

                <v-slide-item>
					<v-card	:color="'#AAABDD'" class="ma-4 summary-card" flat>
						<div class="summary-row">
							<div class="summary-col-1">
								<div class="icon-div">
									<v-icon class="summary-icon" color="white">mdi-shopping</v-icon>
								</div>
							</div>
							<div class="summary-col-2">
								<h4 class="summary-title">
									Planner
								</h4>
								<br>
								<p class="summary-value">
									{{getPlanner.length}}
								</p>
							</div>
						</div>
					</v-card>
				</v-slide-item>
				 <v-slide-item>
					<v-card	:color="'#AAABDD'" class="ma-4 summary-card" flat>
						<div class="summary-row">
							<div class="summary-col-1">
								<div class="icon-div">
									<v-icon class="summary-icon" color="white">mdi-bank-transfer</v-icon>
								</div>
							</div>
							<div class="summary-col-2">
								<h4 class="summary-title">
									Transactions
								</h4>
								<br>
								<p class="summary-value">
									{{getTransactions.length}}
								</p>
							</div>
						</div>
					</v-card>
				</v-slide-item>

			</v-slide-group>
		</div>
					 <div class="recent-transactions">
				<div  v-if="getTransactions.length > 0">
					<div>
						<div class="table-div" id="scroll">
							<table>
								<thead>
								<tr>
									<th>S/N</th>
                                    <th>Date</th>
									<th>Ref_ID</th>
									<th>Details</th>
									<th style="text-align:right">Debit/Credit</th>
									<th style="text-align:right">Balance</th>
								</tr>
							</thead>

							<tbody v-for="(transaction, index) in getTransactions.slice(0,5)" :key="transaction._id">
								<tr>
									<td>{{index}}</td>
                                    <td>{{transaction.createdAt | moment }}</td>
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
						</div>
					</div>
				</div>
					<div v-else  class="empty-cart">
                    <v-icon class="empty-cart-icon">mdi-folder-open</v-icon>
                    <p class="empty-cart-text">No Transaction</p>
                </div>
                                 </div>
					</div>
				</div>
			</div>
	</div>

</template>


<script src="./Overview.js"></script>
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
