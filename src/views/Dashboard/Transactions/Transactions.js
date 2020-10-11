
import {mapActions, mapGetters} from 'vuex';
import SideNav from '.././Sidebar';
import TopNav from '.././Topbar';
import moment from 'moment'
export default {
    components: {
		'app-sidenav': SideNav,
        'app-topnav': TopNav,
    },
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
		  filters:{
   moment: function(date){
      return moment(date).format('MMMM Do YYYY');
   }
	  },
    created(){
        this.$store.dispatch('getProfile');

        this.$store.dispatch('getTransaction');
        
        
    },
	computed: {
      ...mapGetters(['getUser','getTransactions'])
    },

	methods: {
		
	},

}
