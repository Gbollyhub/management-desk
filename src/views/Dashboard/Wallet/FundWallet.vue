<template>
	<div>
		<div v-show="fundView">
			<div class="fund-top-nav mt-4">
				<h4 style="color:#1c1c1c" class="fund-header">
					Fund your wallet
				</h4>
			</div>
			<br />
			<div style="text-align:center;">
				<span style="font-size:13px;color:#a1a1a1;margin-bottom:10px;"
					>Enter amount (₦)</span
				>
				<br />
				<input
					placeholder="0"
					min="0"
					class="no-border-field"
					type="number"
					v-model.number="amount"
					style="width:100%"
				/>
				<span style="font-size:13px;color:#a1a1a1"
					>₦{{amount}}</span
				>
				<br />
			</div>
			<br /><br><br>
                
			<div class="paymentMethod">
				<span style="font-size:13px;color:#a1a1a1">Payment Method</span>
				<br /><br />
				<div @click="cardSelected" class="paymentMethod-div">
					<v-icon
						v-show="isCard"
						small
						color="#1c1c1c"
						class="select-icon"
						>mdi-check-circle</v-icon
					>
					<v-icon
						style="float:left;margin-right:10px"
						small
						color="#1c1c1c"
						>mdi-credit-card</v-icon
					>
					Pay with Credit Card
					<v-icon small style="float:right">mdi-chevron-right</v-icon>
				</div> 
				<div class="paymentMethod-div" v-show="isCard">
					<div>
                    <label for="card-card" class="form-label">Enter Card Number</label><br>
                    <input maxlength="19" name='text1' class="form-field"  type="text" placeholder="555 8955 7894 8595" required>
                    <div  class="form-icon-mastercard mastercard"><img class="form-icon-svg" src="../../../assets/Mastercard-logo.svg" alt=""></div>
                    <div  class="form-icon-visa visa"><img class="form-icon-svg" src="../../../assets/visa.png" alt=""></div>
                    <div  class="form-icon-visa verve"><img class="form-icon-svg" src="../../../assets/verve.png" alt=""></div>
                    <p class="card-error">Invalid credit card provided below</p>
                    </div>
                    <div>
                    <label for="expiry-date" class="form-label">Expiry Date</label><br>
                    <input name="text2" onkeypress="checkExpiry(event)" type="text" maxlength="5" class="form-field" id="expiry-date" value="" autocomplete="off" placeholder="MM/YY" required>
                    </div>
                    
                    <div>
                    <label for="ccv" class="form-label">Enter Cvv</label><br>
                    <input onkeypress="return checkCcv(event)" type="text" maxlength="3" class="form-field" id="cvv" value="" autocomplete="off" placeholder="124" required>
                    </div>
				</div>
				<div @click="ussdSelected" class="paymentMethod-div">
					<v-icon
						v-show="isUssd"
						small
						color="#1c1c1c"
						class="select-icon"
						>mdi-check-circle</v-icon
					>
					<v-icon
						style="float:left;margin-right:10px"
						small
						color="#1c1c1c"
						>mdi-cellphone-iphone</v-icon
					>
					Pay with Ussd
					<v-icon small style="float:right">mdi-chevron-right</v-icon>
				</div>
				<div @click="directdebitSelected" class="paymentMethod-div">
					<v-icon
						v-show="isDirectDebit"
						small
						color="#1c1c1c"
						class="select-icon"
						>mdi-check-circle</v-icon
					>
					<v-icon
						style="float:left;margin-right:10px"
						small
						color="#1c1c1c"
						>mdi-bank</v-icon
					>
					Pay with Bank
					<v-icon small style="float:right">mdi-chevron-right</v-icon>
				</div>
			</div>
			<br>
			<v-btn
					@click="fundWallet"
					depressed
					dark
					block
					class="focus-btn"
					color="#F6AD34"
					style="color:white;margin-bottom:5px"
					>Fund Wallet (₦{{amount}})</v-btn>
			
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
</template>
<script>
// $('#credit-card').on('keypress change', function () {
//     $(this).val(function (index, value) {
//         return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
//     });
//   });

function myFunction() {
  alert("Page is loaded");
}

function cardActive(event, tabName){
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active-tab";
}



 function toggleTabs(event, tabName){
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active-tab";
 }




  function checkDigit(event) {
    document.querySelector('.card-error').style.display = 'none'
    var code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    } 
    console.log(code)

    return true;
}

function checkExpiry(event){
    var expiryValue = document.querySelector('#expiry-date').value

    console.log('length ' + expiryValue + '/' + expiryValue.length)
    if(expiryValue.length == 2){
     return document.querySelector('#expiry-date').value = expiryValue + '/'
    }
    else{
        return true
    }

}

function checkCcv(event){

    var code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    } 
    console.log(code)

    return true;
}

// function validateExpiry(inputtxt) {

//      var code = /^(?:506[0-9]{12}(?:[0-9]{3})?)$/;
  
//   if(inputtxt.value.match(code))
//         {
//      return true
//         }
//       else
//         {
//         document.querySelector('.expiry-error').style.display = 'block'
//         }
// }




function validateCard(inputtxt)
{
  var mastercard = /^(?:5[1-5][0-9]{14})$/;
  var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var verve = /^(506[01]|507[89]|650[01]{4})([0-9]{12,15})$/;
  
  if(inputtxt.value.match(mastercard))
        {
     document.querySelector('.mastercard').style.display = 'block'
        }
      else if(inputtxt.value.match(visa)){
        document.querySelector('.visa').style.display = 'block'
      }
      else if(inputtxt.value.match(verve)){
        document.querySelector('.verve').style.display = 'block'
      }
      else
        {
        document.querySelector('.mastercard').style.display = 'none'
        document.querySelector('.visa').style.display = 'none'
        document.querySelector('.card-error').style.display = 'block'
        }
}


// 5060, 5061, 5078, 5079, or 6500

// RegExp(r'((506(0|1))|(507(8|9))|(6500))')))

</script>
<script src="./FundWallet.js"></script>



<style lang="scss" scoped>
.paymentMethod-div {
	position: relative;
	cursor: pointer;
	color: #b1ab94;
	font-weight: 600;
	font-size: 13px;
	border-radius: 4px;
	padding: 15px;
	background: #FFF7ED;
	margin-bottom: 20px;
}
.walletSelection {
	cursor: pointer;
	border-top: 0.5px solid #f0f0f0;
	border-bottom: 0.5px solid #f0f0f0;
	padding: 20px 0;
	margin-bottom: 20px;
}
.walletText {
	line-height: 80px;
}
.fund-header {
	font-size: 20px;
	color: #1c1c1c;
	font-weight: 600;
}
.fund-top-nav {
	border-bottom: 0.5px solid rgb(233, 233, 233);
}
.warning-div {
	text-align: center;
	padding: 40px 20px;
	.warning-sign {
		font-size: 70px;
		margin-bottom: 20px;
	}
	.warning-text {
		font-size: 16px;
		font-weight: 500;
		color: rgb(68, 68, 68);
	}
}
.wallet-success-div {
	text-align: center;
	padding: 40px 20px;
	.wallet-success-sign {
		font-size: 70px;
		margin-bottom: 10px;
	}
	.wallet-success-header {
		font-size: 16px;
		font-weight: 600;
		color: rgb(68, 68, 68);
	}
	.wallet-success-sub {
		font-size: 16px;
		font-weight: 500;
		color: rgb(68, 68, 68);
	}
}

.wallet-failed-div {
	text-align: center;
	padding: 40px 20px;
	.wallet-failed-sign {
		font-size: 70px;
		margin-bottom: 10px;
	}
	.wallet-failed-header {
		font-size: 16px;
		font-weight: 600;
		color: rgb(68, 68, 68);
	}
	.wallet-failed-sub {
		font-size: 16px;
		font-weight: 500;
		color: rgb(68, 68, 68);
	}
}
</style>

<style lang="scss">
.otp-input {
	width: 40px;
	height: 40px;
	padding: 5px;
	margin: 0 10px;
	font-size: 20px;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	text-align: center;
	outline: none;
	&.error {
		border: 1px solid red !important;
	}
	&:focus {
		border: 1px solid #1c1c1c !important;
	}
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>

<style scoped>

.form-row{
  width: 100%;
}
.form-col-1{
    width: 50%;
    float: left;
    display: block;
    margin-right: 10%;
}
.form-col-2{
    width: 40%;
   float: left;
   display: block;
}
.form-field-div{
    margin-bottom: 30px;
}

.form-label{
	color: #b1ab94;
	font-weight: 600;
	font-size:12px;
}
 .form-field{
    padding-left: 15px;
    letter-spacing: 1px;
    font-weight: 500;
    font-size: 12px;
    height: 30px;
    border: none;
    background-color: #f5e8d9 ;
    border-radius: 3px;
    color: rgb(119, 119, 119);
	width: 100%;
	margin-bottom: 15px;
}

.card-error{
    display: none;
}

.mastercard{
    display: none;
}

.visa{
    display: none;
}

.verve{
    display: none;
}

.expiry-error{
    display: none;
}

.form-icon-mastercard{
    float: right;
    margin-top: -35px;
    z-index: 9999;
    position: relative;
    right: 20px;
}
.form-icon-visa{
    float: right;
    margin-top: -35px;
    z-index: 9999;
    position: relative;
    right: 20px;
}

.form-icon-svg{
    height: 22px;
}

.form-field:focus{
  outline: none;
}


form{
    margin-bottom: 30px;
}


@media (max-width: 991px) {

}

@media (max-width: 767px) {

    .form-row{
      width: 100%;
    }
    .form-col-1{
        width: 50%;
        float: left;
        display: block;
        margin-right: 10%;
    }
    .form-col-2{
        width: 40%;
       float: left;
       display: block;
    }
    .form-field-div{
        margin-bottom: 30px;
    }
    
    .form-label{
        	color: #b1ab94;
	font-weight: 600;
	font-size:12px;
    }
     .form-field{
        padding-left: 15px;
        letter-spacing: 1px;
        font-weight: 500;
        font-size: 18px;
        height: 50px;
        border: none;
        background-color: #f5e8d9;
        border-radius: 3px;
        color: rgb(119, 119, 119);
        width: 100%;
    }
    
    .card-error{
        display: none;
    }
    
    .mastercard{
        display: none;
    }
    
    .visa{
        display: none;
    }
    
    .form-icon-mastercard{
        float: right;
        margin-top: -35px;
        z-index: 9999;
        position: relative;
        right: 20px;
    }
    .form-icon-visa{
        float: right;
        margin-top: -35px;
        z-index: 9999;
        position: relative;
        right: 20px;
    }
    
    .form-icon-svg{
        height: 22px;
    }
    
   
    form{
        margin-bottom: 30px;
    }
    
    
    .logo-group-brand{
        height: 30px;
        margin-right: 20px;
    }



}

@media (max-width: 479px) {

    
    .form-row{
      width: 100%;
    }
    .form-col-1{
        width: 50%;
        float: left;
        display: block;
        margin-right: 10%;
    }
    .form-col-2{
        width: 40%;
       float: left;
       display: block;
    }
    .form-field-div{
        margin-bottom: 30px;
    }
    
    .form-label{
        	color: #b1ab94;
	font-weight: 600;
	font-size:12px;
    }
     .form-field{
        padding-left: 15px;
        letter-spacing: 1px;
        font-weight: 500;
        font-size: 18px;
        height: 50px;
        border: none;
        background-color: #fafafa;
        border-radius: 3px;
        color: rgb(119, 119, 119);
        width: 100%;
    }
    
    .card-error{
        display: none;
    }
    
    .mastercard{
        display: none;
    }
    
    .visa{
        display: none;
    }
    
    .form-icon-mastercard{
        float: right;
        margin-top: -35px;
        z-index: 9999;
        position: relative;
        right: 20px;
    }
    .form-icon-visa{
        float: right;
        margin-top: -35px;
        z-index: 9999;
        position: relative;
        right: 20px;
    }
    
    .form-icon-svg{
        height: 22px;
    }
    
    
    form{
        margin-bottom: 30px;
    }
    
    
}
</style>
