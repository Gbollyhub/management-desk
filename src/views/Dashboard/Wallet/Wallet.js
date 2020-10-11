 
import SideNav from '.././Sidebar';
import TopNav from '.././Topbar';
import WalletToWallet from './WalletToWallet';
import WalletToBank from './WalletToBank';
import Airtime from './Airtime';
import FundWallet from './FundWallet.vue';
import walletTransaction from './walletTransaction'
import walletDashboard from './walletDashboard'
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex';
import url from '../../../url'
import _ from 'lodash'
export default {  
    components: {
		'app-sidenav': SideNav,
		'app-topnav': TopNav,
        'app-wallet-wallet' : WalletToWallet,
        'app-wallet-bank' : WalletToBank,
        'app-airtime': Airtime,
        'app-fund-wallet': FundWallet,
        'app-wallet-transaction' : walletTransaction,
        'app-wallet-dashboard' : walletDashboard
    },

    data() {
        return {
            pinModal: false,
            erroralert: false,
            successView: false,
            failedView: false,
            pinView: true,
            success: '',
            error: '',
            pin: '',
            confirm_pin: '',
            myWallets: [],
            myWalletsArray : [],
            virtualWallet: {},
            activeWallet: {},
            confirmPin: '',
            walletPin: '',
            status: false,
            commisionWallets: {},
            realWallet: {},

            
            walletVerifyModal: false,
            showWallet: false,
            walletModal: false,
            wallet2wallet: false,
            wallet2bank: false,
            airtime:false,
            wallet2friends: false,
            alignRight: 'right',

        }
    
    },
    computed: {
        ...mapGetters(['getUser'])
      },
    created(){
        this.$store.dispatch('getProfile');

        this.$store.dispatch('getTransaction');
    
        
    },
     mounted(){
         setTimeout(()=>{
            const user = this.getUser;
  console.log(user)
        if ("account_pin" in this.getUser ) {
            this.pinModal = false
        }
        else{
            this.pinModal = true
        } 
         }, 4000)
        
    },
    methods: {
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
        async setPin(){
            const pin = this.pin
            const confirm_pin = this.confirm_pin;
            const token = localStorage.getItem('token');
            const resData = {
                "_id": this.getUser._id,
              "account_pin": pin
            }
            if(pin == confirm_pin){
                try{
                        const transaction = await axios.patch(`${url}/update-account`, resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                    
                                        this.successView = true,
                                    this.failedView = false,
                                    this.pinView = false
                                    this.success = 'Transaction Successful!'
                   
              }
              catch(error){
                this.successView = false,
                this.failedView = true,
                this.pinView = false
        
                this.error = error.response.data.error;
              }
            }
            else{
                this.erroralert = true
            }
        },
        setRefresh(){
            location.reload()
        },
        setShowFundWallet(status){
         this.showWallet = status
        },
        toWarning() {
			this.form = false;
			this.warning = true;
        },

      
        
    
       
		toForm() {
			(this.warning = false), (this.form = true);
        },
        
		toSuccess() {
			(this.warning = false), (this.success = true);
		},
		toFailed() {
			(this.warning = false), (this.failed = true);
		},
		tryAgain() {
			(this.failed = false), (this.form = true);
        },
        
       

       
        closeFund(){
            this.fundbar = false
            this.option =true
            this.card = false
            this.ussd = false
            this.directDebit = false
        },
        
        toWallet2Wallet(){
            this.wallet2wallet = true;
        },

        toWallet2Bank(){
            this.wallet2bank = true;
        },

        toAirtime(){
            this.airtime = true;
        },

        toCommission2Wallet(){
            this.walletModal = true;
            this.commission2wallet = true;
        },

        setShowWallet(status) {
            return this.showWallet = status;
        },

        toCommission2Bank(){
            this.walletModal = true;
            this.commission2bank = true;
        },
        
        closeModal(){
            this.wallet2wallet = false;
    },
    closeModal2(){
        this.wallet2bank = false;
},
closeModal3(){
    this.airtime = false;
},

}
}

