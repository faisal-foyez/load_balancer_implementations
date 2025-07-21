const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Handled by server 2")
});

server.listen(3002, () =>{console.log('Server 2 is running on port 3002')});