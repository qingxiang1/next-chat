/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import next from 'next';
import { getRagChain } from './src/chatai/chat.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // 自定义API或其他逻辑
  server.post('/api/chat', async (req, res) => {
    const ragChain = await getRagChain();
    const { message, sessionId } = req.body;

    if(!message || !sessionId) {
      res.json({ code: 400, msg: '参数错误' });
    }

    const result = await ragChain.stream(
      {
        question: message,
      },
      { configurable: { sessionId: sessionId } }
    );

    // res.set("Content-Type", "text/plain");
    let answer = '';
    for await (const chunk of result) {
      answer += chunk;
      // res.write(chunk);
    }
    res.json({
      code: 200,
      success: true,
      data: answer
    });
  });

  // 处理前端请求
  server.get('*', (req, res) => {
    void handle(req, res);
  });

  // @ts-ignore
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server running on http://localhost:3000');
  });
});