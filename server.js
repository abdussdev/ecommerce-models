// Load env variables
require("dotenv").config();

// Start our server
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});