const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
    origin: '*'
}));app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH , DELETE");
//     next();
//   });

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
