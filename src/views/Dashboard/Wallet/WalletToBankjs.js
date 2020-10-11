

export default {
	data() {
		return {
			form: true,
			isloadingGlare: false,
			bankCodes: [],
			info: {
				status: false,
				info: ''
			},
			warning: false,
			success: false,
			failed: false,
			verify: true,
			verifyOperation: false,
			toPinStatus: false,
			accountDetails: {
				name: '',
				accNumber: '0050735388',
				amount: '',
				comment: '',
				pin: '',
				bankCode: '',
				senderWalletId: '',
				referenceId: '',
				bvn: ''
			}
		};
	},
	methods: {
	
		closeInfo() {
			this.accountDetails.accNumber = '';
			this.warning = false;
			return (this.info.status = false);
		},

		setInfo(message) {
			this.info.status = true;
			this.isloadingGlare = false;
			return (this.info.info = message);
		},

		backToForm() {
			this.verifyOperation = false;
			this.verify = true;
			this.form = true;
		},
		verifyBeforeSend() {
			this.form = false;
			this.verifyOperation = true;
		},

		toConfirmMessage() {
			this.form = false;
			this.warning = true;
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
		}
	},


};
