import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const server = createServer(app);

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', function (req, res, next) {
  res.send('API Gateway');
});

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});