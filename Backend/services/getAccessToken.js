const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const tokenURL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const encodedCredentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
const getAccessToken = async () => {
	try {
		const response = await axios.get(tokenURL, {
			headers: {
				Authorization: `Basic ${encodedCredentials}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data.access_token;
	} catch (error) {
		throw new Error(error.response ? error.response.data : error.message);
	}
};

(async () => {
	try {
		const tokenData = await getAccessToken();
		console.log(tokenData);
	} catch (error) {
		console.error(error);
	}
})();

const timestamp = Date.now();
console.log('timestamp is', timestamp);
