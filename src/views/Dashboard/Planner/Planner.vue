<template>
	
	<div class="app">
		
			<div class="dashboard-row">
										<div class="wallet-modal"  v-show="pinModal">
				<div class="wallet-modal-div">
			<div v-show="pinView">
				<div class="top-nav">
					<p @click="pinModal = false" style="float:right;cursor:pointer">X</p>
					<p class="wallet-modal-header">
						<v-icon color="#1c1c1c" style="font-size:30px;margin-right:10px"
							>mdi-apps</v-icon
						>
						Add Planner
					</p>
				</div>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert">Please make sure your Pin match</p>
				<form>
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Description"
						v-model="details"
					/>    
				   <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
			<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Due Date"
						v-model="date"
						v-on="on"
					/>
        </template>
        <v-date-picker
		  color="green"
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="green"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="green"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
					<br />
					
					<div style="text-align:right">
						<v-btn
						@click="createPlanner"
							depressed
							dark
							class="focus-btn"
							color="#A9EF54"
						>
							Create Planner
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
				<div class="dashboard-col-1">
					<app-sidenav></app-sidenav>
				</div>
				<div class="dashboard-col-2">
		
					<app-topnav></app-topnav>
						<div  class="fixed-sub-nav">
			
							<div class="fixed-nav-group">
								<div class="fixed-nav-header">
									<p style="float:left" class="fixed-sub-header">
										Planner
									</p>

								</div>
							</div>
						</div>
					<div class="create-product-content">
						 <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        top
                        color="green"
                    ></v-progress-linear>
							    <div>
			<v-card-actions
				style="padding:0 0 0 8px"
				class="hidden-sm-and-down"
			>
                  <v-btn @click="pinModal = true" color="#A9EF54" dark>Add Planner</v-btn>
				<v-spacer></v-spacer>
				<v-col cols="6" sm="6" md="3">
					<v-select
						color="#A9EF54"
						:items="items"
						@change="filterCart($event)"
						placeholder="Filter By"
						dense
						prepend-icon="mdi-filter"
					></v-select>
				</v-col>

			</v-card-actions>

            <!-- sorting for mobile view -->
			<div class="hidden-md-and-up">
				<v-row>
					<v-col cols="6">
						<v-btn @click="pinModal = true" color="#A9EF54" dark>Add Planner</v-btn>
					</v-col>
				<v-col cols="6">
             	<v-select
						color="#A9EF54"
						:items="items"
						@change="filterCart($event)"
						placeholder="Filter By"
						dense
						prepend-icon="mdi-filter"
					></v-select>
				</v-col>
			</v-row>
			</div>

					<br><br>
				<div  v-if="getPlanner2.length > 0">
					<div>
						<div class="table-div" id="scroll">
							<table v-for="(planner, index) in getPlanner2" :key="planner._id">
								<thead>
									<tr>
                                    <td style="font-size:17px;font-weight:700;text-align:left">{{planner.createdAt | moment }}</td>
								</tr>
								<tr>
									<th style="text-align:left">S/N</th>
                                    <th style="text-align:left">Date</th>
									<th style="text-align:left">Todo</th>
									<th style="text-align:left">Status</th>
									<th style="text-align:left">Action</th>
									<th style="text-align:left">Date Due</th>
									<th style="text-align:left">Action</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td style="text-align:left">{{index}}</td>
                                    <td style="text-align:left">{{planner.createdAt | moment }}</td>
									<td style="text-align:left">{{ planner.details }}</td>
									<td style="text-align:left">{{ planner.completed == false ? 'Pending' : 'Completed' }}</td>
									<td style="text-align:left"><v-checkbox color="green" @change="checkPlanner(planner._id, planner.completed )" v-model="planner.completed" label="."></v-checkbox></td>
									<td style="text-align:left">{{ planner.date_due }}</td>
									<td style="text-align:left"><v-icon style="cursor:pointer" @click="deletePlanner(planner._id,index)" color="red">mdi-delete</v-icon></td>
								</tr>
							</tbody>
							</table>
						</div>
					</div>
				</div>
					<div v-else  class="empty-cart">
                    <v-icon class="empty-cart-icon">mdi-folder-open</v-icon>
                    <p class="empty-cart-text">No planner</p>
                </div>
							    </div>
					</div>
				</div>
			</div>
	</div>

</template>

<script src="./Planner.js"></script>

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
	background-color: #aaed38;
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
