#!/usr/bin/env node

import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.url === '/livez') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/messages' && req.method === 'POST') {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      if (process.env.HTTP_CAPTURE_FILE) fs.writeFileSync(process.env.HTTP_CAPTURE_FILE, body);
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ message_id: 'fixture-message' }));
    });
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ status: 'missing' }));
});

server.listen(0, '127.0.0.1', () => {
  const { port } = server.address();
  process.stdout.write(`${port}\n`);
});
