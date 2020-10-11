
 import {mapActions, mapGetters} from 'vuex';
 import url from '../../../url'
import SideNav from '.././Sidebar';
import TopNav from '.././Topbar';
import moment from 'moment';
import axios from 'axios'
import Cart from './Cart'
export default {
    components: {
		'app-sidenav': SideNav,
		'app-topnav': TopNav,
		'app-cart': Cart
    },
	data() {
		return {
			tempInventory: {},
			price2: '',
		item2: '',
		details2: '',
		stock_value2: null,
		supplier2: '',
		cost2: null,
			snackbar: false,
			text: 'Item Added to Cart',
			timeout: 2000,
			cartModal: false,
			basket: [],
			price: '',
			item: '',
			details: '',
			stock_value: null,
			supplier: '',
			cost: null,
			items: ['All','Pending', 'Completed'],
			details: '',
			date: new Date().toISOString().substr(0, 10),
			menu: false,
			modal: false,
			menu2: false,
			pinModal: false,
            erroralert: false,
            successView: false,
            failedView: false,
            pinView: true,
            success: '',
            error: '',
            pin: '',
			loading:false,
			pinModal2: false,
            erroralert2: false,
            successView2: false,
            failedView2: false,
            pinView2: true,
            success2: '',
            error2: '',
            pin: '',
			loading2:false,
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
		  filters:{
   moment: function(date){
      return moment(date).format('MMMM Do YYYY');
   }
	  },
    created(){
        this.$store.dispatch('getProfile');
        this.$store.dispatch('getInventory');
        
    },
	computed: {
      ...mapGetters([
		  'getUser',
          'getInventory'
        ])
      
    },

	methods: {
		async deleteInventory(id, index){
			try {
				const token = localStorage.getItem('token');
				this.getInventory.splice(index, 1)
				const planner =  await axios.delete(`${url}/delete-inventory/${id}`,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
				location.reload()
			} catch (error) {
				console.log(error)
			}
			},
		Tobasket(item){
			if(item.stock_value == 0){
			  return alert("Item is Out of Stock")
			}
			this.snackbar = true
			this.basket.push({
			  Id: item._id,
			  Item: item.item,
			  Price: item.price,
			  Quantity: 1,
			  Stock: item.stock_value
			})
		  },		
		async createInventory(){
		const item  = this.item
		const details = this.details
		const stock_value = this.stock_value
		const supplier = this.supplier
		const cost = this.cost
		const price = this.price
		const token = localStorage.getItem('token');
		const account_balance = this.getUser.account_balance - this.cost
		  const data = {
			"item": item,
			"details": details,
			"stock_value": stock_value,
			"supplier": supplier,
			"cost": cost,
			"price": price
		  }
		  const resData = {
			"transaction_type": "Debit",
			"item": item,
			"details": ` Added ${stock_value} ${item} to the inventory, supplied by ${supplier}`,
			"quantity": stock_value,
			"amount": cost,
			"account_balance": account_balance,
	  }
	  const resData2 = {
		  "account_balance": account_balance
	  }
	  if( this.getUser.account_balance > cost){ 
		  try {
			  this.loading = true
			   const inventory =  await axios.post(`${url}/create-inventory`,data,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   const transaction =  await axios.post(`${url}/create-transaction`,resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   const user =  await axios.patch(`${url}/update-account`,resData2,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   this.loading = false
			   this.successView = true,
			   this.failedView = false,
			   this.pinView = false
			   this.success = 'Added Successful!'
		  } catch (error) {
			this.loading = false
			  this.successView = false,
		  this.failedView = true,
		  this.pinView = false
  
		  this.error = error.message
		  }
		}
		else{
		this.erroralert = true
		}
	 
	  },
	  restock(inventory){
		this.pinModal2 = true
		this.tempInventory = inventory
	  },
	  async updateInventory(){
		const item  = this.item2
		const details = this.details2
		const stock_value = this.stock_value2
		const supplier = this.supplier2
		const cost = this.cost2
		const price = this.price2
		const token = localStorage.getItem('token');
		const account_balance = this.getUser.account_balance - this.cost2
		  const data = {
			"item": item,
			"details": details,
			"stock_value": stock_value + this.tempInventory.stock_value,
			"supplier": supplier,
			"cost": cost,
			"price": price
		  }
		  const resData = {
			"transaction_type": "Credit",
			"item": item,
			"details": ` Added ${stock_value} of ${item} to the existing ${this.tempInventory.stock_value}, supplied by ${supplier}`,
			"quantity": stock_value,
			"amount": cost,
			"account_balance": account_balance,
	  }
	  const resData2 = {
		  "account_balance": account_balance
	  }
	  if( this.getUser.account_balance > cost){ 
		  try {
			  this.loading2 = true
			   const inventory2 =  await axios.patch(`${url}/update-inventory/${this.tempInventory._id}`,data,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   const transaction =  await axios.post(`${url}/create-transaction`,resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   const user =  await axios.patch(`${url}/update-account`,resData2,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			   this.loading2 = false
			   this.successView2 = true,
			   this.failedView2 = false,
			   this.pinView2 = false
			   this.success2 = 'Added Successful!'
		  } catch (error) {
			this.loading2 = false
			  this.successView2 = false,
		  this.failedView2 = true,
		  this.pinView2 = false
  
		  this.error2 = error.message
		  }
		}
		else{
		this.erroralert2 = true
		}
	 
	  },
		toPinView(){
            this.successView = false,
            this.failedView = false,
            this.pinView = true
        },
        closePinView(){
            this.successView = false,
            this.failedView = false,
            this.pinView = true
            this.pinModal = false
            location.reload()
		},
		toPinView2(){
            this.successView2 = false,
            this.failedView2 = false,
            this.pinView2 = true
        },
        closePinView2(){
            this.successView2 = false,
            this.failedView2 = false,
            this.pinView2 = true
            this.pinModal2 = false
            location.reload()
		},
	},

}
