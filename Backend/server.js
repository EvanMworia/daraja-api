const express = require('express');
const app = express();
const callbackHandlerRoute = require('./routes/callbackRoute');

app.use(express.json());

app.use('/api/mpesa', callbackHandlerRoute);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
