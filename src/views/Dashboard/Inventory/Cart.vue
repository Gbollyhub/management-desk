<template>
<div> 
     <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        top
                        color="green"
                    ></v-progress-linear>
    <div v-show="cartView">
   				<div  v-if="basket.length > 0">
					<div>
						<div class="table-div" id="scroll">
							<table>
								<thead>
								<tr>
									<th style="text-align:left">Quantity</th>
                                    <th style="text-align:left">Item</th>
									<th style="text-align:left">Total</th>
								</tr>
							</thead>

							<tbody v-for="(item, index) in basket" :key="item._id">
								<tr>
									<td style="text-align:left">
                                     <v-btn x-small dark color="#A9EF54" depressed class="meal-btn" @click="decreaseQ(item)">
                                    -
                                    </v-btn>
                                    <span style="margin: 0 5px 0 5px">{{ item.Quantity }}</span>
                                      <v-btn x-small dark color="#A9EF54" depressed class="meal-btn" @click="increaseQ(item)">
                                    +
                                    </v-btn>
                                    </td>
                                    <td style="text-align:left">{{ item.Item }}</td>
									<td style="text-align:left">₦ {{ item.Price * item.Quantity}}</td>
								</tr>
							</tbody>
							</table>
						</div>
					</div>
                    <br><br>
                    <h3>Order total:  ₦{{ total }} | {{ orderTotal }}</h3>
                    <br><br>
                       <center>
      <v-btn @click="sellCart()" block color="#A9EF54" dark depressed>Sell Items</v-btn>
   
   </center>
				</div>
					<div v-else  class="empty-cart">
                    <v-icon class="empty-cart-icon">mdi-cart-off</v-icon>
                    <p class="empty-cart-text">No Item in Cart</p>
                </div>
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
    
</div>
     
</template>

<script>

 import {mapActions, mapGetters} from 'vuex';
 import url from '../../../url'
import moment from 'moment';
import axios from 'axios'
export default {
     props : ['basket'],
     data () {
      return {
            erroralert: false,
            successView: false,
            failedView: false,
            cartView: true,
            success: '',
            error: '',
            pin: '',
			loading:false,
        Date: new Date(),
        orderTotal: '',
        paymentStatus: 'Pending',
        deliveryStatus: 'In transit',
        orderId: '',
        user: '',
        Address: '',
        paymentType:'',
        dialog: false,
        headers: [
          {
            text: 'Quantity',
            align: 'left',
            sortable: false,
            value: 'Quantity'
          },
          { text: 'Item', value: 'Item' },
          { text: 'Total', value: 'Total' },
         
        ],
        currentUser: null,
        phone : null
      }
     },
     computed:{
          ...mapGetters([
		  'getUser'
        ]),

         total(){  
           var totalp = 0;
           var tot = 0
           for( var items in this.basket ){
             var singleItem = this.basket[items];
             totalp += singleItem.Quantity * singleItem.Price;
           }
            this.orderTotal = totalp
           return totalp;
           
         }
     },
     created(){

     },
     methods :{
        async myFunction(item){
            const token = localStorage.getItem('token');
        if (item.Stock > item.Quantity) {
            	  const data = {
			"stock_value": item.Stock - item.Quantity,
		  }
          const inventory2 =  await axios.patch(`${url}/update-inventory/${item.Id}`,data,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
        }
        else {
            alert("Your Item Quantity is more than the available stock")
        }
         },
        async sellCart(){
        const cartTotal = this.total
        const getCart = this.basket
         const token = localStorage.getItem('token');
        const account_balance = this.getUser.account_balance + this.orderTotal
          getCart.forEach(this.myFunction)


         	const resData = {
			"transaction_type": "Credit",
			"item": "Sale",
			"details": ` Sold ${JSON.stringify(this.basket)}`,
			"quantity": null,
			"amount": this.orderTotal,
			"account_balance": account_balance,
	  }
	  const resData2 = {
		  "account_balance": account_balance
      }
		  try {
			  this.loading = true
			   const transaction =  await axios.post(`${url}/create-transaction`,resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   const user =  await axios.patch(`${url}/update-account`,resData2,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   this.loading = false
			   this.successView = true,
			   this.failedView = false,
			   this.cartView = false
			   this.success = 'Sold Successful!'
		  } catch (error) {
			this.loading = false
			  this.successView = false,
		  this.failedView = true,
		  this.cartView = false
		  this.error = error.message
		  }
         },
           toPinView(){
            this.successView = false,
            this.failedView = false,
            this.cartView = true
        },
        closePinView(){
            this.successView = false,
            this.failedView = false,
            this.cartView = true
            location.reload()
		},
       removeItem(props){
    this.basket.splice(this.basket.indexOf(props), 1);
    },
       increaseQ(props){
     props.Quantity++;
    },
    decreaseQ(props){
    props.Quantity--;
    if(props.Quantity == 0){
     this.removeItem(props);
    }
    },
     }
}
</script>
 
<style scoped>
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
.close {font-size:40px;}
.chip {background:#f25d13; color: white }
.dialog{ padding: 30px 20px 30px 20px;}
.order-info {text-align: center;}
.order-btn {margin-top:20px; width: 310px;}
.meal-btn {}
     @media (max-width: 991px) {
       .order-info {text-align: center;}
.order-btn {margin-top:20px; width: 310px;}
.meal-btn {}
     }
     @media (max-width: 767px) {
       .order-info {text-align: left;}
.order-btn {margin-top:20px; width: 290px;}
.meal-btn {}
     }
      @media (max-width: 479px) {
        .order-info {text-align: left;}
.order-btn {margin-top:20px; width: 290px;}
.meal-btn {}
      }
</style>