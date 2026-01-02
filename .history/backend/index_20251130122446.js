const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({status: 'OK', message: 'API is up'});
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// TODO: Mount auth routes here later

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
