
 import axios from 'axios'
 import {mapActions, mapGetters} from 'vuex';
 import url from '../../../url'
export default {
    data(){
        return{
            successView: false,
            failedView: false,
            fundView: true,
            success: '',
            error: '',
            isCard: false,
            isUssd: false,
            isDirectDebit: false,
			receivingWallet : 0,
			showSelectMeansToFund: true,
			selectWalletToFund : false,
			amount : null,
            cardTypeView: false,
            cardForm: false,
            ussdView:false,
            ussdCode:false,
            directDebitForm: false,
            otpView: false,
            warningView: false,
            selectedWalletIndex: null,
            selectedWalletType: '',
        }
	},

	computed : {
            ...mapGetters(['getUser']),
      
		showProceedBtn() {
			return !!(Number(this.amount) >= 100) && this.receivingWallet != null && this.isCard == true;
		},
		formatedAmount() {
			return this.formatPrice(this.amount);
		}
	},


    methods:{
        reloadPage(){
        location.reload()
        },
        tryAgain(){
            this.successView = false,
            this.failedView = false,
            this.fundView = true
        },
        async fundWallet(){
            const amount = this.amount
            const balance = this.amount + this.getUser.account_balance
          const token = localStorage.getItem('token');
          const resData = {
                "email_address": this.getUser.email_address,
                "transaction_type": "Credit",
                "owner": this.getUser._id,
                "details": "Fund Wallet with Credit Card",
                "remarks": "Fund Wallet",
                "amount": amount,
                "account_balance": balance
          }
          const resData2 = {
              "_id": this.getUser._id,
              "account_balance": balance
          }
          try{
                const transaction = await axios.post(`${url}/create-transaction`, resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                 if(transaction.data.message){
                    const transaction2 = await axios.patch(`${url}/update-account`, resData2,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                    if(transaction2.data.message){
                                    this.successView = true,
                                this.failedView = false,
                                this.fundView = false
                                this.success = 'Transaction Successful!'
                    }

          }
          }
          catch(error){
            this.successView = false,
            this.failedView = true,
            this.fundView = false
    
            this.error = error.message
          }
         
         
        },
        cardSelected(){
            this.isCard= true;
            this.isUssd= false;
            this.isDirectDebit= false;
        },
        ussdSelected(){
            this.isCard= false;
            this.isUssd= true;
            this.isDirectDebit= false;
        },
        directdebitSelected(){
            this.isCard= false;
            this.isUssd= false;
            this.isDirectDebit= true;
        },
        clearField(){
         this.amount = ""
        },
        selectWallet(wallet, index){
			// return wallet;
			if(this.receivingWallet == wallet){
                this.receivingWallet = wallet;
				this.selectedWalletIndex = index;
			}
			else{
                this.receivingWallet = wallet;
				this.selectedWalletIndex = index;

			}

		},
		fundWithCard() {
			this.showSelectMeansToFund = false;
			this.selectWalletToFund = true;
		},

		// showOptionstoFund(receivingWallet)
		// {
		// 	console.log(receivingWallet);

		// 	this.showSelectMeansToFund = true,
		// 	this.receivingWallet = receivingWallet;


		// },








		// i am not sure i will still need this but am going to keep it here for now so i dont disturb ibikunle again for a new ui
        handleOnComplete(value) {
            console.log('OTP completed: ', value);
        },
        handleOnChange(value) {
            console.log('OTP changed: ', value);
        },
        handleClearInput() {
            this.$refs.otpInput.clearInput();
        },
        cardTypeViewToOptionView(){
            console.log("to Option")
            this.cardTypeView = false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.optionView = true
        },
        cardFormtoCardTypeBack(){
            console.log("to CardType View")
            this.selectWalletToFund = false,
            this.showSelectMeansToFund = true
        },

        ussdViewToOptionView(){
            this.ussdView = false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.optionView = true
        },


        ussdCodeToUssdView(){
            this.ussdCode = false,
            this.optionView= false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.ussdView = true

        },

        directDebiToOptionView(){
            this.directDebitForm = false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.optionView = true
        },

        otpToDirectDebit(){
            this.otpView = false,
            this.optionView= false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.directDebitForm = true
        },

        toCardTypeView(){
            this.optionView = false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.cardTypeView = true
        },
        toCardForm(){
            this.cardTypeView = false,
            this.optionView= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.cardForm = true
        },
        toCardWarning(){
            this.cardForm = false,
            this.optionView= false,
            this.cardTypeView= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.successView= false,
            this.failedView= false
            this.warningView = true
        },

        toSuccess(){
            if(this.warningView = true){
                this.warningView = false,
                this.optionView= false,
                this.cardTypeView= false,
                this.cardForm= false,
                this.ussdView=false,
                this.ussdCode=false,
                this.directDebitForm= false,
                this.otpView=false,
                this.failedView= false
                this.successView = true
            }
            else{
                return;
            }
            if(this.ussdCode = true){
                this.ussdCode = false,
                this.optionView= false,
                this.cardTypeView= false,
                this.cardForm= false,
                this.ussdView=false,
                this.directDebitForm= false,
                this.otpView=false,
                this.warningView= false,
                this.failedView= false
                this.successView = true
            }
            else{
                return;
            }
            if( this.otpView = true){
                this.otpView = false
                this.optionView= false,
                this.cardTypeView= false,
                this.cardForm= false,
                this.ussdView=false,
                this.ussdCode=false,
                this.directDebitForm= false,
                this.warningView= false,
                this.failedView= false
                this.successView = true
            }
            else{
                return;
            }

        },
        toFailed(){
            this.warningView = false,
            this.optionView= false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false
            this.successView= false,
            this.failedView = true
        },
        toUssdView(){
            this.optionView = false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdCode=false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.ussdView = true
        },
        toUssdCode(){
            this.ussdView = false,
            this.optionView= false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.directDebitForm= false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.ussdCode = true
        },
        todirectDebitForm(){
            this.optionView = false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.otpView=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.directDebitForm = true
        },
        toOtpView(){
            this.directDebitForm = false
            this.optionView= false,
            this.cardTypeView= false,
            this.cardForm= false,
            this.ussdView=false,
            this.ussdCode=false,
            this.warningView= false,
            this.successView= false,
            this.failedView= false
            this.otpView = true
        },
        toOptionView(){
            if(this.successView = true){
                this.cardTypeView= false,
                this.cardForm= false,
                this.ussdView=false,
                this.ussdCode=false,
                this.directDebitForm= false,
                this.otpView=false,
                this.warningView= false,
                this.successView = false
                this.failedView = false
                this.optionView = true
            }
            else{
                return;
            }

            if(this.failedView = true){
                this.cardTypeView= false,
                this.cardForm= false,
                this.ussdView=false,
                this.ussdCode=false,
                this.directDebitForm= false,
                this.otpView=false,
                this.warningView= false,
                this.successView = false
                this.failedView = false
                this.optionView = true
            }
            else{
                return;
            }

        },

    }
}
