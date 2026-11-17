require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const prodiRoutes = require('./routes/prodiRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET belum diisi di .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors({ origin: process.env.CORS_ORIGIN, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(express.json());
// Express 5: req.body bernilai undefined bila request tidak membawa body JSON
app.use((req, res, next) => {
  req.body ??= {};
  next();
});

app.get('/', (req, res) => res.send('Server Express.js berjalan!'));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/prodi', prodiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });