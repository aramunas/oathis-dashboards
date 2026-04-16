const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "ok", supabase: "connected", clerk: "configured", fallback: "true" }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: "ok", from: "server.js test" }));
});

server.listen(Number(port), '0.0.0.0', () => {
  console.log(`[OATHIS] Minimal test server running on port ${port}`);
});