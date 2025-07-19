const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Handled by server 3")
});

server.listen(3003, () =>{console.log('Server 3 is running on port 3003')});