const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const servers = [
  { name: 'Server 1', url: 'http://localhost:3001', active: 0 },
  { name: 'Server 2', url: 'http://localhost:3002', active: 0 },
  { name: 'Server 3', url: 'http://localhost:3003', active: 0 },
];

function chooseServer() {
  let minActive = Infinity;
  let selected = null;

  for (const server of servers) {
    const active = server.active ;
    if (active < minActive) {
      minActive = active;
      selected = server;
    }
  }

  selected.active++;
  return selected;
}

const balancer = http.createServer((req, res) => {
  const target = chooseServer();

  proxy.web(req, res, { target: target.url }, err => {
    console.error(`Error forwarding to ${target.name}`, err.message);
    res.writeHead(502);
    res.end('Bad Gateway');
    target.active--; // Revert increment if failed
  });

  // Decrement active connections when response finishes
  res.on('finish', () => {
    target.active--;
  });
});

balancer.listen(8000, () => {
  console.log('Load Balancer running on port 8000');
});