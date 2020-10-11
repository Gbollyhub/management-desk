<template>
	<div class="wallet-modal" >
				<div class="wallet-modal-div">
					<v-btn
						@click="closeModal"
						style="background:#F8E8E8"
						class="modal-close focus-btn"
						color="#BD161C"
						icon
						><v-icon>mdi-close</v-icon></v-btn
					>
			<div v-show="walletView">
				<div class="top-nav">
					<p class="wallet-modal-header">
						<v-icon color="#1c1c1c" style="font-size:30px;margin-right:10px"
							>mdi-wallet-outline</v-icon
						>
						Wallet To Wallet
					</p>
				</div>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert">Invalid PIN!</p>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert2">Invalid WalletID!</p>
				<p style="font-size:13px;color:#BD161C" v-show="erroralert3">No Sufficient Fund! Fund Account</p>
				<form @submit.prevent = "Transfer">
					<input
					    style="width:100%"
						class="wallet-text-field"
						type="text"
						placeholder="Recipient Wallet ID"
						v-model="user.walletID"
						@blur = "findUser"
						@input = "clearError"
						required
					/>

					
					<input
					    v-model = user.full_name
						class="wallet-text-field"
						type="text"
						placeholder="Recipient Name"
						readonly
					/>
					<input
					 style="width:100%"
						v-model.number="user.amount"
						class="wallet-text-field"
						type="number"
						placeholder="Amount"
						required
					/>
					<input
						v-model="user.remark"
						class="wallet-text-field"
						type="text"
						placeholder="Remarks"
						required
					/>
					<input
						v-model="user.pin"
						class="wallet-text-field"
						type="number"
						placeholder="Enter PIN"
						@input= "clearError"
						oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
						maxlength="4"
						required
					/>
			
					<br />
					<div style="text-align:right">
						<v-btn
							type="submit"
							depressed
							dark
							class="focus-btn"
							color="#F6AD34"
						>
							Transfer (₦{{user.amount}})
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
					@click="reloadPage"
					depressed
					dark
					block
					class="focus-btn"
					color="#F6AD34"
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
					@click="tryAgain"
					depressed
					dark
					block
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Try Again</v-btn>
					<br><br>
						<v-btn
						text
					@click="tryAgain"
					depressed
					block
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Close</v-btn>

                        </div>
                    
                                </div>
		</div>			
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex';
import url from '../../../url'

export default {

	data() {
		return {
			  success: '',
			  error: '',
			 successView: false,
            failedView: false,
            walletView: true,
			recipient: null,
			erroralert: false,
			erroralert2: false,
			erroralert3: false,
			errors : false,
			errorMessages : "Invalid Wallet ID",
			loadingGlare : false,
			senderWalletId: '',
			singleBulk: false,
			multipleBulk: false,
			bulkIsActivated: false,
			transferType: 'single',
			user: {
				amount: '',
				walletID: '',
				full_name: '',
				pin: '',
				remark: ''
			},
			bulkRecipient: [],
			multipleBulkRecipient: [],
			toPinStatus: false
		};
	},

    computed: {
      ...mapGetters(['getUser'])

    },
	methods: {
		 reloadPage(){
        location.reload()
		},
		 tryAgain(){
            this.successView = false,
            this.failedView = false,
            this.walletView = true
        },
		clearError(){
		 this.erroralert =false
		 this.erroralert2= false
		},
		async findUser(){
			const walletID = this.user.walletID
			 const token = localStorage.getItem('token');
			const resData = {
				"account_number": walletID
			}
         try {
			  const user = await axios.post(`${url}/user`, resData, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
			  this.recipient = user.data
			   this.user.full_name = user.data.full_name
		 } catch (error) {
			  this.erroralert2 = true
			  console.log(error.message)
		 }
		},
		async Transfer(){
			const pin = this.user.pin
			const remark = this.user.remark
			const full_name = this.user.full_name
			  const amount = this.user.amount
			const balance = this.getUser.account_balance - this.user.amount
			 const balance2 = this.user.amount + this.recipient.account_balance
          const token = localStorage.getItem('token');
          const resData = {
			     "email_address": this.getUser.email_address,
                "transaction_type": "Debit",
                "owner": this.getUser._id,
                "details": `Wallet Transfer to ${this.recipient.full_name}`,
                "remarks": remark,
                "amount": amount,
				"account_balance": balance
		  }
		   const resData2 = {
			    "email_address": this.recipient.email_address,
                "transaction_type": "Credit",
                "owner": this.recipient._id,
                "details": `Wallet Transfer from ${this.getUser.full_name}` ,
                "remarks": remark,
                "amount": amount,
                "account_balance": balance2
		  }
		  const resData3 = {
			   "_id": this.getUser._id,
			   "account_balance": balance
		  }
		   const resData4 = {
			   "_id": this.recipient._id,
			   "account_balance": balance2
		  }
           if(this.getUser.account_pin == pin){
			if( this.getUser.account_balance > this.user.amount){
				 try{
                const transaction = await axios.post(`${url}/create-transaction`, resData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
				 const transaction2 = await axios.post(`${url}/create-transaction`, resData2,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                const transaction3 = await axios.patch(`${url}/update-account`, resData3,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                const transaction4 = await axios.patch(`${url}/update-account`, resData4,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
                this.successView = true,
                this.failedView = false,
                this.walletView = false
                this.success = 'Transaction Successful!'

          }
          catch(error){
            this.successView = false,
            this.failedView = true,
            this.walletView = false
            this.error = error.message
          }
			 }
			  else{
			    this.erroralert3 = true
		   }  
            
		   }
		   else{
			    this.erroralert = true
		   }
		},
		backToForm() {
			return this.$emit('backToForm');
		},

		verifyBeforeSend() {
			return this.$emit('verifyBeforeSend');
		},

		resetPin() {
			return this.$emit('resetPin');
		},

		closeModal() {
			this.user.amount = this.user.remark = this.user.walletID = this.user.pin = this.user.full_name  =	'';
			 this.successView = false,
            this.failedView = false,
            this.walletView = true
			return this.$emit('closeModal');
		},

		walletToWalletTransfer() {
			return this.$emit('walletToWalletTransfer', {
				user : this.user,
				transferType : this.transferType,
				multipleDetails : this.multipleBulkRecipient,
				bulkDetails : this.bulkRecipient,
				senderWalletId : this.senderWalletId
			});
		},

		toWarning() {
			return this.$emit('toWarning');
		},
		toForm() {
			return this.$emit('toForm');
		},
		toSuccess() {
			return this.$emit('toSuccess');
		},
		toFailed() {
			return this.$emit('toFailed');
		},
		tryAgain() {
			return this.$emit('tryAgain');
		},

		singleBulkActivated() {
			this.transferType = 'bulk';
			this.bulkIsActivated = false;
			this.multipleBulk = false;
			this.singleBulk = true;
		},
		multipleBulkActivated() {
			this.transferType = 'multiple';
			this.bulkIsActivated = false;
			this.singleBulk = false;
			this.multipleBulk = true;
		},
		removeSingle(index) {
			this.bulkRecipient.splice(index, 1);
		},
		removeMultiple(index) {
			this.multipleBulkRecipient.splice(index, 1);
		},
		clearBulk() {
			(this.user.bulkRecipient = []), (this.bulkIsActivated = false);
		},
		activateBulk() {
			this.bulkIsActivated = true;
		},

		setError(message) {
			this.errorMessages = message;
			return this.errors = true;
		},

		addToBulkRecipient() {
			if (this.user.name < 5) return this.setError("Valid Wallet ID and Name is required");
			this.bulkRecipient.push({ walletID : this.user.walletID, name : this.user.name });
			this.user.walletID = this.user.name = "";
			this.setError('');
		},

		addToMultipleBulkRecipient() {
			if (this.user.name < 5) return this.setError("Valid Wallet ID and Name is required");
			if (Number(this.user.amount) < 1) return this.setError("Valid Amount is required");
			let obj = {
				amount : this.user.amount,
				receiver_wallet_id : this.user.walletID,
				narration : this.user.comment,
				name : this.user.name,
				userPhoneEmail : this.user.phoneEmail,
			}
			this.multipleBulkRecipient.push(obj);
			this.user.walletID = this.user.name = this.user.amount = this.user.comment = "";
			this.setError('');
		}
	},

};
</script>

<style scoped>
.bulk-sub {
	font-size: 14px;
	font-weight: 500;
}
.bulk-option {
	cursor: pointer;
	color: #bd161c;
	margin-bottom: 20px;
	font-size: 15px;
	font-weight: 600;
}
</style>