<template>
	
	<div class="app">
			<div class="dashboard-row">
				<div class="wallet-modal" v-show="cartModal">
				<div class="wallet-modal-div" style="width:50%">
					<p @click="cartModal = false" style="float:right;cursor:pointer">X</p>
					<br><br>
					<app-cart :basket="basket"></app-cart>
				</div>
				</div>
			<div class="wallet-modal"  v-show="pinModal">
				<div class="wallet-modal-div">
			<div v-show="pinView">
				<div class="top-nav">
					 <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        top
                        color="green"
                    ></v-progress-linear>
					<p @click="pinModal = false" style="float:right;cursor:pointer">X</p>
					<p class="wallet-modal-header">
						<v-icon color="#1c1c1c" style="font-size:30px;margin-right:10px"
							>mdi-apps</v-icon
						>
						Add Item
					</p>
				</div>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert">Insuffient Funds</p>
				<form>
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Item"
						v-model="item"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Description"
						v-model="details"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Item Price"
						v-model="price"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Stock Value"
						v-model.number="stock_value"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Supplier"
						v-model="supplier"
					/>
					
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Cost of Supply"
						v-model="cost"
					/>    
					<br />
					
					<div style="text-align:right">
						<v-btn
						@click="createInventory"
							depressed
							dark
							class="focus-btn"
							color="#A9EF54"
						>
							Add item
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
					color="#A9EF54"
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
					color="#A9EF54"
					style="color:white;margin-bottom:5px"
					>Try Again</v-btn>
                        </div>
                    
                                </div>
		</div>
	</div></div>
				<div class="wallet-modal"  v-show="pinModal2">
				<div class="wallet-modal-div">
			<div v-show="pinView2">
				<div class="top-nav">
					 <v-progress-linear
                        :active="loading2"
                        :indeterminate="loading"
                        top
                        color="green"
                    ></v-progress-linear>
					<p @click="pinModal2 = false" style="float:right;cursor:pointer">X</p>
					<p class="wallet-modal-header">
						<v-icon color="#1c1c1c" style="font-size:30px;margin-right:10px"
							>mdi-apps</v-icon
						>
						Update Item
					</p>
				</div>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert2">Insuffient Funds</p>
				<form>
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Item"
						v-model="item2 = tempInventory.item"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Description"
						v-model="details2 = tempInventory.details"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Item Price"
						v-model="price2"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Stock Value"
						v-model.number="stock_value2"
					/>    
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Supplier"
						v-model="supplier2 = tempInventory.supplier"
					/>
					
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="number"
						placeholder="Cost of Supply"
						v-model="cost2"
					/>    
					<br />
					
					<div style="text-align:right">
						<v-btn
						@click="updateInventory"
							depressed
							dark
							class="focus-btn"
							color="#A9EF54"
						>
							Update Item
						</v-btn>
					</div>
				</form>
			</div>
				<div v-show="successView2">
   <div class="justify-center">
                        <div class="Form-heading" style="text-align:center;padding-top:30%;">
                            <v-icon class="success-icon" style="font-size:40px">mdi-check-circle</v-icon>
							<br>
                            <h1 class="header-text" style="font-size:20px">{{success2}}</h1>
                        </div>
						<br><br>
						<v-btn
						@click="closePinView2"
					depressed
					dark
					block
					class="focus-btn"
					color="#A9EF54"
					style="color:white;margin-bottom:5px"
					>Close</v-btn>
						
                                </div>
		</div>
		<div v-show="failedView2">
   <div class="justify-center">
                        <div class="Form-heading" style="text-align:center;padding-top:30%;">
                            <v-icon style="color:#BD161C;font-size:100px">mdi-alert-circle</v-icon>
							<br>
                            <h1 class="header-text" style="text-transform:capitalize;font-size:20px">{{error2}}</h1>
		                    <br><br>
							<v-btn
							@click="toPinView2"
					depressed
					dark
					block
					class="focus-btn"
					color="#A9EF54"
					style="color:white;margin-bottom:5px"
					>Try Again</v-btn>
                        </div>
                    
                                </div>
		</div>
	</div></div>
				<div class="dashboard-col-1">
					<app-sidenav></app-sidenav>
				</div>
				<div class="dashboard-col-2">
					<app-topnav></app-topnav>
						<div  class="fixed-sub-nav">
							<div class="fixed-nav-group">
								<div class="fixed-nav-header">
									<p style="float:left" class="fixed-sub-header">
										Inventory
									</p>

								</div>
							</div>
						</div>
					<div class="create-product-content">
						<v-snackbar
      v-model="snackbar"
      :timeout="timeout"
	  color="green"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
								<v-card-actions
				style="padding:0 0 0 8px"
				class="hidden-sm-and-down"
			>
                  <v-btn @click="pinModal = true" color="#A9EF54" dark>Add New Item</v-btn>
				  	<v-btn @click="cartModal = true" color="#A9EF54" dark>Open Cart({{basket.length}})</v-btn>
				<v-spacer></v-spacer>
				<!-- <v-col cols="12" sm="6" md="3">
					<v-select
						color="#A9EF54"
						:items="items"
						@change="filterCart($event)"
						placeholder="Filter By"
						dense
						prepend-icon="mdi-filter"
					></v-select>
				</v-col> -->

			</v-card-actions>

            <!-- sorting for mobile view -->
			<div class="hidden-md-and-up">
				<v-row>
					<v-col cols="12">
						<v-btn @click="pinModal = true" color="#A9EF54" dark>Add New Item</v-btn>
					</v-col>
					<v-col cols="12">
						<v-btn @click="cartModal = true" color="#A9EF54" dark>Open Cart({{basket.length}})</v-btn>
					</v-col>
				<!-- <v-col cols="12">
             	<v-select
						color="#A9EF54"
						:items="items"
						@change="filterCart($event)"
						placeholder="Filter By"
						dense
						prepend-icon="mdi-filter"
					></v-select>
				</v-col> -->
			</v-row>
			</div>
							    <div>
				<div  v-if="getInventory.length > 0">
					<div>
						<div class="table-div" id="scroll">
							<table>
								<thead>
								<tr>
									<th style="text-align:left">S/N</th>
                                    <th style="text-align:left">Date</th>
									<th style="text-align:left">Item</th>
									<th style="text-align:left">Item Price</th>
									<th style="text-align:left">Stock</th>
									<th style="text-align:left">Supplier</th>
									<th style="text-align:left">Action</th>
									<th style="text-align:left">Action</th>
									<th style="text-align:left">Action</th>
								</tr>
							</thead>

							<tbody v-for="(inventory, index) in getInventory" :key="inventory._id">
								<tr>
									<td style="text-align:left">{{index}}</td>
                                    <td style="text-align:left">{{inventory.createdAt | moment }}</td>
									<td style="text-align:left">{{ inventory.item }}</td>
									<td style="text-align:left">{{ inventory.price }}</td>
									<td style="text-align:left">{{ inventory.stock_value == 0 ? 'Out of stock' : 'Available - ' + inventory.stock_value  }}</td>
									<td style="text-align:left">{{ inventory.supplier }}</td>
									<td style="text-align:left"><v-btn @click="restock(inventory)" small dark>Restock</v-btn></td>
									<td style="text-align:left"><v-btn small @click="Tobasket(inventory)" dark>Add to cart</v-btn></td>
									<td style="text-align:left"><v-icon style="cursor:pointer" @click="deleteInventory(inventory._id,index)" color="red">mdi-delete</v-icon></td>
								</tr>
							</tbody>
							</table>
						</div>
					</div>
				</div>
					<div v-else  class="empty-cart">
                    <v-icon class="empty-cart-icon">mdi-folder-open</v-icon>
                    <p class="empty-cart-text">No inventory</p>
                </div>
							    </div>
					</div>
				</div>
			</div>
	</div>

</template>

<script src="./Inventory.js"></script>

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
	background-color: #83ef41;
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
