const http = require('http');
const port = 5000;
const handlers = require('./handlers');

http.createServer((req, res)=>{
    
   for (let hand of handlers){
       if(!hand(req,res)){
           break;
       }
   }
    
}).listen(port, ()=> console.log('Server is lisening on port 5000'));