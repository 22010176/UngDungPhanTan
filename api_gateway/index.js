import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use('/api', function (req, res, next) {
  res.send('API Gateway');
});

app.use('/storage', createProxyMiddleware({
  target: 'http://127.0.0.1:5001/',
  changeOrigin: true,
}))

app.use('/auth', createProxyMiddleware({
  target: 'http://127.0.0.1:5000/',
  changeOrigin: true,
}))

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});