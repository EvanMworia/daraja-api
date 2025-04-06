function callbackHandler(req, res) {
	//After the user interacts with the stk push(The prompt that asks you to enter your password), You will receive a post request(From safaricom) to your callback url(The endpoint we passed while initiating the stk push) with data in the request body.
	// Note that whether payment is successful or unsuccesful a callback POST request MUST be made.
	//The difference lies in the Result Code (Like status code basically) AND in the Callback Data Structure
	// ------------EXPLAINNIG THE DIFFERENCES------------
	// 1. ResultCode for SUCCESS is 0 - Anything else which is not 0 is failure
	// 2. Successful payments have an extra node in the object structure called the "CallbackMetadata", Unsuccesfull ones Dont have t
	const callbackData = req.body;
	//For debugging and Visualising: This neatly prints the callback data in your terminal.
	console.log('The Entire Callback Object received from Safaricom:', JSON.stringify(callbackData, null, 2));
	// we can leverage on either the ResultCode or the Object Structure(Basically checking for that "CallbackMetadata")

	if (callbackData.Body.stkCallback.ResultCode === 0) {
		//If succesful lets extract the necessary things(metadata) we need from the object and, if youre running a db you can store them.
		const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
		//If you have logged the callbackData by now you will realize that CallbackMetadata.Item is an array of objects and thus we can use array methods to loop in and extract the details we neeed

		const amount = metadata.find((item) => item.Name === 'Amount').Value;
		const receipt = metadata.find((item) => item.Name === 'MpesaReceiptNumber').Value;
		const phone = metadata.find((item) => item.Name === 'PhoneNumber').Value;
		const transactionDate = metadata.find((item) => item.Name === 'TransactionDate').Value;

		console.log('Payment Succesful', { amount, receipt, phone, transactionDate });
		//-----------LOGIC TO STORE INTO DB GOES HERE-------------------------
	} else {
		console.log('Payment Cancelled By User', callbackData.Body.stkCallback.ResultDesc);
	}
	res.status(200).json({ message: 'Callback received' });
	//--------APPARENTLY, You must respond to Safaricom with a 200 OK.
	//If not, Safaricom may retry sending the callback.
}

module.exports = { callbackHandler };
