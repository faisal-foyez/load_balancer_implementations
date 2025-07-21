const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Handled by server 1")
});

server.listen(3001, () =>{console.log('Server 1 is running on port 3001')});