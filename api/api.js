const express = require('express');
const cors = require('cors');
const router = require('./routes');

const corsOptions = {
  origin: 'http://localhost:5173',
};

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use("/api", router);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
