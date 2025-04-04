// WE NEED THE TIMESTAMP AS IT WILL BE REQUIRED IN FURTHER STEPS LIKE:
// 1. THE TIMESTAMP IS NEEDED AS IT IS PASSED EXPLICITLY IN THE REQUEST BODY
//
// 2. WHEN GENERATING THE STK-PASSWORD FOR THE REQUEST BODY --- TIMESTAMP IS NEEDED , ALONGSIDE OTHER VALUES LIKE
//      SHORCODE AND PASSKEY. THESE THREE WILL BE CONCANATED AND ENCODED TO BASE64 INORDER TO COMEUP WITH A
//      STK -PASSWORD

function generateTimestamp() {
	const date = new Date();

	const timestamp =
		date.getFullYear() +
		String(date.getMonth()).padStart(2, '0') +
		String(date.getDay()).padStart(2, '0') +
		String(date.getHours()).padStart(2, '0') +
		String(date.getMinutes()).padStart(2, '0') +
		String(date.getSeconds()).padStart(2, '0');
	return timestamp;
}

module.exports = { generateTimestamp };
