const path = require('path');
const axios = require('axios');
const { generateTimestamp } = require('../services/generateTimestamp');
const { getAccessToken } = require('../services/getAccessToken');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
async function sendStkPush() {
	try {
		//STEPS TO SEND STK PUSH
		//--------- 1. GET THE ACCESS TOKEN-----------
		const token = await getAccessToken();
		//---------- 2. GET THE TIMESTAMP
		const timestamp = generateTimestamp();
		//-----------3. RETRIVE THE NECESSARY VALUES FROM .ENV
		const passkey = process.env.PASSKEY;
		const shortcode = process.env.SHORT_CODE;
		//-----------4. ENCODE (SHORTCODE + PASSKEY + TIMESTAMP) TO GENERATE PASSWORD, IN BASE64
		const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
		//-----------5. SET THE AUTHORIZATION HEADERS AND THE URL DEPENDING ON DEVELOPMENT ENVIRONMENT
		const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};
		//------------6. SET THE REQUEST BODY DETAILS-------------------
		const requestBody = {
			BusinessShortCode: shortcode,
			Password: password,
			Timestamp: timestamp,
			TransactionType: 'CustomerPayBillOnline', //till "CustomerBuyGoodsOnline"
			Amount: '1',
			PartyA: '254713644793',
			PartyB: shortcode,
			PhoneNumber: '254713644793',
			CallBackURL: 'https://yourwebsite.co.ke/callbackurl',
			AccountReference: 'Test Account',
			TransactionDesc: 'test',
		};

		const response = await axios.post(url, requestBody, { headers });
		return response.data;
	} catch (error) {
		// console.error('This is the full error object', error);
		throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
	}
}

(async () => {
	const result = await sendStkPush();
	console.log('This is the response after attempting an stk push', result);
})();
