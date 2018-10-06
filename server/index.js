const express = require('express');
const app = express();
const path = require('path');

const { syncAndSeed } = require('./db');

app.use('/api', require('./api'));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send('Internal Server Error');
})

const PORT = process.env.PORT || 8080;
const init = () => {
  syncAndSeed();
  app.listen( PORT, console.log(`App listening on port ${PORT}`));
}

init();
