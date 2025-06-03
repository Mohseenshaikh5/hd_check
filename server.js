require('dotenv').config();
const app = require('./app');

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server runninge on http://localhost:${PORT}`);
})