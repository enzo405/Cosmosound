const express = require('express');
import cors from 'cors';
import router from './routes';

const corsOptions = {
  origin: 'http://localhost:8080',
};

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(router);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
