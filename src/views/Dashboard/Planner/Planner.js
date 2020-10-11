
 import {mapActions, mapGetters} from 'vuex';
 import url from '../../../url'
import SideNav from '.././Sidebar';
import TopNav from '.././Topbar';
import moment from 'moment';
import axios from 'axios'
export default {
    components: {
		'app-sidenav': SideNav,
        'app-topnav': TopNav,
    },
	data() {
		return {
			getPlanner2: [],
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
			checkbox: true,
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
   async created(){
        this.$store.dispatch('getProfile');

      await this.$store.dispatch('getPlanner');
      this.getPlanner2 = this.getPlanner
        
    },
	computed: {

	  ...mapGetters(['getPlanner']),
		
	  allPlanner: function() {
		return this.getPlanner
	  },
	  completedPlanner: function() {
		  return this.getPlanner.filter( planner => { return planner.completed == true })
	  },
	  pendingPlanner: function() {
		return this.getPlanner.filter( planner => { return planner.completed == false })
	}
    },

	methods: {
		filterCart(event){

         switch (event) {
			case 'All': this.getPlanner2 = this.allPlanner
			break;
			 case 'Pending': this.getPlanner2 = this.pendingPlanner
				 break;
			case 'Completed': this.getPlanner2 = this.completedPlanner
			 default:
				 break;
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
		async deletePlanner(id, index){
			try {
				const token = localStorage.getItem('token');
				this.getPlanner.splice(index, 1)
				const planner =  await axios.delete(`${url}/delete-planner/${id}`,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
				location.reload()
			} catch (error) {
				console.log(error)
			}
			},

		async createPlanner(){
		  const details  = this.details
		  const date_due = this.date
		  const token = localStorage.getItem('token');
			const data = {
					"details": details,
					"date_due": date_due
			}
			try {
				 const planner =  await axios.post(`${url}/create-planner`,data,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
				 this.successView = true,
				 this.failedView = false,
				 this.pinView = false
				 this.success = 'Created Successful!'
			} catch (error) {
				this.successView = false,
            this.failedView = true,
            this.pinView = false
    
            this.error = error.message
			}
       
		},
		async checkPlanner(id, status){
			const completed = status
			const token = localStorage.getItem('token');
			try {
				this.loading = true
				if(status == true){
					const planner = await axios.patch(`${url}/update-planner/${id}`, { "completed" : true },{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
				this.loading = false
				location.reload()
				}
				else{
					const planner = await axios.patch(`${url}/update-planner/${id}`, { "completed" : false },{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
					this.loading = false
					location.reload()
				}
				
			} catch (error) {
				console.log(error)
				this.loading = false
			}
			
		}
	},

}
