const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
//----THE URL IS PROVIDED BY SAFARICOM AND ITS THE ENDPOINT WHERE WE  MAKE A GET REQUST TO TO GET AN AUTHORIZATION TOKEN
//----THE ACCESS TOKEN THAT WE GET IS VALID FOR 3600 SECONDS (AN HOUR)
//---- WHILE WORKING WITH THE LIMIT IS TOTALLY DOABLE, IT IS ADVISED TO GENERATE A NEW TOKEN FOR EVERY REQUEST
//----- AS SUCH WE WILL CALL THE GET ACCCESS TOKEN BEFORE EVERY REQUEST, AND PASS THE RETURN VALUE (THE TOKEN) IN THE HEADERS
const tokenURL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

//CONSUMER KEY AND CONSUMER SECRET ARE PROVIDED IN THE PLATFORM KEEP THEM SAFE AND SECRET
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// WE NEED TO ENCODE THE CONSUMER KEY AND CONSUMER SECRET TO BASE64 AND THE RESULTING VALUE
// THE RESULTING VALUE IS PASSED IN THE HEADERS AS OUR CREDENTIANLS
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

module.exports = { getAccessToken };
