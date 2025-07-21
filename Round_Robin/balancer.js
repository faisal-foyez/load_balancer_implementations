const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const servers = [
  {name: 'Server 1', url: 'http://localhost:3001'},
  {name: 'Server 2', url: 'http://localhost:3002'},
  {name: 'Server 3', url: 'http://localhost:3003'},
];

let currentIndex = 0;

function chooseServer(){
  const server = servers[currentIndex];
  currentIndex = (currentIndex + 1) % servers.length;
  return server;
}

const balancer = http.createServer((req,res)=>{
  const target = chooseServer();

  proxy.web(req, res, { target: target.url }, err => {
    console.error(`Error forwarding to ${target.name}:`, err.message);
    res.writeHead(502);
    res.end('Bad Gateway');
  });
})

balancer.listen(8000, () => {console.log('balancer server connected on port 8000')})